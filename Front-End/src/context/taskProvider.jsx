import { useState, useMemo, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import TaskContext from "./taskContext";
import { useToast } from "@chakra-ui/react";

import { punishments } from "../shared/punishments";

const { Provider } = TaskContext;

export const TaskProvider = ({ children }) => {
	const toast = useToast();
	const getTodayDate = () => new Date().toLocaleDateString("pt-BR");

	const [tasks, setTasks] = useState(() => {
		// Recupera as tarefas do localStorage ou usa um array vazio
		const storedTasks = localStorage.getItem("tasks");
		return storedTasks ? JSON.parse(storedTasks) : [];
  });

	const [sendToApproval, setSendToApproval] = useState(() => {
		// Recupera o estado de "sendToApproval" do localStorage ou usa "false"
		const storedSendToApproval = localStorage.getItem("sendToApproval");
    return storedSendToApproval ? JSON.parse(storedSendToApproval) : false;
	});

	const [tasksLoadedToday, setTasksLoadedToday] = useState(() => {
		// Recupera a data de carregamento das tarefas do localStorage ou usa "false"
		const storedTasksLoadedDate = localStorage.getItem("tasksLoadedDate");
		return storedTasksLoadedDate ? JSON.parse(storedTasksLoadedDate) : false;
	});

	const [approvedTasks, setApprovedTasks] = useState(() => {
		const storedApprovedTasks = localStorage.getItem("approvedTasks");
		return storedApprovedTasks ? JSON.parse(storedApprovedTasks) : [];
	});

	const [penalties, setPenalties] = useState(punishments);

	// Salva as tarefas, a data e outros estados no localStorage sempre que mudam
	useEffect(() => {
		localStorage.setItem("tasks", JSON.stringify(tasks));
		localStorage.setItem("tasksLoadedDate", JSON.stringify(tasksLoadedToday));
		localStorage.setItem("sendToApproval", JSON.stringify(sendToApproval));
		localStorage.setItem("approvedTasks", JSON.stringify(approvedTasks));
		localStorage.setItem("penalties", JSON.stringify(penalties));
		localStorage.setItem("today", getTodayDate());
	}, [
		tasks,
		tasksLoadedToday,
		sendToApproval,
		approvedTasks,
		penalties,
	]);

	// Monitora a chegada de um novo dia para limpar as tarefas
	const checkNewDay = setInterval(() => {
		const today = getTodayDate();
		if (tasksLoadedToday && tasksLoadedToday !== today) {
			// Reseta o estado se a data mudou
			setTasksLoadedToday(false);
			setSendToApproval(false);
			localStorage.removeItem("approvalDate");
			localStorage.setItem("tasksLoadedDate", JSON.stringify(false));
		}
	}, 10000 * 60);

	// Limpa o timeout
	useEffect(() => {
		return () => clearInterval(checkNewDay);
	}
	, [tasksLoadedToday, checkNewDay]);


	//Toggle para aprovar/reprovar tarefas
	const handleToggleTask = useCallback((taskId) => {
		// Atualiza imediatamente o estado das tarefas no contexto
		setTasks((prevTasks) =>
			prevTasks.map((task) =>
				task.id === taskId
					? {
							...task,
							status: task.status === "completed" ? "pending" : "completed",
					  }
					: task
			)
		);
	}, []);

	// Toogle para incluir/remover penalidades
	const togglePenalty = useCallback((penaltyId) => {
    const penaltiesToInclude = penalties.map((penalty) =>
			penalty.id === penaltyId
				? {
						...penalty,
						include: penalty.include === false ? true : false,
				  }
				: penalty
		);
		setPenalties(penaltiesToInclude);
	}, [ penalties ]);


	const handleCompleteAllTasks = useCallback(() => {
		// Marca todas as tarefas como concluídas
		setTasks((prevTasks) =>
			prevTasks.map((task) => ({ ...task, status: "completed" }))
		);

		toast({
			title: "Tarefas concluídas!",
			description: "Todas as tarefas foram marcadas como concluídas.",
			status: "success",
			duration: 3000,
			position: "bottom",
		});
	}, [toast]);

	// Enviar aprovação / Tarefas completadas + penalidades
	const handleApproval = useCallback(() => {
		const approved = sendToApproval.filter((task) => task.status === "completed");
		const totalApprovedValue = approved.reduce((acc, task) => acc + task.value, 0);
	
		const activePenalties = penalties.filter((penalty) => penalty.include === true);
		const totalPenaltiesValue = activePenalties.reduce((acc, penalty) => acc + penalty.value, 0);
	
		const netValue = totalApprovedValue - totalPenaltiesValue;
	
		// Adiciona a entrada para a lista de aprovados com a data
		const approvalEntry = {
			date: getTodayDate(),
			tasks: approved,
			penalties: activePenalties,
			netValue,
		};
	
		// Atualiza as tarefas aprovadas e limpa o estado
		setApprovedTasks((prev) => [...prev, approvalEntry]);
		setTasks([]);
		setPenalties([]);
		setSendToApproval([]);
	
		toast({
			title: "Solicitação enviada para aprovação.",
			description: `Você acumulou R$ ${netValue.toFixed(2)} hoje.`,
			status: "success",
			duration: 3000,
		});
	}, [penalties, sendToApproval , toast]);

	const store = useMemo(
		() => ({
			tasks,
			setTasks,
			sendToApproval,
			setSendToApproval,
			tasksLoadedToday,
			setTasksLoadedToday,
			approvedTasks,
			setApprovedTasks,
			penalties,
			setPenalties,
			handleToggleTask,
			handleCompleteAllTasks,
			handleApproval,
			togglePenalty,
		}),
		[
			tasks,
			setTasks,
			sendToApproval,
			setSendToApproval,
			tasksLoadedToday,
			setTasksLoadedToday,
			approvedTasks,
			setApprovedTasks,
			penalties,
			setPenalties,
			handleToggleTask,
			handleCompleteAllTasks,
			handleApproval,
			togglePenalty,
		]
	);

	return <Provider value={store}>{children}</Provider>;
};

export default TaskProvider;

TaskProvider.propTypes = {
	children: PropTypes.node.isRequired,
};
