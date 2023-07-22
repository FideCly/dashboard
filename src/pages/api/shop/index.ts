import axios from 'axios';
import {
  IShop,
  IShopCreatePayload,
  IShopUpdatePayload,
} from '../../../Models/Shop';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const response = await axios.get<IShop[]>(
      process.env.NEXT_PUBLIC_API_URL + `shop`,
      {
        headers: {
          Authorization: `Bearer ${req.cookies.token}`,
        },
      },
    );
    res.status(response.status).json(response.data);
  }
  if (req.method === 'POST') {
    const payload: IShopCreatePayload = req.body;
    await axios
      .post<IShop>(process.env.NEXT_PUBLIC_API_URL + `shop`, payload, {
        headers: {
          Authorization: `Bearer ${req.cookies.token}`,
        },
      })
      .then((response) => {
        res.status(response.status).json(response.data);
      })
      .catch((error) => {
        res.status(error.response.status).json(error);
      });
  }
  if (req.method === 'PUT') {
    const payload: IShopUpdatePayload = req.body;
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
  }
}
