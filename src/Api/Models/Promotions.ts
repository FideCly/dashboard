export interface IPromotionCreatePayload {
  name: string;
  description?: string;
  checkoutLimit: number;
  startAt?: Date;
  endAt: Date;
}

export interface IPromotionUpdatePayload {
  name?: string;
  description?: string;
  checkoutLimit?: number;
  startAt?: Date;
  endAt?: Date;
  isActive?: boolean;
}

export interface IPromotions {
  id: number;
  shopId: number;
  name: string;
  description?: string;
  checkoutLimit: number;
  startAt?: Date;
  endAt: Date;
  isActive?: boolean;
}
