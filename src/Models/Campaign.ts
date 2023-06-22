import { IShop } from './Shop';
import { IUser } from './User';

export interface ICampaignCreatePayload {
  subject: string;
  message: string;
  shop: IShop;
  targets?: IUser[];
}

export interface ICampaignUpdatePayload {
  id: number;
  subject: string;
  message: string;
  shop: IShop;
  targets?: IUser[];
}

export interface ICampaign {
  id: number;
  subject: string;
  message: string;
  shop: IShop;
  targets?: IUser[];
  isActive: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}
