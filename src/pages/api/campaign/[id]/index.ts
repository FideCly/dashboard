import type { ICampaignUpdatePayload } from '../../../../Models/Campaign';

export default async function handler(req, res) {
  if (req.method === 'PUT') {
    const campaign = req.body as ICampaignUpdatePayload;
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
  } else if (req.method === 'DELETE') {
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
  } else if (req.method === 'GET') {
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
  }
}
