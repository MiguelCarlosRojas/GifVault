import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Buscar from "./components/routes/Buscar";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Buscar />} />
      </Routes>
    </Router>
  );
};

export default App;
