import React, { useEffect, useState } from "react";

const AdminDashboard = () => {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/admin/logs")
      .then((res) => res.json())
      .then((data) => setLogs(data))
      .catch((err) => console.error("❌ Error fetching logs:", err));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">🛠 Admin Dashboard</h1>
      <h2 className="text-xl my-4">📜 User Interaction Logs</h2>

      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Element</th>
            <th className="border p-2">X</th>
            <th className="border p-2">Y</th>
            <th className="border p-2">Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {logs.map((log, index) => (
            <tr key={index}>
              <td>{log.element}</td>
              <td>{log.x || "-"}</td>
              <td>{log.y || "-"}</td>
              <td>{new Date(log.timestamp).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;
