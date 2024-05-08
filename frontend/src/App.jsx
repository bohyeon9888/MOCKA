import { BrowserRouter, Routes, Route } from "react-router-dom";
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
      <main className="flex h-full w-full flex-row">
        <Sidebar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/update-history" element={<UpdateHistory />} />
        </Routes>
      </main>
      {isOpen && <ModalContainer title={title}>{children}</ModalContainer>}
    </BrowserRouter>
  );
}

export default App;
