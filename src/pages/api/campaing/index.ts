import type {
  ICampaign,
  ICampaignCreatePayload,
  ICampaignUpdatePayload,
} from '../../../Models/Campaign';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const campaign = req.body as ICampaignCreatePayload;
    const response = await fetch(
      process.env.NEXT_PUBLIC_API_URL + `campaigns`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${req.cookies.token}`,
        },
        body: JSON.stringify(campaign),
      },
    );
    res.status(response.status).json(response);
  }
}
