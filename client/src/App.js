import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./components/Header";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Homepage from "./components/Homepage";
import Dashboard from "./components/Dashboard";
import Bugs from "./components/Bugs";
import SingleBug from "./components/SingleBug";
import CreateBug from "./components/CreateBug";

function App() {
  return (
    <div className="App">
      <Header />

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/bugs" element={<Bugs />} />
          <Route path="/bug/:bugId" element={<SingleBug />} />
          <Route path="/bug/create" element={<CreateBug />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
