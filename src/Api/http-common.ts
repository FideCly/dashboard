import axios from "axios";
import Cookies from "js-cookie";

const authhttp = axios.create({
  // import base url from config file
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
  headers: {
    "Content-type": "application/json",
  },
});

const httpCommon = axios.create({
  // import base url from config file
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
  headers: {
    "Content-type": "application/json",
    Authorization: "Bearer " + Cookies.get("token"),
  },
});

export { authhttp, httpCommon };
