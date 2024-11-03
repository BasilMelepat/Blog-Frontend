import axios from "axios";
import Admin from "../Admin/AdminPage/Admin";

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  config.headers.Authorization = "Bearer"+" "+ token||Admintoken
  return config;
});
