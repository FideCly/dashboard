export interface ICampaignCreatePayload {
  promotionId: number;
  subject: string;
  textData: string;
}

export interface ICampaignUpdatePayload {
  promotionId: number;
  id?: number;
  subject: string;
  textData?: string;
}

export interface ICampaign {
  id?: number;
  promotionId: number;
  subject: string;
  textData?: string;
}
