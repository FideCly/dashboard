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
  startAt: Date;
  endAt: Date;
}

export interface IPromotions {
  id: number;
  shopId: number;
  name: string;
  description?: string;
  startAt?: Date;
  endAt: Date;
  checkoutLimit: number;
}
