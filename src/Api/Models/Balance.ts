export interface IBalanceCreatePayload {
  promotionId: number;
  cardId: number;
  counter?: number;
  isActive?: boolean;
}

export interface IBalanceUpdatePayload {
  counter?: number;
  isActive?: boolean;
}

export interface IBalance {
  id: number;
  promotionId: number;
  cardId: number;
  counter?: number;
  isActive?: boolean;
}
