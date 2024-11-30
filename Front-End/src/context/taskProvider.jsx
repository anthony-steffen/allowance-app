import { useState, useMemo } from "react";
import PropTypes from "prop-types";
import TaskContext from "./taskContext";


const { Provider } = TaskContext;

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [sendToApproval, setSendToApproval] = useState(false);

  const updateTaskStatus = (taskId, newStatus) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, status: newStatus } : task
      )
    );
  };

	const store = useMemo(
		() => ({
			tasks,
			setTasks,
			sendToApproval,
			setSendToApproval,
			updateTaskStatus,
		}),
		[ tasks, sendToApproval ]
	);

	return <Provider value={store}>{children}</Provider>;
};

export default TaskProvider;

TaskProvider.propTypes = {
	children: PropTypes.node.isRequired,
};
