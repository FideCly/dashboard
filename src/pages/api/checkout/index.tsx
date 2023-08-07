import axios from 'axios';

export default async (req, res) => {
  if (req.method !== 'PUT') {
    return res.status(405).json({ message: 'Method not allowed' });
  } else {
    // get body from request
    const body = req.body;
    try {
      const response = await axios.put(
        process.env.NEXT_PUBLIC_API_URL + 'checkout',
        body,
        {
          headers: {
            Authorization: `Bearer ${req.cookies.token}`,
          },
        },
      );
      return res.status(response.status).json(response.data);
    } catch (error) {
      return res.status(error.response.status).json(error.response.data);
    }
  }
};
