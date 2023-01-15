import axios from "axios";

export default axios.create({
    // import base url from config file
  baseURL: process.env.VITE_API_URL,
  headers: {
    "Content-type": "application/json"
  }
});