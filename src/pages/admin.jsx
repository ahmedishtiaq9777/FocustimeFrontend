import React, { useEffect, useState } from "react";
import { useAuth } from "../auth/AuthContext";
import api from "../axios";
import { useNavigate } from "react-router-dom";
import { STATUSCODE_403 } from "../publicvariables";
import ErrorLogModal from "../components/ErrorLogModal";
export const Admin = () => {
  const { token, logout } = useAuth();
  const [logs, setLogs] = useState([]);
  const [filecontent, setfileContent] = useState("");
  const [isOpen, setisOpen] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const res = await api.get("/admin/logs");
        console.log("response:", res.data);
        setLogs(res.data.logs);
      } catch (err) {
        const status = err?.response?.status;
        if (status == STATUSCODE_403) logout();
        console.error(err);
      }
    };
    console.log("admin use effect");

    fetchLogs();
  }, [token]);

  const handleLogClick = async (file) => {
    // Example: open log in a modal or navigate
    try {
      const key = file.key;
      const res = await api.get("/admin/logs/file", { params: { key } });
      const content = JSON.parse(res.data.content);
      setfileContent(content);
      setisOpen(true);
    } catch (error) {
      console.log("error in /admin/logs/file:", error);
    }
  };
  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Server Logs</h2>

      {logs.length === 0 ? (
        <p className="text-gray-500">No logs available.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                  File Name
                </th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                  Last Modified
                </th>
                <th className="px-4 py-2 text-right text-sm font-medium text-gray-700">
                  Size
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {logs.map((file) => (
                <tr
                  key={file.key}
                  className="hover:bg-gray-50"
                  onClick={() => handleLogClick(file)}
                >
                  <td className="px-4 py-2">{file.key}</td>
                  <td className="px-4 py-2">
                    {new Date(file.lastModified).toLocaleString()}
                  </td>
                  <td className="px-4 py-2 text-right">
                    {(file.size / 1024).toFixed(2)} KB
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal */}
      {isOpen && (
        <ErrorLogModal filecontent={filecontent} setisOpen={setisOpen} />
      )}
    </div>
  );
};
