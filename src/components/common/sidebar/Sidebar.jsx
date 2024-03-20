import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="w-36 mx-5 my-8 h-96 bg-indigo-900 border-r rounded-lg border-indigo-300 p-4">
      <button className="my-1.5 px-6 py-1 text-black bg-indigo-200 font-semibold rounded-lg duration-150 hover:bg-indigo-500 active:bg-indigo-700">
        <Link to="/home">Home</Link>
      </button>
      <button className="my-1.5 px-1.5 py-1 text-black bg-indigo-200 font-semibold rounded-lg duration-150 hover:bg-indigo-500 active:bg-indigo-700">
        <Link to="/appointment-booking">Appointment</Link>
      </button>
      <button className="my-1.5 px-4 py-1 text-black bg-indigo-200 font-semibold rounded-lg duration-150 hover:bg-indigo-500 active:bg-indigo-700">
        <Link to="/indicators">Indicators</Link>
      </button>
    </div>
  );
};

export default Sidebar;
