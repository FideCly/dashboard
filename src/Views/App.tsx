import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Navbar from "../Components/html/Navbar";
import Footer from "../Components/html/Footer";
import Body from "../Components/html/Body";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";
import useWebSocket from "react-use-websocket";
const WebSocketURL = import.meta.env.REACT_APP_WEBSOCKET_URL;
function App() {
  const { sendJsonMessage, getWebSocket } = useWebSocket(WebSocketURL, {
    onOpen: () => console.log("WebSocket connection opened."),
    onClose: () => console.log("WebSocket connection closed."),
    shouldReconnect: (_closeEvent) => true,
    onMessage: (event: WebSocketEventMap["message"]) => toast(event.data),
  });

  return (
    <Router>
      <Navbar />
      <div className="">
        <Body />
      </div>
      <Footer />
      <ToastContainer />
    </Router>
  );
}
export default App;
