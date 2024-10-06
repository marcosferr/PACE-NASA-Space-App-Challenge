// src/App.tsx
import React from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import MainApp from "./components/MainApp";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Root path renders Landing Page */}
        <Route path="/" element={<LandingPage />} />

        {/* Same URL or path can render Main App upon some condition */}
        <Route path="/app" element={<MainApp />} />
      </Routes>
    </Router>
  );
};

export default App;
