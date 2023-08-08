import axios from 'axios';
import type {
  IPromotion,
  IPromotionUpdatePayload,
} from '../../../Models/Promotions';

export default async function handler(req, res) {
  if (req.method === 'PUT') {
    const id = req.query.id;
    const promotion = req.body;
    try {
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
    } catch (error) {
      res.status(error.response.status).send(error.response.data);
    }
  } else if (req.method === 'DELETE') {
    const { id } = req.query;
    try {
      const response = await axios.delete<IPromotionUpdatePayload>(
        process.env.NEXT_PUBLIC_API_URL + `promotion/${id}`,
        {
          headers: {
            Authorization: `Bearer ${req.cookies.token}`,
          },
        },
      );

      res.status(response.status).json(response.data ? response.data : null);
    } catch (error) {
      res.status(error.response.status).send(error.response.data);
    }
  } else if (req.method === 'GET') {
    const id = req.query.id;
    try {
      const response = await axios.get<IPromotion>(
        process.env.NEXT_PUBLIC_API_URL + `promotion/${id}`,
        {
          headers: {
            Authorization: `Bearer ${req.cookies.token}`,
          },
        },
      );
      res.status(response.status).json(response.data);
    } catch (error) {
      res.status(error.response.status).send(error.response.data);
    }
  }
}
