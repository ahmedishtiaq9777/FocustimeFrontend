import Sidebar from "../components/sidebar";
import MyTaskView from "../components/myTaskView";
import { useEffect, useState } from "react";

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
  fetchNotifications,
} from "../apicalls";
// import DashboardView from "../components/myDashboardView";
import DashboardView from "../components/myDashboardView2";
import TaskModal from "../components/addTaskmodel";
import toast from "react-hot-toast";

import { useSocket } from "../socket/socketContext";
import { STATUSCODE_200 } from "../publicvariables";
export default function Dashboard() {
  const [activeView, setActiveView] = useState("Dashboard");
  const { logout, user, token } = useAuth();
  const [cpage, setpage] = useState(1);
  const [nPages, settotalPages] = useState(1);
  const [pagArr, setpageArr] = useState([]);
  const [tasks, setTasks] = useState([]);

  const [taskModalVisible, setModalVisible] = useState(false); //
  const [taskToEdit, setTaskToEdit] = useState(null); //
  const [notifications, setNotifications] = useState([]);

  const socket = useSocket();

  console.log("user:", user);
  console.log("token", token);

  useEffect(() => {
    const loadTasks = async () => {
      await gettaskbypage();
    };
    loadTasks();
  }, [cpage]);

  useEffect(() => {
    if (!socket) return;

    socket.on("hello", (data) => {
      console.log("📩 Reminder received:", data);
      toast(`🔔 Reminder: ${data.message} is tomorrow!`);
    });

    socket.on("reminder", (data) => {
      console.log("📩 Reminder received:", data);
      setNotifications((prev) => [data.notification, ...prev]);
      toast(`🔔 Reminder: ${data.notification.message} `);
    });

    return () => socket.off("reminder");
  }, [socket]);

  useEffect(() => {
    const loadNotifications = async () => {
      try {
        const res = await fetchNotifications();
        console.log("notifications from db:", res);
        setNotifications(res); // store in state
      } catch (error) {
        console.error("Failed to load notifications:", error);
      }
    };

    if (user) {
      loadNotifications();
    }
  }, []);

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
    // console.log("task:", task);
    // ⭐ new
    setTaskToEdit(task);
    setModalVisible(true);
  };
  const logoutcall = async () => {
    try {
      const response = await logoutUser();
      if (response.status == STATUSCODE_200) logout();
    } catch (error) {
      console.log("error", error);
    }
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
            onaddclick={openAddTaskModal}
            oneditclick={openEditTaskModal}
          />
        );
      case "Settings":
        return <div></div>;
      case "Help":
        return <div></div>;

      default:
        return <DashboardView />;
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <Navbar
        user={user}
        onsearch={searchPress}
        notifications={notifications}
        setNotifications={setNotifications}
      />

      <div className="flex flex-1 mt-16  ">
        <Sidebar
          user={user}
          activeView={activeView}
          setActiveView={setActiveView}
          logout={logoutcall}
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
