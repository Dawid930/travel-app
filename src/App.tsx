import React, { useMemo, useState } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Homepage from "./Page/HomePage";
import About from "./Page/About";
import Navbar from "./Components/Navbar";
import Create from "./Page/Create";
import TravelDetails from "./Page/TravelDetails";
import Login from "./Page/Login";
import { MyGlobalContext } from "./Components/UserContext";

function App() {
  const [user, setUser] = useState<string>("Guest");

  return (
    <BrowserRouter>
      <div className="app">
        <Navbar />
        <div className="content">
          <MyGlobalContext.Provider value={{ user, setUser }}>
            <Routes>
              <Route path="/" element={<Homepage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/create" element={<Create />} />
              <Route path="/about" element={<About />} />
              <Route path="/travels/:id" element={<TravelDetails />} />
            </Routes>
          </MyGlobalContext.Provider>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
