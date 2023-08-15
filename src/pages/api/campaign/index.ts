import type { ICampaignCreatePayload } from '../../../models/Campaign';
import axios from 'axios';

export default async function handler(
  req,
  res,
): Promise<ICampaignCreatePayload> {
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
      return res.status(response.status).json(response.data);
    } catch (error) {
      return res.status(error.response.status).send(error.response.data);
    }
  }
}
