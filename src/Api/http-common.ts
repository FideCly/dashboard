import axios from 'axios'

export default axios.create({
  // import base url from config file
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
  headers: {
    'Content-type': 'application/json',
  }
})
