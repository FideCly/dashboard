import axios from 'axios';
import { IAnalytics } from '../../../../Models/Analytics';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const response = await axios.get<IAnalytics[]>(
      process.env.NEXT_PUBLIC_API_URL +
        `analytics/affluence?start_date=${req.query.start_date}&end_date=${req.query.end_date}`,
      {
        headers: {
          Authorization: `Bearer ${req.cookies.token}`,
        },
      },
    );
    // if status >= 400 it will throw an error and will be catched by the error handler middleware else it will return the data
    if (response.status >= 400) {
      console.log(response);
      throw new Error('Bad response from server');
    }
    return res.status(200).json(response.data);
  }
}
