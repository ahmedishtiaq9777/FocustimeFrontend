// TaskCard.jsx
import moment from "moment";
export default function TaskCard({ task, selectedTask, setSelectedTask }) {
  return (
    <div
      key={task.id}
      className={`flex justify-between items-center p-2 rounded-lg mb-2 cursor-pointer border ${
        selectedTask?.id === task?.id ? "border-blue-500" : "border-gray-200"
      }`}
      onClick={() => {
        selectedTask ? setSelectedTask(task) : () => null;
      }}
    >
      <div
        className={`w-3 h-3 rounded-full mt-1 ${
          task.status === "Completed"
            ? "bg-green-500"
            : task.status === "In Progress"
            ? "bg-blue-500"
            : "bg-red-500"
        }`}
      ></div>
      <div>
        <h3 className="font-semibold">{task.title}</h3>
        <p className="text-sm text-gray-600">
          {task.description.slice(0, 40)}...
        </p>
        <div className="m-3"></div>
        <div className="flex">
          <p className="text-xs text-gray-500">
            <strong>Priority:</strong> {task.priority}
          </p>
          <p className="text-xs pl-1 text-gray-400">
            <strong>Status</strong>: {task.status}
          </p>
          <p className="text-xs ml-3 text-gray-400">
            <strong>Created</strong>:
            {moment(task.created_at).format("YYYY-MM-DD")}
          </p>
        </div>
      </div>
      <img
        src={task.image_url}
        alt="task"
        className="w-16 h-16 rounded object-contain"
      />
    </div>
  );
}
