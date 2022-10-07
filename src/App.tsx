import React, { useMemo, useState } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Homepage from "./Page/HomePage";
import About from "./Page/About";
import Navbar from "./Components/Navbar";
import Create from "./Page/Create";
import TravelDetails from "./Page/TravelDetails";
import Login from "./Page/Login";
//import { MyGlobalContext } from "./Components/UserContext";
import { LoginContextProvider } from "./Components/UserContext";

function App() {
  //const [userContext, setUserContext] = useState<string>("Guest");

  return (
    <LoginContextProvider>
      <BrowserRouter>
        <div className="app">
          <Navbar />
          <div className="content">
            <Routes>
              <Route path="/" element={<Homepage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/create" element={<Create />} />
              <Route path="/about" element={<About />} />
              <Route path="/travels/:id" element={<TravelDetails />} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </LoginContextProvider>
  );
  /* return (
    <BrowserRouter>
      <MyGlobalContext.Provider value={{ userContext, setUserContext }}>
        <div className="app">
          <Navbar />
          <div className="content">
            <Routes>
              <Route path="/" element={<Homepage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/create" element={<Create />} />
              <Route path="/about" element={<About />} />
              <Route path="/travels/:id" element={<TravelDetails />} />
            </Routes>
          </div>
        </div>
      </MyGlobalContext.Provider>
    </BrowserRouter>
  ); */
}

export default App;
