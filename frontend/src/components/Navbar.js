import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="p-4 bg-blue-600 text-white flex justify-between">
      <h1 className="text-xl font-bold">🔍 Real-Time Monitor</h1>
      <div className="space-x-4">
        <Link to="/" className="px-4 py-2 bg-white text-blue-600 rounded">Dashboard</Link>
        <Link to="/heatmap" className="px-4 py-2 bg-white text-blue-600 rounded">Heatmap</Link>
        <Link to="/analytics" className="px-4 py-2 bg-white text-blue-600 rounded">AI Analytics</Link>
        <Link to="/admin" className="px-4 py-2 bg-white text-blue-600 rounded">Admin</Link>
      </div>
    </nav>
  );
};

export default Navbar;
