import axios from 'axios';

export default async (req, res) => {
  if (req.method !== 'PUT') {
    return res.status(405).json({ message: 'Method not allowed' });
  } else {
    // get body from request
    const body = req.body;
    const response = await axios.put(
      process.env.NEXT_PUBLIC_API_URL + 'checkout',
      body,
      {
        headers: {
          Authorization: `Bearer ${req.cookies.token}`,
        },
      },
    );
    if (response.status >= 400) {
      throw new Error('Bad response from server');
    }
    return res.status(response.status).json(response.data);
  }
};
