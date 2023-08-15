import axios from 'axios';
import { IAnalytics } from '../../../../models/Analytics';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const response = await axios.get<IAnalytics[]>(
        process.env.NEXT_PUBLIC_API_URL +
          `analytics/affluence?start_date=${req.query.start_date}&end_date=${req.query.end_date}`,
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
