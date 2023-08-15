import axios from 'axios';
import { IUserAuthPayload } from '../../../models/User';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const user = req.body;
    try {
      const response = await axios.post<IUserAuthPayload>(
        process.env.NEXT_PUBLIC_API_URL + `auth/register`,
        user,
      );
      res.status(response.status).json(response.data);
    } catch (error) {
      res.status(error.response.status).send(error.response.data);
    }
  }
}
