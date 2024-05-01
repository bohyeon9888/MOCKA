import {
  BrowserRouter,
  Routes,
  Route,
  Outlet,
  Navigate,
  useLocation,
} from "react-router-dom";
import Main from "./pages/Main";
import Home from "./pages/Home";
import Login from "./pages/Login";

import { isAuthenticated } from "./utils/auth";

function RequireAuthRoutes() {
  const location = useLocation();
  const loggedIn = isAuthenticated();

  if (!loggedIn)
    return <Navigate to="/main" replace state={{ from: location }} />;

  return <Outlet />;
}

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login/google" element={<Login />} />
        <Route path="/main" element={<Main />} />
        <Route element={<RequireAuthRoutes />}>
          <Route path="/" element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
