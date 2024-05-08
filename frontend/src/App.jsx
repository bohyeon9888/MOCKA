import {
  BrowserRouter,
  Routes,
  Route,
  Outlet,
  Navigate,
  useLocation,
} from "react-router-dom";
import Home from "./pages/Home";
// import Main from "./pages/Main";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import ModalContainer from "./components/ModalContainer";
import useModalStore from "./store/modal";
import UpdateHistory from "./pages/UpdateHistory";

function App() {
  const { isOpen, title, children } = useModalStore();

  return (
    <BrowserRouter>
      <Header />
      <main className="flex w-full grow flex-row">
        <Sidebar />
        <div className="h-full w-full overflow-hidden">
          <Routes>
            <Route path="/login/google" element={<Login />} />
            <Route path="/main" element={<Main />} />
            <Route element={<RequireAuthRoutes />}>
              <Route path="/" element={<Home />} />
              <Route path="/intializer" element={<Initializer />} />
              <Route path="/viewer" element={<Viewer />} />
              <Route path="/update-history" element={<UpdateHistory />} />
            </Route>
          </Routes>
        </div>
      </main>
      {isOpen && <ModalContainer title={title}>{children}</ModalContainer>}
    </BrowserRouter>
  );
}

export default App;
