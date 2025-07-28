import api from "./axios";

export const getTasks = async () => {
  const res = await api.get("/tasks");
  return res.data;
};

export const addTask = async (task) => {
  const res = await api.post("/addtasks", { task });
  return res.data;
};

export const logoutUser = async () => {
  try {
    const response = await api.post("/logout");
    return response.data;
  } catch (error) {
    console.log("error in logout:", error);
  }
};
