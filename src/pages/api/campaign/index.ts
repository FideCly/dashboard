import { error } from 'console';
import type { ICampaignCreatePayload } from '../../../Models/Campaign';
import axios from 'axios';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const campaign = req.body;
    try {
      const response = await axios.post<ICampaignCreatePayload>(
        process.env.NEXT_PUBLIC_API_URL + `campaign`,
        campaign,
        {
          headers: {
            Authorization: `Bearer ${req.cookies.token}`,
          },
        },
      );
      res.status(response.status).json(response ? response.data : error);
    } catch (error) {
      res.status(500).json(error);
    }
  }
}
