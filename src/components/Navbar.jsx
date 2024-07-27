import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="p-4 bg-white shadow-md flex flex-col md:flex-row justify-between items-center border-b-2">
      <Link to={"/"}>
        <h1 className="text-2xl font-extrabold text-blue-600">Thankbox</h1>
      </Link>
      <div className="mt-2 md:mt-0">
        <Link
          to="/"
          className="mr-4 text-lg text-gray-700 hover:text-blue-600 transition duration-300 ease-in-out hover:underline"
        >
          Message List
        </Link>
        <Link
          to="/add"
          className="text-lg text-gray-700 hover:text-blue-600 transition duration-300 ease-in-out hover:underline"
        >
          Add Message
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
