import axios from 'axios'

export default axios.create({
  // import base url from config file
  baseURL: process.env.API_URL,
  headers: {
    'Content-type': 'application/json',
    'Access-Control-Allow-Origin': '*'

  }
})
