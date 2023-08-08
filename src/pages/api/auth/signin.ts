import { jwttoken } from '@/Models/User';
import axios from 'axios';

export default async function handler(req, res) {
  if (req.method === 'PUT') {
    // get the id from the query
    const user = req.body;
    try {
      const response = await axios.put<jwttoken>(
        process.env.NEXT_PUBLIC_API_URL + `auth/login`,
        user,
      );
      res.status(response.status).json(response.data ? response.data : null);
    } catch (error) {
      res.status(error.response.status).send(error.response.data);
    }
  }
}
