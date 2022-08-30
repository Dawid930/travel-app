import React, { useMemo, useState } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Homepage from "./Components/HomePage";
import About from "./Components/About";
import Navbar from "./Components/Navbar";
import Create from "./Components/Create";
import TravelDetails from "./Components/TravelDetails";
import Login from "./Components/Login";
import { MyGlobalContext } from "./Components/UserContext";

function App() {

  const [user, setUser] = useState<string>('Guest');

  //const value = useMemo(() => ({ user, setUser }), [user, setUser]);

  return (
    <BrowserRouter>
      <div className="app">
        <Navbar />
        <div className="content">
          <MyGlobalContext.Provider value = {{user, setUser}}>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/" element={<Homepage />} />
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
