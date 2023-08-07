import axios from 'axios';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const id = req.query.id;
    try {
      const response = await axios.get(
        process.env.NEXT_PUBLIC_API_URL + `shop/${id}`,
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
  } else if (req.method === 'PUT') {
    const payload = req.body;
    const id = req.query.id;
    try {
      const response = await axios.put(
        process.env.NEXT_PUBLIC_API_URL + `shop/${id}`,
        payload,
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
  } else if (req.method === 'DELETE') {
    const id = req.query.id;
    try {
      const response = await axios.delete(
        process.env.NEXT_PUBLIC_API_URL + `shop/${id}`,
        {
          headers: {
            Authorization: `Bearer ${req.cookies.token}`,
          },
        },
      );

      res.status(response.status).json(response.data ? response.data : null);
    } catch (error) {
      res.status(error.response.status).send(error.response.data);
    }
  }
}
