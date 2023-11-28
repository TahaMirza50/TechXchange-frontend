import { BrowserRouter, Route, Routes } from "react-router-dom";
import StartPage from "./pages/StartPage";
import { useState } from "react";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";

function App() {
  const [isLoggedIn,setIsLoggedIn] = useState(false);


  return (
    <BrowserRouter>
    <Routes>
       <Route path="/" element={isLoggedIn? <HomePage/>:<StartPage/>}/>
       <Route path="/login" element={<Login/>}/>
       <Route path="/register"/>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
