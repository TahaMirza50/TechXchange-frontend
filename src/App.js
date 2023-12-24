import { Route, Routes } from "react-router-dom";
import StartPage from "./pages/StartPage";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Layout from "./components/Layout";
import RequiredAuth from "./components/RequireAuth";
import ChatRoom from "./pages/ChatRoom";
import AdminCategoriesPage from "./pages/AdminPortal/AdminCategoriesPage";
import AdminAdvertisementsPage from "./pages/AdminPortal/AdminAdvertisementsPage";
import AdminUsersPage from "./pages/AdminPortal/AdminUsersPage";
import AdminReportsPage from "./pages/AdminPortal/AdminReportsPage";

import ProfilePage from "./pages/ProfilePage";
import AdminDashboard from "./pages/AdminDashboard";
import Unauthorized from "./pages/Unauthorized";
import CreateAd from "./pages/CreateAd";


function App() {

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* public routes */}
        <Route path="/" element={<StartPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/unauthorized" element={<Unauthorized/>} />

        {/* user routes */}
        <Route element={<RequiredAuth allowedRole="user" />}>
          <Route path="/home" element={<HomePage />} />
          <Route path="/chats" element={<ChatRoom />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/home/create-ad" element={<CreateAd/>}/>
        </Route>


        {/* admin routes */}
        <Route element={<RequiredAuth allowedRole="admin" />}>
          <Route
            path="/admin-dashboard"
            element={<AdminDashboard />}
          >
            <Route index element={<AdminUsersPage />} />
            <Route path="categories" element={<AdminCategoriesPage />} />
            <Route path="advertisements" element={<AdminAdvertisementsPage />} />
            <Route path="reports" element={<AdminReportsPage />} />
          </Route>
        </Route>
     </Route>
    </Routes>

  );
}

export default App;
