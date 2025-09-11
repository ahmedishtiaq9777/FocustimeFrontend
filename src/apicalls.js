import axios from "axios";
import api from "./axios";

export const getTasks = async () => {
  const res = await api.get("/tasks");
  return res.data;
};
export const updateNofication = async (notificationId) => {
  const res = await api.patch(`/notifications/${notificationId}/read`);
  return res.data;
};
export const fetchNotifications = async () => {
  const res = await api.get(`/notifications`);
  return res.data;
};
export async function getDashboardData() {
  const response = await api.get("/getDashboardData");
  return response.data;
}
export const deleteTaskapi = async (taskId) => {
  const res = await api.delete(`/tasks/${taskId}`);
  return res.data;
};

export const tasksWithsearch = async (search = "") => {
  try {
    const response = await api.get("/tasksWithsearch", {
      params: { search },
    });
    return response.data;
  } catch (error) {
    console.error("Failed to fetch tasks:", error);
    throw error;
  }
};
export async function fetchTasks(page = 1, limit = 5) {
  try {
    console.log("page:inside:", page);
    console.log("limitinside:", limit);
    const response = await api.get("/tasks", {
      params: {
        page,
        limit,
      },
    });

    const { tasks, totalTasks, currentPage, totalPages } = response.data;
    return { tasks, totalTasks, currentPage, totalPages };
  } catch (error) {
    console.error("Failed to fetch tasks:", error);
    throw error;
  }
}

export const updateTask = async (taskId, formData) => {
  try {
    const res = await api.put(`/task/${taskId}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data;
  } catch (error) {
    console.error("Error updating task:", error);
    throw error;
  }
};

export const addTask = async (task) => {
  const res = await api.post("/addtask2", task, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};

export const logoutUser = async () => {
  try {
    const response = await api.post("/logout");
    return response;
  } catch (error) {
    console.log("error in logout:", error);
  }
};
