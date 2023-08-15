import { ICampaign } from '@/models/Campaign';
import axios from 'axios';

export default async function handler(req, res): Promise<ICampaign[]> {
  if (req.method === 'GET') {
    // get the id from the query
    const id = req.query.id;
    try {
      const response = await axios.get<ICampaign>(
        process.env.NEXT_PUBLIC_API_URL + `shop/${id}/campaigns`,
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
