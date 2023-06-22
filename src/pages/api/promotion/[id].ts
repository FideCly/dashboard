import { httpCommon } from '../http-common';
import type {
    IPromotions,
    IPromotionUpdatePayload,
    } from '../../../Models/Promotions';

export default async function handler(req, res) {
    if (req.method === 'PUT'){
        const { id } = req.query;
        const promotion = req.body;
        const response = await httpCommon.put<IPromotionUpdatePayload>(
            `/promotions/${id}`,
            promotion,
        );
        console.log("🚀 ~ file: [id].ts:15 ~ handler ~ response:", response)
        
        res.status(response.data.statusCode).json(response.data? response.data : null);
    } else if (req.method === 'DELETE'){
        const { id } = req.query;
        const response = await httpCommon.delete<IPromotionUpdatePayload>(
            `/promotions/${id}`,
        );
        res.status(response.status).json(response.data? response.data : null);
    } else if (req.method === 'GET'){
        const { id } = req.query;
        const response = await httpCommon.get<IPromotions>(`/promotions/${id}`);
        res.status(response.status).json(response.data);
    }

}

