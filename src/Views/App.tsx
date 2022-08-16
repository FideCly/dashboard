import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Navbar from "../Components/html/Navbar";
import Footer from "../Components/html/Footer";
import Body from "../Components/html/Body";
function App() {
  return (
    <Router>
      <Navbar />
      <div className="">
        <Body />
      </div>
      <Footer />
    </Router>
  );
}
export default App;
