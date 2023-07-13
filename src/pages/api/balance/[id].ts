import axios from 'axios';
import Cookies from 'js-cookie';
import {
  IBalance,
  IBalanceCreatePayload,
  IBalanceUpdatePayload,
} from '../../../Models/Balance';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    // get the id from the query
    const { id } = req.query;
    const response = await axios.get<IBalance>(
      process.env.NEXT_PUBLIC_API_URL + `balance/${id}`,
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
  } else if (req.method === 'POST') {
    // get the id from the query
    const { id } = req.query;
    const balance = req.body;
    const token = Cookies.get('token');
    const response = await axios.post<IBalanceCreatePayload>(
      process.env.NEXT_PUBLIC_API_URL + `balance/${id}`,
      balance,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    res
      .status(response.status)
      .json(response.data ? response.data : null)
      .catch((err) => {
        console.log(err);
      });
  } else if (req.method === 'PUT') {
    // get the id from the query
    const { id } = req.query;
    const balance = req.body;
    const token = Cookies.get('token');
    const response = await axios.put<IBalanceUpdatePayload>(
      process.env.NEXT_PUBLIC_API_URL + `balance/${id}`,
      balance,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    res
      .status(response.status)
      .json(response.data ? response.data : null)
      .catch((err) => {
        console.log(err);
      });
  }
}
