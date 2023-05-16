import { type AxiosResponse } from "axios";
import { httpCommon } from "../http-common";
import type {
  ICampaign,
  ICampaignCreatePayload,
  ICampaignUpdatePayload,
} from "../Models/Campaign";

/**
 * Récupère la liste des campaigns
 * @returns Retourne une promesse de type Campaign[]
 * @see Campaign
 * @see src/Types/Campaign.ts
 * @see src/Api/Models/Campaign.ts
 */
const getCampaigns = async (): Promise<AxiosResponse<ICampaign[], any>> => {
  return await httpCommon.get<ICampaign[]>("/campaign");
};

/**
 * Récupère la la campaign par son id
 * @param id - Id de la campaign
 * @returns Retourne une promesse de type Campaign
 * @see Campaign
 * @see src/Types/Campaign.ts
 * @see src/Api/Models/Campaign.ts
 */
const getCampaignById = async (
  id: string
): Promise<AxiosResponse<ICampaign, any>> => {
  return await httpCommon.get<ICampaign>(`/campaign/${id}`);
};

/**
 * Met à jour la campaign
 * @param id - Id de la campaign
 * @param campaign - Nouvelle campaign
 * @returns Retourne une promesse de type Campaign
 * @see Campaign
 * @see src/Types/Campaign.ts
 * @see src/Api/Models/Campaign.ts
 */
const updateCampaign = async (
  id: string,
  campaign: ICampaignUpdatePayload
): Promise<AxiosResponse<ICampaignUpdatePayload, any>> => {
  return await httpCommon.post<ICampaignUpdatePayload>(
    `/campaign/${id}`,
    campaign
  );
};

/**
 * Crée une campaign
 * @param campaign - Nouvelle campaign
 * @returns Retourne une promesse de type Campaign
 * @see Campaign
 * @see src/Types/Campaign.ts
 */
const createCampaign = async (
  campaign: ICampaignCreatePayload
): Promise<AxiosResponse<ICampaignCreatePayload, any>> => {
  return await httpCommon.post<ICampaignCreatePayload>("/campaign/", campaign);
};

/**
 * delete une campaign
 * @param id - Id de la campaign
 * @returns
 * @see Campaign
 * @see src/Types/Campaign.ts
 * @see src/Api/Models/Campaign.ts
 */
const deleteCampaign = async (
  id: string
): Promise<AxiosResponse<ICampaign, any>> => {
  return await httpCommon.delete<ICampaign>(`/campaign/${id}`);
};

const CampaignServices = {
    getCampaigns,
    getCampaignById,
    updateCampaign,
    createCampaign,
    deleteCampaign
}

export default CampaignServices
