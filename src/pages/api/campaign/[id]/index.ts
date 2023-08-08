import type { ICampaignUpdatePayload } from '../../../../Models/Campaign';

export default async function handler(req, res) {
  if (req.method === 'PUT') {
    const campaign = req.body as ICampaignUpdatePayload;
    try {
      const response = await fetch(
        process.env.NEXT_PUBLIC_API_URL + `campaign/${req.query.id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${req.cookies.token}`,
          },
          body: JSON.stringify(campaign),
        },
      );
      res.status(response.status).json(response);
    } catch (error) {
      res.status(error.response.status).send(error.response.data);
    }
  } else if (req.method === 'DELETE') {
    try {
      const response = await fetch(
        process.env.NEXT_PUBLIC_API_URL + `campaign/${req.query.id}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${req.cookies.token}`,
          },
        },
      );
      res.status(response.status).json(response);
    } catch (error) {
      res.status(error.response.status).send(error.response.data);
    }
  } else if (req.method === 'GET') {
    try {
      const response = await fetch(
        process.env.NEXT_PUBLIC_API_URL + `campaign/${req.query.id}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${req.cookies.token}`,
          },
        },
      );
      res.status(response.status).json(response);
    } catch (error) {
      res.status(error.response.status).send(error.response.data);
    }
  }
}
