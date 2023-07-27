import axios from 'axios';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const response = await axios.get(
      process.env.NEXT_PUBLIC_API_URL +
        `analytics/clients-count?start_date=${req.query.start_date}&end_date=${req.query.end_date}`,
      {
        headers: {
          Authorization: `Bearer ${req.cookies.token}`,
        },
      },
    );
    res.status(response.status).json(response.data);
  }
}
