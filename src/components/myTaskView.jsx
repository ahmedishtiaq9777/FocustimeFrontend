// MyTaskView.jsx
import { useEffect, useState } from "react";
import moment from "moment";
import TaskCard from "./taskcard";

export default function MyTaskView({
  tasks,
  pagArr,
  nPages,
  setpage,
  deleteTask,
  onaddclick,
  oneditclick,
}) {
  const [selectedTask, setSelectedTask] = useState(tasks[0]);

  useEffect(() => {
    const load = () => {
      console.log("selected task:", selectedTask);
      console.log("tasks:", tasks[0]);
      setSelectedTask(tasks[0]);
    };
    load();
  }, [tasks]);

  const deletetaskhandler = () => {
    deleteTask(selectedTask.id);
    setSelectedTask(tasks[0]);
  };
  const editTaskhandler = () => {
    oneditclick(selectedTask);
  };

  return (
    <div className="flex gap-4 p-2  overflow-hidden">
      {/* Task List */}
      <div className="w-[50%]  h-[calc(100vh-200px)] overflow-y-auto  shadow rounded p-3">
        <div className="flex">
          <h2 className="font-bold mb-3  text-left underline flex-1/2">
            My Tasks
          </h2>
          <button onClick={() => onaddclick()} className="mr-2 text-l">
            Add Task+
          </button>
          <p className="text-gray-400 text-sm mr-3">
            {tasks?.filter((t) => t.completed).length} of {tasks?.length}
            completed
          </p>
          <select
            onChange={(e) => {
              setpage(e.target.value);
            }}
            className="bg-[#0f172a] text-white border border-gray-600 rounded px-3 py-2 mb-1"
          >
            {pagArr?.map((pagnum, index) => (
              <option value={pagnum} key={index}>
                {pagnum} of {nPages}
              </option>
            ))}
          </select>
        </div>
        {tasks.map((task, index) => (
          <TaskCard
            key={index}
            task={task}
            selectedTask={selectedTask}
            setSelectedTask={setSelectedTask}
          />
        ))}
      </div>

      {/* Task Details */}
      <div className="flex-1 bg-white shadow rounded p-4">
        {selectedTask && (
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img
                src={selectedTask.image_url}
                alt="task"
                className="w-100 h-100 rounded"
              />
              <div>
                <h3 className="font-bold mb-1">{selectedTask.title}</h3>
                <p className="text-sm mb-1">
                  <span className="font-semibold">Priority:</span>
                  <span className="text-red-500 ml-2">
                    {selectedTask.priority}
                  </span>
                </p>
                <p className="text-sm mb-1">
                  <span className="font-semibold ">Status:</span>
                  <span className="ml-2">{selectedTask.status}</span>
                </p>
                <p className="text-xs text-gray-500 mb-1">
                  Createdon:
                  <span className="ml-2">
                    {moment(selectedTask.created_at).format("YYYY-MM-DD")}
                  </span>
                </p>
              </div>
            </div>

            <p className="mb-2">
              <strong>Task Title:</strong> {selectedTask.title}
            </p>
            <p className="mb-2">
              <strong>Description:</strong> {selectedTask.description}
            </p>
            <p className="mb-2">
              <strong>Scheduled For:</strong>{" "}
              {moment(selectedTask.scheduled_for).format("YYYY-MM-DD")}
            </p>
            <p className="mb-2">
              <strong>Is Important:</strong>{" "}
              {selectedTask.is_important ? "Yes" : "No"}
            </p>
            <p className="mb-2">
              <strong>Completed:</strong>{" "}
              {selectedTask.is_completed
                ? `Yes (on ${moment(selectedTask.completed_at).format(
                    "dddd, MMMM Do YYYY"
                  )})`
                : "No"}
            </p>

            <div className="flex gap-3 mt-4">
              <button
                onClick={() => editTaskhandler()}
                className="p-2 bg-blue-500"
              >
                Edit
              </button>
              <button
                onClick={() => deletetaskhandler()}
                className="p-2 bg-red-500 text-black rounded"
              >
                Delete
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
