import axios from 'axios';
import {
  IShop,
  IShopCreatePayload,
  IShopUpdatePayload,
} from '../../../models/Shop';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const response = await axios.get<IShop[]>(
        process.env.NEXT_PUBLIC_API_URL + `shop`,
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
  } else if (req.method === 'POST') {
    const payload: IShopCreatePayload = req.body;
    try {
      const response = await axios.post<IShop>(
        process.env.NEXT_PUBLIC_API_URL + `shop`,
        payload,
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
  } else if (req.method === 'PUT') {
    const payload: IShopUpdatePayload = req.body;
    try {
      const response = await axios.put<IShop>(
        process.env.NEXT_PUBLIC_API_URL + `shop`,
        payload,
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
