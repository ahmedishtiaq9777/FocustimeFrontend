// Sidebar.jsx
export default function Sidebar({ activeView, setActiveView, logout, user }) {
  const menuItems = ["Dashboard", "My Task", "Settings", "Help"];

  return (
    <div className="w-64 bg-[#ff5f5f] h-screen text-white p-5 flex flex-col justify-between fixed left-0 top-0">
      {/* Profile Section */}
      <div>
        <div className="flex flex-col items-center mb-8">
          <img
            src="https://i.pravatar.cc/100"
            alt="profile"
            className="w-20 h-20 rounded-full border-4 border-white shadow-lg"
          />
          <h2 className="mt-3 font-semibold text-lg">{user?.name}</h2>
          <p className="text-sm opacity-80">{user?.email}</p>
        </div>

        {/* Menu Section */}
        <nav className="space-y-1">
          {menuItems.map((item) => (
            <SidebarItem
              key={item}
              label={item}
              activeView={activeView}
              setActiveView={setActiveView}
            />
          ))}
        </nav>
      </div>

      {/* Logout Button */}
      <button
        onClick={() => {
          logout();
        }}
        className="bg-white text-red-600 rounded px-4 py-2 font-semibold hover:bg-gray-200 transition-colors"
      >
        Logout
      </button>
    </div>
  );
}

const SidebarItem = ({ label, activeView, setActiveView }) => (
  <div
    onClick={() => setActiveView(label)}
    className={`cursor-pointer p-3 rounded-md transition-colors ${
      activeView === label
        ? "bg-red-700 font-semibold"
        : "hover:bg-red-600 font-medium"
    }`}
  >
    {label}
  </div>
);
