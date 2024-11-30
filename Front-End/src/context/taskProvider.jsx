import { useState, useMemo, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import TaskContext from "./taskContext";
import { useToast } from "@chakra-ui/react";

const { Provider } = TaskContext;

export const TaskProvider = ({ children }) => {
	const toast = useToast();
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
    // Recupera o estado de carregamento diário do localStorage ou usa "false"
    return JSON.parse(localStorage.getItem("tasksLoadedToday")) || false;
  });

  // Salva as tarefas no localStorage sempre que elas mudam
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // Salva o estado de "sendToApproval" no localStorage sempre que ele muda
  useEffect(() => {
    localStorage.setItem("sendToApproval", JSON.stringify(sendToApproval));
  }, [sendToApproval]);

  // Salva o estado de "tasksLoadedToday" no localStorage sempre que ele muda
  useEffect(() => {
    localStorage.setItem("tasksLoadedToday", JSON.stringify(tasksLoadedToday));
  }, [tasksLoadedToday]);

  const updateTaskStatus = (taskId, newStatus) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, status: newStatus } : task
      )
    );
  };

	//Função para toggle de conclusão de tarefa
	const handleToggleTask = useCallback((taskId) => {
		// Atualiza imediatamente o estado das tarefas no contexto
		setTasks((prevTasks) =>
			prevTasks.map((task) =>
				task.id === taskId
					? { ...task, status: task.status === "completed" ? "pending" : "completed" }
					: task
			)
		);
	});

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
	}
	, [toast]);

  const store = useMemo(
    () => ({
      tasks,
      setTasks,
      sendToApproval,
      setSendToApproval,
      tasksLoadedToday,
      setTasksLoadedToday,
      updateTaskStatus,
			handleToggleTask,
			handleCompleteAllTasks,
    }),
    [tasks, sendToApproval, tasksLoadedToday,handleToggleTask, handleCompleteAllTasks]
  );

  return <Provider value={store}>{children}</Provider>;
};

export default TaskProvider;

TaskProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
