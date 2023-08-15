import axios from 'axios';
import type { ICampaignUpdatePayload } from '../../../models/Campaign';

export default async function handler(req, res) {
  if (req.method === 'PUT') {
    const id = req.query.id;
    const campaign = req.body as ICampaignUpdatePayload;
    try {
      const response = await axios.put<ICampaignUpdatePayload>(
        process.env.NEXT_PUBLIC_API_URL + `campaign/${id}`,
        campaign,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${req.cookies.token}`,
          },
        },
      );
      res.status(response.status).json(response.data);
    } catch (error) {
      res.status(error.response.status).send(error.response.data);
    }
  } else if (req.method === 'DELETE') {
    try {
      const response = await axios.delete(
        process.env.NEXT_PUBLIC_API_URL + `campaign/${req.query.id}`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${req.cookies.token}`,
          },
        },
      );
      res.status(response.status).json(response.data ?? null);
    } catch (error) {
      res.status(error.response.status).send(error.response.data);
    }
  } else if (req.method === 'GET') {
    try {
      const response = await axios.get(
        process.env.NEXT_PUBLIC_API_URL + `campaign/${req.query.id}`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${req.cookies.token}`,
          },
        },
      );
      res.status(response.status).json(response.data ?? null);
    } catch (error) {
      res.status(error.response.status).send(error.response.data);
    }
  }
}
