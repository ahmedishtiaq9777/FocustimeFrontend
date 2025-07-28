import axios from "axios";
import { baseUrl } from "./publicvariables";

const api = axios.create({
  baseURL: baseUrl,
});

// Interceptors
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    console.log("Outgoing request:", config);
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error(error.response?.data || error.message);
    return Promise.reject(error);
  }
);
export default api;
