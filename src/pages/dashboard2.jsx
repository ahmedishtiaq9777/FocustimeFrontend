import Sidebar from "../components/sidebar";
import MyTaskView from "../components/myTaskView";
import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import Navbar from "../components/navbar";
import {
  getTasks,
  addTask,
  logoutUser,
  deleteTaskapi,
  fetchTasks,
  tasksWithsearch,
  updateTask,
} from "../apicalls";
import DashboardView from "../components/myDashboardView";
import TaskModal from "../components/addTaskmodel";

export default function Dashboard() {
  const [activeView, setActiveView] = useState("Dashboard");
  const { logout, user, token } = useAuth();
  const [cpage, setpage] = useState(1);
  const [nPages, settotalPages] = useState(1);
  const [pagArr, setpageArr] = useState([]);
  const [tasks, setTasks] = useState([]);

  const [taskModalVisible, setModalVisible] = useState(false); // ⭐ renamed
  const [taskToEdit, setTaskToEdit] = useState(null); // ⭐ new: store task being edited

  useEffect(() => {
    const loadTasks = async () => {
      await gettaskbypage();
    };
    loadTasks();
  }, [cpage]);

  const gettaskbypage = async () => {
    try {
      const { tasks, totalTasks, currentPage, totalPages } = await fetchTasks(
        cpage,
        7
      );

      const arr = Array.from({ length: totalPages }, (_, i) => i + 1);
      setpageArr(arr);

      settotalPages(totalPages);
      setTasks(tasks);
      // setpage(currentPage);
    } catch (error) {
      if (error.response) {
        if (error.response.status === 403) {
          console.log("You are not authorized to view tasks.");
          alert("Session expired. Please log in again.");
          logout();
        } else {
          alert(
            `Error ${error.response.status}: ${
              error.response.data.error || "Something went wrong."
            }`
          );
        }
      } else if (error.request) {
        alert("No response from server.");
      } else {
        console.log(error);
        alert("An unexpected error occurred.");
      }
    }
  };

  const deleteTask = async (taskId) => {
    try {
      let response = await deleteTaskapi(taskId);
      console.log("Deleted successfully:", response);
      setTasks((prev) => prev.filter((task) => task.id !== taskId));
    } catch (error) {
      if (error.response) {
        if (error.response.status === 403) {
          console.log("error in deleting task session expired.");
          alert("Session expired. Please log in again.");
          logout();
          // navigate("/login");
        } else {
          alert(
            `Error ${error.response.status}: ${
              error.response.data.error || "Something went wrong."
            }`
          );
        }

        // The request was made and server responded with status code outside 2xx
        console.error("Server error:", error.response.data);
        alert(`Error: ${error.response.data.error}`);
      } else if (error.request) {
        // The request was made but no response was received
        console.error("No response from server:", error.request);
        alert("No response from server. Please try again later.");
      } else {
        // Something else caused the error
        console.error("Error:", error.message);
        // alert("An unexpected error occurred.");
      }
    }
  };
  const addTaskSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("title", data?.title);
      formData.append("scheduled_for", data.scheduledFor);
      formData.append("priority", data.priority);
      formData.append("description", data.description);
      if (data.image) formData.append("image", data.image); // backend handles upload
      formData.append("status", data.status);

      if (taskToEdit) {
        // ⭐ editing mode
        await updateTask(data.id, formData); // assumes updateTask API exists
        alert("Task updated successfully!");
      } else {
        await addTask(formData);
        alert("Task created successfully!");
      }

      await gettaskbypage(); // refresh list
      setModalVisible(false);
      setTaskToEdit(null); // reset
    } catch (err) {
      console.error(err);

      alert(taskToEdit ? "Error updating task" : "Error creating task");
    }
  };

  const openAddTaskModal = () => {
    setTaskToEdit(null); // ⭐ reset
    setModalVisible(true);
  };

  const openEditTaskModal = (task) => {
    console.log("task:", task);
    // ⭐ new
    setTaskToEdit(task);
    setModalVisible(true);
  };

  const closeModal = () => {
    // ⭐ renamed
    setModalVisible(false);
    setTaskToEdit(null);
  };

  const changemodelVisible = () => {
    setModalVisible((t) => !t);
  };
  const searchPress = async (search) => {
    let temptask = await tasksWithsearch(search);
    setTasks(temptask);
  };
  const Setpage_ = (page) => {
    setpage(page);
  };
  const renderView = () => {
    switch (activeView) {
      case "My Task":
        return (
          <MyTaskView
            deleteTask={deleteTask}
            tasks={tasks}
            pagArr={pagArr}
            nPages={nPages}
            setpage={Setpage_}
            onaddclick={openAddTaskModal} // ⭐ changed
            oneditclick={openEditTaskModal} // ⭐ new
          />
        );

      default:
        return (
          <DashboardView
            tasks={tasks}
            pagArr={pagArr}
            nPages={nPages}
            setpage={Setpage_}
          />
        );
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <Navbar user={user} onsearch={searchPress} />

      <div className="flex flex-1 mt-16  ">
        <Sidebar
          user={user}
          activeView={activeView}
          setActiveView={setActiveView}
          logout={logout}
        />
        {taskModalVisible && (
          <TaskModal
            onSubmit={addTaskSubmit}
            onClose={changemodelVisible}
            taskToEdit={taskToEdit}
          />
        )}
        <div className="flex-1 ml-64">{renderView()}</div>
        {/*right side view*/}
      </div>
    </div>
  );
}
