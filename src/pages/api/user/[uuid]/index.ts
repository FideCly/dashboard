import { IUser } from '@/models/User';
import axios from 'axios';

export default async function handler(req, res): Promise<IUser> {
  if (req.method === 'GET') {
    const uuid = req.query.uuid;
    try {
      const response = await axios.get<IUser>(
        process.env.NEXT_PUBLIC_API_URL + `user/${uuid}`,
        {
          headers: {
            Authorization: `Bearer ${req.cookies.token}`,
            'Content-Type': 'application/json',
          },
        },
      );

      return res.status(response.status).json(response.data);
    } catch (error) {
      return res.status(error.response.status).send(error.response.data);
    }
  }
}
