export interface ICardCreatePayload {
  shopId: number;
  userId: number;
  startAt?: Date;
  endAt: Date;
  isActive?: boolean;
}

export interface ICardUpdatePayload {
  startAt?: Date;
  endAt?: Date;
  isActive?: boolean;
}

export interface ICard {
  id: number;
  startAt: Date;
  endAt: Date;
  isActive: boolean;
  shopId: number;
  userId: number;
}
