import {
  IPromotions,
  IPromotionCreatePayload,
  IPromotionUpdatePayload,
} from '@/Models/Promotions';
import axios from 'axios';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    // get the id from the query
    const { id } = req.query;
    const response = await axios.get<IPromotions>(
      process.env.NEXT_PUBLIC_API_URL + `shop/${id}/promotion`,
      {
        headers: {
          Authorization: `Bearer ${req.cookies.token}`,
        },
      },
    );
    res.status(response.status).json(response.data);
  } else if (req.method === 'POST') {
    // get the id from the query
    const promotion = req.body;
    const response = await axios.post<IPromotionCreatePayload>(
      process.env.NEXT_PUBLIC_API_URL + `promotion`,
      promotion,
      {
        headers: {
          Authorization: `Bearer ${req.cookies.token}`,
        },
      },
    );
    res.status(response.status).json(response.data ? response.data : null);
  } else if (req.method === 'PUT') {
    // get the id from the query
    const { id } = req.query;
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
    // get the id from the query
    const { id } = req.query;
    const response = await axios.delete<IPromotions>(
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
