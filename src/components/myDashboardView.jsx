import React from "react";
import moment from "moment";
import TaskCard from "./taskcard";
export default function DashboardView({ tasks, pagArr, nPages, setpage }) {
  const completedTasks = tasks.filter((task) => task.status === "Completed");
  const inProgressTasks = tasks.filter((task) => task.status === "In Progress");
  const notStartedTasks = tasks.filter((task) => task.status === "Not Started");

  const totalTasks = tasks.length || 1; // Avoid division by zero

  // Calculate percentages rounded to whole numbers
  const completedPercent = Math.round(
    (completedTasks.length / totalTasks) * 100
  );
  const inProgressPercent = Math.round(
    (inProgressTasks.length / totalTasks) * 100
  );
  const notStartedPercent = Math.round(
    (notStartedTasks.length / totalTasks) * 100
  );
  return (
    <div className="flex gap-4 p-4">
      {/* Left Side - To-Do */}
      <div className="flex-1 flex flex-col gap-4">
        {tasks.map((task, idx) => (
          <TaskCard key={idx} task={task} />
        ))}
      </div>

      {/* Right Side */}
      <div className="w-[35%] flex flex-col gap-4">
        {/* Task Status */}
        <div className="bg-white shadow rounded p-4">
          <h3 className="font-semibold mb-4">Task Status</h3>
          <div className="flex justify-around">
            {/* Simple placeholder for charts */}
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full border-4 border-green-500 flex items-center justify-center">
                {completedPercent}%
              </div>
              <span className="text-green-500 mt-2">Completed</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full border-4 border-blue-500 flex items-center justify-center">
                {inProgressPercent}%
              </div>
              <span className="text-blue-500 mt-2">In Progress</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full border-4 border-red-500 flex items-center justify-center">
                {notStartedPercent}%
              </div>
              <span className="text-red-500 mt-2">Not Started</span>
            </div>
          </div>
        </div>

        {/* Completed Tasks */}
        <div className="bg-white shadow rounded p-4">
          <h3 className="font-semibold mb-4">Completed Task</h3>
          {completedTasks.map((task, idx) => (
            <div
              key={idx}
              className="bg-gray-50 rounded p-3 flex gap-3 items-start mb-2"
            >
              {/* Status indicator */}
              <div className="w-3 h-3 rounded-full bg-green-500 mt-1"></div>

              {/* Task Content */}
              <div className="flex-1">
                <h4 className="font-medium">{task.title}</h4>
                <p className="text-sm text-gray-600">{task.description}</p>
                <p className="text-xs text-gray-500 mt-1">
                  Status: <span className="text-green-600">{task.status}</span>
                </p>
                <p className="text-xs text-gray-500">
                  Completed {moment(task.completed_at).fromNow()}
                </p>
              </div>

              {/* Thumbnail */}
              <img
                src={task.image_url}
                alt={task.title}
                className="w-16 h-16 rounded object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
