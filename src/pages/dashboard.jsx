import React, { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { List, FileText, Plus } from "lucide-react";
import { MdEdit, MdDelete } from "react-icons/md";
import {
  getTasks,
  addTask,
  logoutUser,
  deleteTaskapi,
  fetchTasks,
  tasksWithsearch,
} from "../apicalls";

const Dashboard = () => {
  const [newtask, settask] = useState("");

  const [scheduledFor, setScheduledFor] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [count, setcount] = useState(0);
  const [cpage, setpage] = useState(1);
  const [nPages, settotalPages] = useState(1);
  const [pagArr, setpageArr] = useState([]);

  const [search, setSearch] = useState("");

  const { logout, user, token } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    console.log("useEffect dashboard");

    const loadTasks = async () => {
      await gettaskbypage();
    };
    loadTasks();
  }, [cpage]);

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
  const addtaskHandler = async (e) => {
    e.preventDefault();
    if (!newtask.trim()) return;

    console.log(typeof scheduledFor);
    try {
      const Taskobj = {
        title: newtask.trim(),
        scheduled_for: scheduledFor,
      };

      const response = await addTask(Taskobj);
      setTasks((prev) => [...prev, Taskobj]);
      settask("");
      console.log("response:", response);
    } catch (error) {
      if (error.response) {
        if (error.response.status === 403) {
          console.log("error adding  task ..session expired.");
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
      }

      console.error("Error adding task:", error);
    }
  };

  const gettaskbypage = async () => {
    try {
      const { tasks, totalTasks, currentPage, totalPages } = await fetchTasks(
        cpage,
        7
      );

      const arr = Array.from({ length: totalPages }, (_, i) => i + 1);
      setpageArr(arr);

      console.log("tasks:length", tasks.length);
      console.log("total pages:", totalPages);
      settotalPages(totalPages);
      setTasks(tasks);
      // setpage(currentPage);
      console.log("tasks:", tasks);
      console.log("totalTasks:", totalTasks);
      console.log("currentpage:", currentPage);
      console.log("totalPages", totalPages);
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
  const searchPress = async () => {
    let temptask = await tasksWithsearch(search);
    setTasks(temptask);
  };

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
    <div className="min-h-screen w-full bg-[#0f172a] text-white p-6 font-mono">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-cyan-400">Focus Time</h1>
        <p className="text-gray-400 mt-2">
          Your beautiful workspace for tasks and notes
        </p>
      </div>

      <div className="mt-8">
        {/* Tabs */}
        <div className="flex border-b  border-gray-700">
          <button className="text-cyan-400 px-4 py-2 border-b-2 border-cyan-400 flex items-center gap-2">
            <List className="w-4 h-4" />
            Todo List
          </button>
          <button className="text-gray-400 px-4 py-2 flex items-center gap-2">
            <FileText className="w-4 h-4" />
            Notepad
          </button>
          <button
            onClick={logout_}
            className="bg-red-500 ml-auto text-black font-bold px-4 py-2  rounded-md hover:bg-red-600"
          >
            Logout
          </button>
        </div>

        {/* Todo Card */}
        <div className="bg-[#1e293b] mt-6 rounded-lg p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="text-cyan-400">
              <List className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl">Todo List</h2>
              <p className="text-gray-400 text-sm">
                {tasks?.filter((t) => t.completed).length} of {tasks?.length}
                completed
              </p>
            </div>
          </div>

          {/* Add Task */}
          <div className="flex gap-2 mb-4">
            <input
              value={newtask}
              onChange={(e) => settask(e.target.value)}
              placeholder="Add a new task..."
              className="bg-[#0f172a] border border-gray-600 rounded px-4 py-2 text-white w-full"
            />
            <button
              onClick={addtaskHandler}
              className="bg-cyan-400 text-[#0f172a] px-4 py-2 rounded flex items-center gap-1"
            >
              <Plus className="w-4 h-4" /> Add
            </button>
          </div>

          {/* Filters */}
          <div className="flex gap-2 mb-4">
            <input
              placeholder="Search todos..."
              onChange={(e) => setSearch(e.target.value)}
              className="bg-[#0f172a] border border-gray-600 rounded px-4 py-2 text-white w-full"
            />
            <button
              onClick={searchPress}
              className="bg-[#0f172a] text-black border border-gray-600 rounded px-3 py-2"
            >
              Search
            </button>
            <select
              onChange={(e) => {
                setpage(e.target.value);
              }}
              className="bg-[#0f172a] text-white border border-gray-600 rounded px-3 py-2"
            >
              {pagArr?.map((pagnum, index) => (
                <option value={pagnum} key={index}>
                  {pagnum} of {nPages}
                </option>
              ))}
            </select>
          </div>

          {/* Todo Items */}
          <div className="space-y-2">
            {tasks?.map((t, i) => (
              <div
                key={i}
                className="flex items-center justify-between gap-3 bg-[#0f172a] p-3 rounded border border-gray-700"
              >
                <div className="flex items-center gap-3">
                  <span>{t.title}</span>
                </div>

                <div className="flex gap-2">
                  <button className="text-blue-400 hover:text-blue-600">
                    <MdEdit size={18} />
                  </button>
                  <button
                    onClick={() => deleteTask(t.id)}
                    className="text-red-400 hover:text-red-600"
                  >
                    <MdDelete size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  //   return (
  //     <div className="w-screen h-screen">
  //       <div className="max-w-xl mx-auto mt-12 p-6 bg-white rounded-xl shadow-md space-y-6">
  //         {/* Header Input + Buttons */}
  //         <div className="flex gap-3">
  //           <label>
  //             Task Title:
  //             <input
  //               type="text"
  //               placeholder="Enter a new task"
  //               onChange={(e) => settask(e.target.value)}
  //               className="flex-1 p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
  //             />
  //           </label>
  //           <label>
  //             Scheduled For:
  //             <DatePicker
  //               selected={scheduledFor}
  //               onChange={(date) => setScheduledFor(date)}
  //               showTimeSelect
  //               dateFormat="Pp"
  //             />
  //           </label>
  //           <button
  //             onClick={addtaskHandler}
  //             className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
  //           >
  //             Add
  //           </button>
  //           <button
  //             onClick={logout_}
  //             className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
  //           >
  //             Logout
  //           </button>
  //         </div>

  //         {/* Task List */}
  //         <div>
  //           <h2 className="text-xl font-semibold mb-2">Your Tasks</h2>
  //           <ul className="list-disc list-inside space-y-1 text-gray-800">
  //             <TaskList tasks={tasks} />
  //           </ul>
  //         </div>
  //       </div>
  //     </div>
  //   );
};

export default Dashboard;
