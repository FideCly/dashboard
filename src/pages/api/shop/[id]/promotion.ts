import {
  IPromotion,
  IPromotionCreatePayload,
  IPromotionUpdatePayload,
} from '@/Models/Promotions';
import axios from 'axios';

export default async function handler(req, res): Promise<IPromotion[]> {
  if (req.method === 'GET') {
    // get the id from the query
    const id = req.query.id;
    const response = await axios.get<IPromotion>(
      process.env.NEXT_PUBLIC_API_URL + `shop/${id}/promotions`,
      {
        headers: {
          Authorization: `Bearer ${req.cookies.token}`,
        },
      },
    );
    return res.status(response.status).json(response.data);
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
    return res
      .status(response.status)
      .json(response.data ? response.data : null);
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
    return res
      .status(response.status)
      .json(response.data ? response.data : null);
  } else if (req.method === 'DELETE') {
    // get the id from the query
    const { id } = req.query;
    const response = await axios.delete<IPromotion>(
      process.env.NEXT_PUBLIC_API_URL + `promotion/${id}`,
      {
        headers: {
          Authorization: `Bearer ${req.cookies.token}`,
        },
      },
    );
    return res.status(response.status).json(response.data);
  }
}
