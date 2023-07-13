import axios from 'axios';
import { IUser } from '../../../Models/User';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const uuid = req.query.uuid;
    const response = await axios.get<IUser>(
      process.env.NEXT_PUBLIC_API_URL + `user/${uuid}`,
      {
        headers: {
          Authorization: `Bearer ${req.cookies.token}`,
        },
      },
    );
    res.status(response.status).json(response.data);
  }
}

export const config = {
  api: {
    externalResolver: true,
  },
};
