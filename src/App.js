import { Route, Routes } from "react-router-dom";
import StartPage from "./pages/StartPage";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Layout from "./components/Layout";
import RequiredAuth from "./components/RequireAuth";
import ChatRoom from "./pages/ChatRoom";
import AdminHomePage from "./pages/AdminPortal/AdminHomePage"
import AdminUsersPage from "./pages/AdminPortal/AdminUsersPage";

function App() {

  return (
    <Routes>

      <Route path="/" element={<Layout />}>
        {/* public routes */}
        <Route path="/" element={<StartPage/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register />} />
        <Route path="/unauthorized" element={<p>Unauthorized</p>}/>


        <Route element={<RequiredAuth allowedRole="user"/>}>
          <Route path="/home" element={<HomePage/>}/>
          <Route path="/chats" element={<ChatRoom/>}/>
          <Route path="/profile" element={<p>profile</p>}/>
        </Route>

        <Route element={<RequiredAuth allowedRole="admin"/>}>
          <Route path="/admin-dashboard" element={<AdminHomePage/>}/>
        </Route>

      </Route>
    </Routes>
  );
}

export default App;
