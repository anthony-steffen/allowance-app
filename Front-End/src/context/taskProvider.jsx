import { useState, useMemo, useCallback, useEffect } from "react";
import PropTypes from "prop-types";
import TaskContext from "./taskContext";
import { dailyTasks } from "../shared/tasks";
import { useToast } from "@chakra-ui/react";

const { Provider } = TaskContext;

const TaskProvider = ({ children }) => {
	const [tasks, setTasks] = useState(() => {
		const savedTasks = localStorage.getItem("tasks");
		return savedTasks ? JSON.parse(savedTasks) : [];
	});
	const [loaded, setLoaded] = useState(false);
	const [lastLoadDate, setLastLoadDate] = useState(() => {
		const savedDate = localStorage.getItem("lastLoadDate");
		return savedDate ? savedDate : "";
	});
	const [sendToApproval, setSendToApproval] = useState(() => {
		const savedHistory = localStorage.getItem("sendToApproval");
		return savedHistory ? JSON.parse(savedHistory) : [];
	});
	const [approved, setApproved] = useState(() => {
		const savedApproved = localStorage.getItem("Approved");
		return savedApproved ? JSON.parse(savedApproved) : [];
	});
	const [selectedPenalties, setSelectedPenalties] = useState([]);
	const toast = useToast();

	const loadDailyTasks = useCallback(() => {
		const today = new Date().toLocaleDateString("pt-BR");
		if (lastLoadDate === today) {
			toast({
				title: "Erro",
				description: "As tarefas de hoje já foram carregadas.",
				status: "error",
				position: "center",
				duration: 3000,
				isClosable: true,
			});
			return;
		}

		setTasks(dailyTasks);
		setLoaded(true);
		setLastLoadDate(today);
		localStorage.setItem("tasks", JSON.stringify(dailyTasks)); // Persiste as tarefas
		localStorage.setItem("lastLoadDate", today);
	}, [lastLoadDate, toast]);

	const toggleTaskCompletion = (taskId) => {
		setTasks((prevTasks) =>
			prevTasks.map((task) =>
				task.id === taskId ? { ...task, done: !task.done } : task
			)
		);
	};

	const togglePenalty = (penalty) => {
		setSelectedPenalties((prev) => {
			const exists = prev.some((p) => p.id === penalty.id);
			return exists
				? prev.filter((p) => p.id !== penalty.id)
				: [...prev, penalty];
		});
	};

	const completeAllTasks = () => {
		setTasks((prevTasks) => prevTasks.map((task) => ({ ...task, done: true })));
	};

	const recordCompletedTasks = useCallback(() => {
		const completed = tasks.filter((task) => task.done);
		const notCompleted = tasks.filter((task) => !task.done);
		const dailyReward = completed.reduce((acc, task) => acc + task.value, 0);
		const today = new Date().toLocaleDateString("pt-BR");

		// Verifica se já foi solicitada a aprovação das tarefas de hoje
		if (sendToApproval.some((record) => record.date === today)) {
			toast({
				title: "Erro",
				description: "Você já solicitou a aprovação das tarefas de hoje.",
				status: "error",
				position: "center",
				duration: 3000,
				isClosable: true,
			});
			return;
		}

		const newApproval = {
			date: today,
			dailyReward,
			completed,
			notCompleted,
			approved: false,
		};
		setSendToApproval((prev) => [...prev, newApproval]);
		setSelectedPenalties([]);
		setLoaded(false);
		setTasks([]);
		localStorage.removeItem("tasks"); // Remove as tarefas carregadas
		toast({
			title: "Sucesso!",
			description: "Solicitação enviada para aprovação.",
			status: "success",
			position: "center",
			duration: 3000,
			isClosable: true,
		});
	}, [tasks, sendToApproval, toast]);

	useEffect(() => {
		localStorage.setItem("sendToApproval", JSON.stringify(sendToApproval));
		localStorage.setItem("Approved", JSON.stringify(approved));
	}, [sendToApproval, approved]);

	const approveTask = useCallback(() => {
		// Verifica se nenhuma tarefa foi completada
		const noOneCompletedTask = sendToApproval.some(
			(record) => record.completed.length === 0
		);
		// Verifica se há uma tarefa sem nenhuma tarefa completa e solicita confirmação
		if (noOneCompletedTask) {
			const confirmation = window.confirm(
        `Você está prestes a aprovar uma solicitação sem nenhuma tarefa completa.
Deseja enviar mesmo assim?`
				// "Você está prestes a aprovar uma solicitação sem nenhuma tarefa completa.Deseja enviar mesmo assim?"
			);
			if (!confirmation) return; // Cancela a aprovação se o administrador escolher "Cancelar"
		}
		setSendToApproval((prevApproval) =>
			prevApproval.map((record) => ({ ...record, approved: true }))
		);
		const approvedTasks = sendToApproval.map((task) => ({
			...task,
			penalties: selectedPenalties,
			approved: true,
		}));
		setApproved(approvedTasks);
		localStorage.setItem("Approved", JSON.stringify(approvedTasks));
		setSelectedPenalties([]);
		toast({
			title: "Sucesso, Volte para página principal!",
			description:
				selectedPenalties.length > 0
					? "Tarefas aprovadas com penalidades!"
					: "Tarefas aprovadas sem penalidades!",
			status: selectedPenalties.length > 0 ? "warning" : "success",
			position: "center",
			duration: 4000,
			isClosable: true,
		});
	}, [sendToApproval, selectedPenalties, toast]);

	// Função para alternar a tarefa entre completada e não completada
	const toggleTaskStatus = useCallback((taskDate, taskId) => {
		if (!sendToApproval) return;

		setSendToApproval((prevState) =>
			prevState.map((record) => {
				if (record.date === taskDate) {
					// Filtra a tarefa específica em 'completed' e 'notCompleted'
					const isCompleted = record.completed.find(
						(task) => task.id === taskId
					);
					const isNotCompleted = record.notCompleted.find(
						(task) => task.id === taskId
					);

					let updatedDailyReward = record.dailyReward;

					// Movendo entre os arrays e atualizando o valor de 'done' e 'dailyReward'
					if (isCompleted) {
						updatedDailyReward -= isCompleted.value; // Subtrai o valor da tarefa ao mover para notCompleted
						return {
							...record,
							dailyReward: updatedDailyReward,
							completed: record.completed.filter((task) => task.id !== taskId),
							notCompleted: [
								...record.notCompleted,
								{ ...isCompleted, done: false },
							],
						};
					} else if (isNotCompleted) {
						updatedDailyReward += isNotCompleted.value; // Adiciona o valor da tarefa ao mover para completed
						return {
							...record,
							dailyReward: updatedDailyReward,
							notCompleted: record.notCompleted.filter(
								(task) => task.id !== taskId
							),
							completed: [
								...record.completed,
								{ ...isNotCompleted, done: true },
							],
						};
					}
				}
				return record;
			})
		);
  }, [sendToApproval]);

	useEffect(() => {
		const storedTasks = JSON.parse(localStorage.getItem("tasks"));
		const storedDate = localStorage.getItem("lastLoadDate");
		const today = new Date().toLocaleDateString("pt-BR");

		if (storedTasks && storedDate === today) {
			setTasks(storedTasks);
			setLoaded(true);
			setLastLoadDate(storedDate);
		}
	}, []);

	const store = useMemo(
		() => ({
			tasks,
			loaded,
			approved,
			approveTask,
			loadDailyTasks,
			toggleTaskCompletion,
			togglePenalty,
			completeAllTasks,
			sendToApproval,
			recordCompletedTasks,
			toggleTaskStatus,
			selectedPenalties,
		}),
		[
			tasks,
			loaded,
			approved,
			sendToApproval,
			loadDailyTasks,
			recordCompletedTasks,
			approveTask,
      toggleTaskStatus,
			selectedPenalties,
		]
	);

	return <Provider value={store}>{children}</Provider>;
};

export default TaskProvider;

TaskProvider.propTypes = {
	children: PropTypes.node.isRequired,
};
