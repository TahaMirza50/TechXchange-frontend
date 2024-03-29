import { Route, Routes } from "react-router-dom";
import StartPage from "./pages/StartPage";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import Register from "./pages/Register";
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
import AdvertPage from "./pages/AdvertPage";

import PersistentLogin from "./components/PersistentLogin";
import PublicRouteLogin from "./components/PublicRouteLogin";

import MyAdverts from "./pages/MyAdverts";
import SearchResultsPage from "./pages/SearchResultsPage";
import WishlistPage from "./pages/WIshlistPage";



function App() {

  return (
    <Routes>
      {/* public routes */}
      <Route element={<PublicRouteLogin />}>
        <Route path="/" element={<StartPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>
      
      <Route path="/unauthorized" element={<Unauthorized />} />

      {/* user routes */}
      <Route element={<PersistentLogin />}>
        <Route element={<RequiredAuth allowedRole="user" />}>
          <Route path="/home" element={<HomePage />} />
          <Route path="/chats" element={<ChatRoom />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/home/create-ad" element={<CreateAd/>}/>
          <Route path="/advert/:id" element={<AdvertPage/>}/>
          <Route path="/my-adverts" element={<MyAdverts/>}/>
          <Route path="/my-wishlist" element={<WishlistPage/>}/>
          <Route path="/results" element={<SearchResultsPage/>}/>
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
