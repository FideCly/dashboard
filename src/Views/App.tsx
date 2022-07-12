import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import Body from "../Components/Body";

function App() {
  return (
    <div className="app">
      <Router>
        <Navbar />
        <Body />
        <Footer />
      </Router>
    </div>
  );
}

export default App;
