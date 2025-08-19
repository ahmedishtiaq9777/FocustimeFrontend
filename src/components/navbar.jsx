import { useState } from "react";

export default function navbar({ onsearch, user }) {
  const [search, setSearch] = useState("");

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      onsearch(search);
      //   console.log('Enter pressed:', value);
      // Do something here (e.g., submit form, call API)
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
          <svg
            className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-4.35-4.35M10 18a8 8 0 100-16 8 8 0 000 16z"
            />
          </svg>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <span className="text-gray-600">Welcome, {user?.name}</span>
      </div>
    </nav>
  );
}
