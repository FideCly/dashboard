import type { ICampaignCreatePayload } from '../../../Models/Campaign';
import axios from 'axios';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const campaign: ICampaignCreatePayload = req.body;
    try {
      const response = await axios.post<ICampaignCreatePayload>(
        process.env.NEXT_PUBLIC_API_URL + `campaign/send`,
        campaign,
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
