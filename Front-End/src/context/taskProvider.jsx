import { useState, useMemo, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import TaskContext from "./taskContext";
import { useToast } from "@chakra-ui/react";

import { punishments } from "../shared/punishments";

const { Provider } = TaskContext;

export const TaskProvider = ({ children }) => {
	const toast = useToast();
	const today = new Date().toLocaleDateString("pt-BR");

	const [tasks, setTasks] = useState(() => {
		// Recupera as tarefas do localStorage ou usa um array vazio
		const storedTasks = localStorage.getItem("tasks");
		return storedTasks ? JSON.parse(storedTasks) : [];
	});

	const [sendToApproval, setSendToApproval] = useState(() => {
		// Recupera o estado de "sendToApproval" do localStorage ou usa "false"
		return JSON.parse(localStorage.getItem("sendToApproval")) || false;
	});

	const [tasksLoadedToday, setTasksLoadedToday] = useState(() => {
		// Recupera a data de carregamento das tarefas do localStorage ou usa "null"
		localStorage.getItem("tasksLoadedDate");
	});

	const [approvedTasks, setApprovedTasks] = useState(() => {
		const storedApprovedTasks = localStorage.getItem("approvedTasks");
		return storedApprovedTasks ? JSON.parse(storedApprovedTasks) : [];
	});

	const [penalties, setPenalties] = useState(punishments);

	// Salva as tarefas, a data e outros estados no localStorage sempre que mudam
	useEffect(() => {
		localStorage.setItem("tasks", JSON.stringify(tasks));
		localStorage.setItem("tasksLoadedDate", tasksLoadedToday ? today : false);
		localStorage.setItem("sendToApproval", JSON.stringify(sendToApproval));
		localStorage.setItem("approvedTasks", JSON.stringify(approvedTasks));
		localStorage.setItem("penalties", JSON.stringify(penalties));
	}, [
		tasks,
		tasksLoadedToday,
		sendToApproval,
		today,
		approvedTasks,
		penalties,
	]);

	//Atualização diária automática das tarefas
	useEffect(() => {
		const interval = setInterval(() => {
			const newDate = new Date().toLocaleDateString("pt-BR");
			if (newDate !== today) {
				setTasksLoadedToday(false); // Permite carregar novas tarefas
				setSendToApproval(false); // Cancela a solicitação de aprovação
				// setTasks([]);
				setPenalties([]);
				localStorage.removeItem("tasks"); // Remove tarefas do dia anterior
			}
		}, 1000 * 60 * 60); // Verifica a cada 1 hora

		return () => clearInterval(interval); // Limpa o intervalo ao desmontar o componente
	}, [today]);

	const updateTaskStatus = (taskId, newStatus) => {
		setTasks((prevTasks) =>
			prevTasks.map((task) =>
				task.id === taskId ? { ...task, status: newStatus } : task
			)
		);
	};

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
    setPenalties((prevPenalties) =>
      prevPenalties.map((penalty) =>
        penalty.id === penaltyId
          ? { ...penalty, include: penalty.include === false ? true : false }
          : penalty
      ));
  }, []);

  console.log(penalties);

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
		});
	}, [toast]);

	// Concluir aprovação
	const handleApproval = useCallback(() => {
		const approved = tasks.filter((task) => task.status === "completed");
		setApprovedTasks(approved);
		setTasks([]);
		toast({
			title: "Aprovação enviada!",
			description: "As tarefas foram aprovadas e salvas.",
			status: "success",
			duration: 3000,
		});
	}, [tasks, toast]);

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
			updateTaskStatus,
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
