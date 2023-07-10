import axios from 'axios';
import { IBalanceUpdatePayload } from '../../../../Models/Balance';

export default async function handler(req, res) {
  if (req.method == 'GET') {
    const { id } = req.query;
    const response = await axios.get<IBalanceUpdatePayload>(
      process.env.NEXT_PUBLIC_API_URL + `balance/checkout/${id}`,
      {
        headers: {
          Authorization: `Bearer ${req.cookies.token}`,
        },
      },
    );
    res.status(response.status).json(response.data);
  }
}
