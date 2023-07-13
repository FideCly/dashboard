import axios from 'axios';
import { IUser } from '../../../Models/User';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const user = req.body;
    const response = await axios.post<IUser>(
      process.env.NEXT_PUBLIC_API_URL + `auth/register`,
      user,
    );
    res
      .status(response.status)
      .json(response.data ? response.data : null)
      .catch((err) => {
        console.log(err);
      });
  }
}
