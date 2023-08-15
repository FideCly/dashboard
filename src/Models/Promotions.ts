export interface IPromotionCreatePayload {
  name: string;
  description?: string;
  checkoutLimit: number;
  startAt?: Date;
  endAt?: Date;
}

export interface IPromotionUpdatePayload {
  id: number;
  name: string;
  description: string;
  checkoutLimit: number;
  startAt: string;
  endAt: string;
}

export interface IPromotion {
  id: number;
  shopId: number;
  name: string;
  description?: string;
  startAt?: Date;
  endAt: Date;
  checkoutLimit: number;
  isActive: boolean;
}
