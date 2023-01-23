import axios from "axios";

export default axios.create({
    // import base url from config file
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-type": "application/json",
    "Access-Control-Allow-Origin": "*"
    
  }
});
