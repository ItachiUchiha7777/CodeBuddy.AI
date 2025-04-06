// App.js
import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomeScreen from "./pages/HomeScreen";
import ExplainMyCode from "./pages/ExplainMyCode";
import RoadmapBuilder from "./pages/RoadmapBuilder";
import Footer from "./components/Footer";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const App = () => {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />
      <div className="flex-grow-1">
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/explain" element={<ExplainMyCode />} />
          <Route path="/roadmap" element={<RoadmapBuilder />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
};

export default App;
