import "./App.css"
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom"
import Homepage from "./Page/HomePage"
import About from "./Page/About"
import Navbar from "./Components/Navbar"
import Create from "./Page/Create"
import TravelDetails from "./Page/TravelDetails"
import Login from "./Page/Login"
import { LoginContextProvider } from "./Components/UserContext"
import Logincheck from "./Components/Logincheck"

function App() {
  return (
    <LoginContextProvider>
      <BrowserRouter>
        <div className="app">
          <Navbar />
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="*" element={<Logincheck />} />
          </Routes>
        </div>
      </BrowserRouter>
    </LoginContextProvider>
  )
}

export default App
