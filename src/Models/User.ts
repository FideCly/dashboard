import { ICard } from './Card';
import { IShop } from './Shop';
export interface IUserAuthPayload {
  role: string;
  email: string;
  password: string;
}

export interface IAuthPayload {
  email: string;
  password: string;
}

export interface IUserUpdatePayload {
  id: number;
  uuid: string;
  username?: string;
  birthday?: Date;
  sexe?: string;
}

export interface IUser {
  id: number;
  uuid: string;
  username: string;
  email: string;
  isActive: boolean;
  cards: ICard[];
  shop: IShop;
  birthday: Date;
  sexe: string;
}

export interface jwttoken {
  status: number;
  token: string;
  userUuid: string;
}
