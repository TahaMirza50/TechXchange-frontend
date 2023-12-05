import { BrowserRouter, Route, Routes } from "react-router-dom";
import StartPage from "./pages/StartPage";
import { useState } from "react";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import AdminHomePage from "./pages/AdminPortal/AdminHomePage"
import AdminUsersPage from "./pages/AdminPortal/AdminUsersPage";

function App() {
  const [isLoggedIn,setIsLoggedIn] = useState(false);


  return (
    <BrowserRouter>
    <Routes>
       <Route path="*" element={isLoggedIn? <HomePage/>:<AdminHomePage/>}/>
       <Route path="/login" element={<Login/>}/>
       <Route path="/register"/>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
