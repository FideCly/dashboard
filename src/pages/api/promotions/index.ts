import axios from 'axios';
import type {
  IPromotions,
  IPromotionUpdatePayload,
} from '../../../Models/Promotions';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    // get the id from the query
    // get token from cookies
    const response = await axios.get<IPromotions>(
      process.env.NEXT_PUBLIC_API_URL + `promotion`,
      {
        headers: {
          Authorization: `Bearer ${req.cookies.token}`,
        },
      },
    );
    res
      .status(response.status)
      .json(response.data ? response.data : null)
      .end();
  } else if (req.method === 'POST') {
    // get the id from the query
    const promotion = req.body;
    const response = await axios.post<IPromotionUpdatePayload>(
      process.env.NEXT_PUBLIC_API_URL + `promotion`,
      promotion,
      {
        headers: {
          Authorization: `Bearer ${req.cookies.token}`,
        },
      },
    );
    res.status(response.status).json(response.data ? response.data : null);
  }
}
