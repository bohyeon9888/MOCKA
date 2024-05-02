import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <main className="flex h-full w-full flex-row">
        <Sidebar />
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
