import axios from 'axios';
import type {
  IPromotions,
  IPromotionUpdatePayload,
} from '../../../Models/Promotions';

export default async function handler(req, res) {
  if (req.method === 'PUT') {
    const id = req.query.id;
    const promotion = req.body;
    const response = await axios.put<IPromotionUpdatePayload>(
      process.env.NEXT_PUBLIC_API_URL + `promotion/${id}`,
      promotion,
      {
        headers: {
          Authorization: `Bearer ${req.cookies.token}`,
        },
      },
    );
    res.status(response.status).json(response.data ? response.data : null);
  } else if (req.method === 'DELETE') {
    const { id } = req.query;
    const response = await axios.delete<IPromotionUpdatePayload>(
      process.env.NEXT_PUBLIC_API_URL + `promotion/${id}`,
      {
        headers: {
          Authorization: `Bearer ${req.cookies.token}`,
        },
      },
    );

    res.status(response.status).json(response.data ? response.data : null);
  } else if (req.method === 'GET') {
    const id = req.query.id;
    const response = await axios.get<IPromotions>(
      process.env.NEXT_PUBLIC_API_URL + `promotion/${id}`,
      {
        headers: {
          Authorization: `Bearer ${req.cookies.token}`,
        },
      },
    );
    res.status(response.status).json(response.data);
  }
}
