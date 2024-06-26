import "./App.css";
import Navbar from "./Components/Navbar/Navbar";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/homepage/Home";
// import Coin from "./pages/coinpage/Coin";
import Cointwo from "./Components/cointwo/Cointwo";

function App() {
  return (
    <div className="app">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cointwo/:coinId" element={<Cointwo />} />
      </Routes>
    </div>
  );
}

export default App;
