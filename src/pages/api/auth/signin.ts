import { jwttoken } from '@/Models/User';
import axios from 'axios';

export default async function handler(req, res) {
  if (req.method === 'PUT') {
    // get the id from the query
    const user = req.body;
    const response = await axios.put<jwttoken>(
      process.env.NEXT_PUBLIC_API_URL + `auth/login`,
      user,
    );
    if (response.data) {
      res.status(response.status).json(response.data ? response.data : null);
    } else {
      throw new Error('Error');
    }
  }
}
