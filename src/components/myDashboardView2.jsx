import { useEffect, useState } from "react";
import { getDashboardData } from "../apicalls"; // 🔥 you'll implement this API
import moment from "moment";
import TaskCard from "./taskcard";

export default function DashboardView() {
  const [loading, setLoading] = useState(true);
  const [summary, setSummary] = useState({});
  const [upcomingTasks, setUpcomingTasks] = useState([]);
  const [importantTasks, setImportantTasks] = useState([]);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        setLoading(true);
        const data = await getDashboardData();
        console.log("dashboard Data:", data);
        setSummary(data.summary);
        setUpcomingTasks(data.upcomingTasks);
        setImportantTasks(data.importantTasks);
      } catch (err) {
        console.error("Error fetching dashboard data", err);
        alert("Failed to load dashboard");
      } finally {
        setLoading(false);
      }
    };
    fetchDashboard();
  }, []);

  if (loading) return <p className="p-4">Loading dashboard...</p>;

  return (
    <div className="p-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <SummaryCard
          title="Total Tasks"
          value={summary.total || 0}
          color="bg-blue-500"
        />
        <SummaryCard
          title="Completed"
          value={summary.completed || 0}
          color="bg-green-500"
        />
        <SummaryCard
          title="Pending"
          value={summary.pending || 0}
          color="bg-yellow-500"
        />
        <SummaryCard
          title="High Priority"
          value={summary.highPriority || 0}
          color="bg-red-500"
        />
      </div>

      <div className="grid grid-cols-2 gap-6">
        {/* Upcoming Tasks */}
        <TaskSection
          title="Upcoming Tasks (Next 7 Days)"
          tasks={upcomingTasks}
        />

        {/* Important Tasks */}
        <TaskSection title="Important Tasks" tasks={importantTasks} />
      </div>
    </div>
  );
}

function SummaryCard({ title, value, color }) {
  return (
    <div className={`${color} text-white p-4 rounded-xl shadow-md`}>
      <h3 className="text-sm font-medium">{title}</h3>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );
}

function TaskSection({ title, tasks }) {
  return (
    <div className="bg-white shadow rounded-xl p-4">
      <h3 className="font-semibold mb-3">{title}</h3>
      {tasks.length === 0 ? (
        <p className="text-gray-500 text-sm">No tasks</p>
      ) : (
        <ul className="space-y-2">
          {tasks.map((t, index) => (
            <TaskCard task={t} key={index} />
          ))}
        </ul>
      )}
    </div>
  );
}
