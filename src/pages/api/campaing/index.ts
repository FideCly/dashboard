import { type AxiosResponse } from 'axios';
import { httpCommon } from '../http-common';
import type {
    ICampaign,
    ICampaignCreatePayload,
    ICampaignUpdatePayload,
  } from '../../../Models/Campaign';

  export default async function handler(req, res) {
    if (req.method === 'GET') {
        // get the id from the query
        const { id } = req.query;
        const response = await httpCommon.get<ICampaign>(`/campaign/${id}`);
        res.status(response.status).json(response.data);
    } else if(req.method === 'POST') {
        // get the id from the query
        const { id } = req.query;
        const campaign = req.body;
        const response = await httpCommon.post<ICampaignUpdatePayload>(
            `/campaign/${id}`,
            campaign,
        );
        res.status(response.status).json(response.data? response.data : null);
     
    }
  }
