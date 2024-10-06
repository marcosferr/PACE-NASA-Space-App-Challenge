// src/App.tsx
import { StrictMode } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import MainApp from "./components/MainApp";
import Layout from "./components/Layout";
import "./index.css";

const App = () => (
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<LandingPage />} />
          <Route path="app" element={<MainApp />} />
        </Route>
      </Routes>
    </Router>
  </StrictMode>
);

export default App;
