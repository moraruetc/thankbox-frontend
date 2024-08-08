import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AddMessage from "./components/AddMessage.jsx";
import MessageList from "./components/MessageList.jsx";
import Signup from "./components/Signup.jsx";
import Singin from "./components/Signin.jsx";
import Navbar from "./components/Navbar.jsx";

const App = () => {
  return (
    <Router>
      <Navbar />
      <div className=" mx-auto sm:p-4 p-2">
        <Routes>
          <Route path="/" element={<MessageList />} />
          <Route path="/add" element={<AddMessage />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/singin" element={<Singin />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
