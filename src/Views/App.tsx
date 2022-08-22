import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Navbar from "../Components/html/Navbar";
import Footer from "../Components/html/Footer";
import Body from "../Components/html/Body";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer, ToastContentProps } from "react-toastify";
import useWebSocket from "react-use-websocket";
const WSS_FEED_URL = "ws://localhost:8080/ws";
function App() {
  const { sendJsonMessage, getWebSocket } = useWebSocket(WSS_FEED_URL, {
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
