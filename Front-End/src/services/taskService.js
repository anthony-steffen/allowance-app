import { API } from './api';

export const fetchTasks = async () => {
  const data = await API.get('/tasks');
  return data;
};

export const updateTaskStatus = async (taskId) => {
  const  data  = await API.patch(`/tasks/${taskId}/toggle`);
  return data;
};

export const completeDailyTasks = async () => {
  await API.post('/tasks/complete-all');
};