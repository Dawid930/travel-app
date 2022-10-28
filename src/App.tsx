import "./App.css";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Homepage from "./Page/HomePage";
import About from "./Page/About";
import Navbar from "./Components/Navbar";
import Create from "./Page/Create";
import TravelDetails from "./Page/TravelDetails";
import Login from "./Page/Login";
import { LoginContextProvider } from "./Components/UserContext";

function App() {

  return (
    <LoginContextProvider>
      <BrowserRouter>
        <div className="app">
          <Navbar />
          <div className="content">
            <Routes>
              <Route path="/" element={<Navigate replace to="/travels/1"/>} />
              <Route path="/travels/:page" element={<Homepage />} />
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
}

export default App;
