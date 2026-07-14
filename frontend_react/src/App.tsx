import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Trending from "./pages/Trending";
import Documentation from "./pages/Documentation";

import "./index.css";

function App() {
  return (
    
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/trending" element={<Trending />} />
        <Route path="/documentation" element={<Documentation />} />
      </Routes>
    
  );
}

export default App;