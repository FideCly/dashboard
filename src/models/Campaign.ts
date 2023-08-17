export interface ICampaignCreatePayload {
  promotionId: number;
  subject: string;
  textData?: string;
  htmlData?: string;
}

export interface ICampaignUpdatePayload {
  id: number;
  promotionId: number;
  shopId: number;
  subject: string;
  textData?: string;
  htmlData?: string;
  isActivate: boolean;
}

export interface ICampaign {
  startAt: any;
  endAt: any;
  id?: number;
  promotionId: number;
  subject: string;
  textData?: string;
  createdAt: Date;
  updatedAt: Date;
}
