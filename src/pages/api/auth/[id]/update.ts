import { IUser, IUserUpdatePayload } from '@/Models/User';
import axios from 'axios';

export default async function handler(req, res): Promise<IUser> {
  if (req.method === 'PUT') {
    const id = req.query.id;
    const body = req.body;
    try {
      const response = await axios.put<IUserUpdatePayload>(
        process.env.NEXT_PUBLIC_API_URL + `user/${id}`,
        body,
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
  } else if (req.method === 'DELETE') {
    const id = req.query.id;
    try {
      const response = await axios.delete<IUser>(
        process.env.NEXT_PUBLIC_API_URL + `user/${id}`,
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
