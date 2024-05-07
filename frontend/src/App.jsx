import {
  BrowserRouter,
  Routes,
  Route,
  Outlet,
  Navigate,
  useLocation,
} from "react-router-dom";
import Home from "./pages/Home";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import ModalContainer from "./components/ModalContainer";
import useModalStore from "./store/modal";
import Login from "./pages/Login";

import { isAuthenticated } from "./utils/auth";
import Main from "./pages/Main";

function RequireAuthRoutes() {
  const location = useLocation();
  const loggedIn = isAuthenticated();

  if (!loggedIn)
    return <Navigate to="/main" replace state={{ from: location }} />;

  return <Outlet />;
}

function App() {
  const { isOpen, title, children } = useModalStore();

  return (
    <BrowserRouter>
      <Header />
      <main className="flex h-full w-full flex-row">
        <Sidebar />
        <div className="h-full w-full overflow-hidden">
          <Routes>
            <Route path="/login/google" element={<Login />} />
            <Route path="/main" element={<Main />} />
            <Route element={<RequireAuthRoutes />}>
              <Route path="/" element={<Home />} />
            </Route>
          </Routes>
        </div>
      </main>
      {isOpen && <ModalContainer title={title}>{children}</ModalContainer>}
    </BrowserRouter>
  );
}

export default App;
