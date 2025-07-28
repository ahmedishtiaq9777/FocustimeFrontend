import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

import { getTasks, addTask, logoutUser } from "../apicalls";
const Dashboard = () => {
  const [newtask, settask] = useState("");
  const [tasks, setTasks] = useState([]);

  const { logout, user, token } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const taskList = await getTasks();
        setTasks(taskList);
      } catch (err) {
        console.error("Error fetching tasks:", err);
      }
    };
    fetchTasks();
  }, [token]);

  const addtaskHandler = async (e) => {
    e.preventDefault();
    if (!newtask.trim()) return;

    try {
      const newItem = await addTask(newtask.trim(), token);
      setTasks((prev) => [...prev, newItem]);
      settask("");
    } catch (err) {
      console.error("Error adding task:", err);
    }
  };

  // const addtask = (e) => {
  //   e.preventDefault(); // prevents form from refreshing the page
  //   if (newtask.trim() === "") return; // do nothing if input is empty

  //   // Add the new task to the task list
  //   setTasks((prevTasks) => [...prevTasks, newtask.trim()]);

  //   settask(""); // Clear the input field
  // };

  function TaskList({ tasks }) {
    return (
      <ul className="space-y-2">
        {tasks.map((task, index) => (
          <TaskItem key={index} task={task} />
        ))}
      </ul>
    );
  }

  function TaskItem({ task }) {
    return (
      <li className="p-3 bg-gray-100 rounded-md shadow-sm hover:bg-gray-200">
        {task}
      </li>
    );
  }
  const logout_ = async () => {
    try {
      await logoutUser();
      logout();
      navigate("/login");
    } catch (err) {
      console.error("Error during logout:", err);
    }
  };

  return (
    <div className="w-screen h-screen">
      <div className="max-w-xl mx-auto mt-12 p-6 bg-white rounded-xl shadow-md space-y-6">
        {/* Header Input + Buttons */}
        <div className="flex gap-3">
          <input
            type="text"
            placeholder="Enter a new task"
            onChange={(e) => settask(e.target.value)}
            className="flex-1 p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            onClick={addtaskHandler}
            className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
          >
            Add
          </button>
          <button
            onClick={logout_}
            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
          >
            Logout
          </button>
        </div>

        {/* Task List */}
        <div>
          <h2 className="text-xl font-semibold mb-2">Your Tasks</h2>
          <ul className="list-disc list-inside space-y-1 text-gray-800">
            <TaskList tasks={tasks} />
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
