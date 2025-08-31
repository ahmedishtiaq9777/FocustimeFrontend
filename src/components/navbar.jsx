import { useState } from "react";
import dayjs from "dayjs";
import { FiBell } from "react-icons/fi"; // Feather icon

import { updateNofication } from "../apicalls";
export default function Navbar({
  onsearch,
  user,
  notifications,
  setNotifications,
}) {
  const [search, setSearch] = useState("");
  const [showNotifications, setShowNotifications] = useState(false);

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      onsearch(search);
    }
  };
  const handleNotificationClick = async (notificationId) => {
    try {
      let notify = await updateNofication(notificationId);
      console.log("updated notify:", notify);
      // Optionally update state to remove red dot or mark as read
      setNotifications((prev) =>
        prev.map((n) => (n.id === notificationId ? { ...n, is_read: true } : n))
      );
    } catch (error) {
      console.error("Failed to mark notification as read:", error);
    }
  };

  return (
    <nav className="bg-white shadow px-6 py-4 flex justify-between items-center fixed top-0 left-64 right-0 z-10">
      <div className="flex items-center gap-2">
        <h3 className="text-xl font-bold">My To do's</h3>
      </div>

      <div className="flex-1 max-w-3xl mx-6 ">
        <div className="relative">
          <input
            onChange={(e) => setSearch(e.target.value)}
            type="text"
            onKeyDown={handleKeyPress}
            placeholder="Search tasks..."
            className="w-full pl-10 pr-4 py-2 border rounded-full text-sm focus:outline-none focus:border-red-500"
          />
        </div>
      </div>

      <div className="flex items-center gap-4 relative">
        <span className="text-gray-600">Welcome, {user?.name}</span>

        {/* Notification Bell */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="focus:outline-none relative"
          >
            <FiBell className="w-6 h-6 text-gray-600" />
            {notifications?.length > 0 && (
              <span className="absolute top-0 right-0 inline-block w-2 h-2 bg-red-500 rounded-full" />
            )}
          </button>

          {/* Notification Dropdown */}
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-64 bg-white border rounded shadow-lg z-20">
              {notifications?.length > 0 ? (
                notifications.map((n) => (
                  <div
                    key={n.id}
                    className="px-4 py-2 border-b hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleNotificationClick(n.id)}
                  >
                    <p className="font-medium">{n.message}</p>
                    <p className="text-xs text-gray-500">
                      {/* {dayjs(n.scheduled_for).format("DD MMM YYYY, hh:mm A")} */}
                    </p>
                  </div>
                ))
              ) : (
                <p className="px-4 py-2 text-gray-500">No notifications</p>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
