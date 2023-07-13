import axios from 'axios';
import Cookies from 'js-cookie';
import { IBalance } from '../../../Models/Balance';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    // get the id from the query
    const response = await axios.get<IBalance>(
      process.env.NEXT_PUBLIC_API_URL + `balance`,
      {
        headers: {
          Authorization: `Bearer ${Cookies.get('token')}`,
        },
      },
    );
    res
      .status(response.status)
      .json(response.data)
      .catch((err) => {
        console.log(err);
      });
  }
}
