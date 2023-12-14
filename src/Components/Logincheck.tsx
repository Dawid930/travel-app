import React, { useContext, useEffect } from "react"
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom"
import Navbar from "./Navbar"
import Homepage from "../Page/HomePage"
import About from "../Page/About"
import Login from "../Page/Login"
import Create from "../Page/Create"
import TravelDetails from "../Page/TravelDetails"
import { LoginContext } from "./UserContext"
import { LoginContextProvider } from "./UserContext"

const Logincheck = () => {
  const loginContext = useContext(LoginContext)
  /* 
  let userId = "";
  useEffect(() => {
    userId = loginContext.userContext.id;
  }, [userId]); */

  console.log(loginContext?.userContext?.id)

  return (
    <div className="content">
      {loginContext?.userContext?.id === (null || "" || undefined) ? (
        <Routes>
          <Route path="/" element={<Login />} />
        </Routes>
      ) : (
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/travels"
            element={<Navigate replace to="/travels/1" />}
          />
          <Route path="/travels/:page" element={<Homepage />} />
          <Route path="/create" element={<Create />} />
          <Route path="/about" element={<About />} />
          <Route path="/travel/:id" element={<TravelDetails />} />
        </Routes>
      )}
    </div>
  )
}

export default Logincheck
