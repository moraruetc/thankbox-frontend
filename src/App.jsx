import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AddMessage from "./components/AddMessage.jsx";
import MessageList from "./components/MessageList.jsx";
import Navbar from "./components/Navbar.jsx";

const App = () => {
  return (
    <Router>
      <Navbar />
      <div className=" mx-auto sm:p-4 p-2">
        <Routes>
          <Route path="/" element={<MessageList />} />
          <Route path="/add" element={<AddMessage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
