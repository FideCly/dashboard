import { type AxiosResponse } from 'axios';
import { httpCommon } from '../http-common';
import type {
  ICampaignUpdatePayload,
} from '../../../Models/Campaign';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        // get the id from the query
        const { id } = req.query;
        const campaign = req.body;
        const response = await httpCommon.post<ICampaignUpdatePayload>(
            `/campaign/${id}`,
            campaign,
        );
        res.status(response.status).json(response.data);
    } else if(req.method === 'PUT') {
        // get the id from the query
        const { id } = req.query;
        const campaign = req.body;
        const response = await httpCommon.put<ICampaignUpdatePayload>(
            `/campaign/${id}`,
            campaign,
        );
        res.status(response.status).json(response.data? response.data : null);
     
    } else if(req.method === 'DELETE') {
        // get the id from the query
        const { id } = req.query;
        const response = await httpCommon.delete<ICampaignUpdatePayload>(
            `/campaign/${id}`,
        );
        res.status(response.status).json(response.data? response.data : null);
     
    }
  }
