import { Route, Routes } from "react-router-dom";
import StartPage from "./pages/StartPage";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminDashboard from "./pages/AdminDashboard";
import Layout from "./components/Layout";
import RequiredAuth from "./components/RequireAuth";

import AdminCategoriesPage from "./pages/AdminPortal/AdminCategoriesPage";
import AdminAdvertisementsPage from "./pages/AdminPortal/AdminAdvertisementsPage";
import AdminUsersPage from "./pages/AdminPortal/AdminUsersPage";
import AdminReportsPage from "./pages/AdminPortal/AdminReportsPage";

function App() {

  // useEffect(() => {
  //   handleLogin();
  // }, []);

  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  // const [isAdmin, setIsAdmin] = useState(false);

  // const Admin = () => {
  //   if (isAdmin) {
  //     return <AdminDashboard />  //add admin component
  //   } else {
  //     return <HomePage />
  //   }
  // }

  // const handleLogin = () => {
  //   console.log("Checking tokens...")

  //   const accessToken = localStorage.getItem("accessToken");
  //   const refreshToken = localStorage.getItem("refreshToken");

  //   if (accessToken && refreshToken) {
  //     console.log("hello1" + accessToken);
  //     try {
  //       const decodedAccessToken = jwtDecode(accessToken);
  //       if (decodedAccessToken.role === "admin") {
  //         setIsAdmin(true);
  //       }
  //       setIsLoggedIn(true);
  //       api.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;

  //       // if (decodedAccessToken.exp * 1000 > Date.now()) {
  //       //   if (decodedAccessToken.role === "admin") {
  //       //     setIsAdmin(true);
  //       //   }
  //       //   setIsLoggedIn(true);
  //       //   api.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
  //       // } else {
  //       //   const decodedRefreshToken = jwtDecode(refreshToken);

  //       //   if (decodedRefreshToken.exp * 1000 > Date.now()) {
  //       //     setIsLoggedIn(true);
  //       //     api.defaults.headers.common['Authorization'] = `Bearer ${refreshToken}`;
  //       //   } else {
  //       //     setIsLoggedIn(false);
  //       //   }

  //       // }

  //       return;
  //     } catch (error) {
  //       console.error("Error decoding tokens:", error);
  //     }
  //   }
  //   setIsAdmin(false);
  //   setIsLoggedIn(false);
  // }
  // console.log()

  return (
    <Routes>
  <Route path="/" element={<Layout />}>
    {/* public routes */}
    <Route path="/" element={<StartPage />} />
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
    <Route path="/unauthorized" element={<p>Unauthorized</p>} />

    <Route element={<RequiredAuth allowedRole="user" />}>
      <Route path="/home" element={<HomePage />} />
      <Route path="/profile" element={<p>profile</p>} />
    </Route>

    <Route element={<RequiredAuth allowedRole="admin" />}>
      <Route
        path="/admin-dashboard"
        element={<AdminDashboard />}
      >
        <Route index element={<AdminUsersPage />} />
        <Route path="categories" element={<AdminCategoriesPage />} />
        <Route path="advertisements" element={<AdminAdvertisementsPage />} />
        <Route path="reports" element={<AdminReportsPage/>} />
      </Route>
    </Route>
  </Route>
</Routes>

  );
}

export default App;
