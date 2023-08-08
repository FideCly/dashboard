export interface IAnalytics {
  id: number;
  campaignId: number;
  campaignName: string;
  campaignDescription: string;
}

export interface IAffluence {
  status: number;
  value: number;
}

export interface IClientCount {
  status: number;
  value: number;
}

export interface IPromotionRanking {
  status: number;
  values: Array<number>;
  promotionNames: Array<string>;
}

export interface IPromotionCheckoutCount {
  status: number;
  values: number;
}
