import axios from 'axios';
import { IShop, IShopCreatePayload, IShopUpdatePayload } from '../../../Models/Shop';

export default async function handler(req, res) {
    if (req.method === 'GET') {
        // get the id from the query
        const { id } = req.query;
        const response = await axios.get<IShop>(
        process.env.NEXT_PUBLIC_API_URL + `shop/${id}`,
        {
            headers: {
            Authorization: `Bearer ${req.cookies.token}`,
            },
        }
        );
        res.status(response.status).json(response.data);
    } else if (req.method === 'POST') {
        // get the id from the query
        const shop = req.body;
        const response = await axios.post<IShopCreatePayload>(
        process.env.NEXT_PUBLIC_API_URL + `shop`,
        shop,
        {
            headers: {
            Authorization: `Bearer ${req.cookies.token}`,
            },
        }
        );
        res.status(response.status).json(response.data ? response.data : null);
    } else if (req.method === 'PUT') {
        // get the id from the query
        const { id } = req.query;
        const shop = req.body;
        const response = await axios.put<IShopUpdatePayload>(
        process.env.NEXT_PUBLIC_API_URL + `shop/${id}`,
        shop,
        {
            headers: {
            Authorization: `Bearer ${req.cookies.token}`,
            },
        }
        );
        res.status(response.status).json(response.data ? response.data : null);
    } else if (req.method === 'DELETE') {
        // get the id from the query
        const { id } = req.query;
        const response = await axios.delete<IShop>(
        process.env.NEXT_PUBLIC_API_URL + `shop/${id}`,
        {
            headers: {
            Authorization: `Bearer ${req.cookies.token}`,
            },
        }
        );
        res.status(response.status).json(response.data);
    }
}
