import axiosInstance from "../api/axiosClient";

export const registerService = async (data: {
  name: string;
  email: string;
  password: string;
  role?: string;
}) => {
  const response = await axiosInstance.post(`/auth/register`, data);
  return response.data;
};

export const loginService = async (email: string, password: string) => {
  const response = await axiosInstance.post(`/auth/login`, { email, password });
  return response.data;
};

export const refreshService = async () => {
  const response = await axiosInstance.post(`/auth/refresh`);
  return response.data;
};

export const logoutService = async () => {
  const response = await axiosInstance.post(`/auth/logout`);
  return response.data;
};
