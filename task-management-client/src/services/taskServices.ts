import axiosInstance from "../api/axiosClient";

export interface TaskPayload {
  title: string;
  description: string;
  status?: "pending" | "completed";
}

export const getTasksService = async (page = 1, limit = 10) => {
  const response = await axiosInstance.get(`/tasks`, { params: { page, limit } });
  return response.data;
};

export const getTaskByIdService = async (id: string) => {
  const response = await axiosInstance.get(`/tasks/${id}`);
  return response.data;
};

export const createTaskService = async (data: TaskPayload) => {
  const response = await axiosInstance.post(`/tasks`, data);
  return response.data;
};

export const updateTaskService = async (id: string, data: TaskPayload) => {
  const response = await axiosInstance.put(`/tasks/${id}`, data);
  return response.data;
};

export const deleteTaskService = async (id: string) => {
  const response = await axiosInstance.delete(`/tasks/${id}`);
  return response.data;
};
