import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import StartPage from "./pages/StartPage";
import { useEffect, useState } from "react";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Cookies from "universal-cookie";
import { jwtDecode } from "jwt-decode";
import AdminDashboard from "./pages/AdminDashboard";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const Admin = () => {
    if (isAdmin) {
      return <AdminDashboard />  //add admin component
    } else {
      return <HomePage />
    }
  }

  useEffect(() => {
    console.log("Checking tokens...")
    const cookies = new Cookies();
    const accessToken = cookies.get("accessToken");
    const refreshToken = cookies.get("refreshToken");

    console.log("Access Token:", accessToken);

    if (accessToken && refreshToken) {
      try {
        const decodedAccessToken = jwtDecode(accessToken);

        if (decodedAccessToken.exp * 1000 > Date.now()) {
          setIsLoggedIn(true);
        } else {
          const decodedRefreshToken = jwtDecode(refreshToken);

          if (decodedRefreshToken.exp * 1000 > Date.now()) {
            setIsLoggedIn(true);
          }

        }

        if (decodedAccessToken.role === "admin") {
          setIsAdmin(true);
        }

        return;
      } catch (error) {
        console.error("Error decoding tokens:", error);
      }
    }
    setIsAdmin(false);
    setIsLoggedIn(false);
  }, [])

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={isLoggedIn ? Admin() : <StartPage />} />
        <Route path="/login" element={isLoggedIn ? <Navigate to="/" /> : <Login />} />
        <Route path="/register" element={isLoggedIn ? <Navigate to="/" /> : <Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
