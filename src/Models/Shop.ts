export interface IShopCreatePayload {
  companyName: string;
  siren: string;
  siret: string;
  email: string;
  zipCode: string;
  lat: string;
  long: string;
  phone: string;
  address: string;
  activity: string;
  city?: string;
}

export interface IShopUpdatePayload {
  id: number;
  companyName?: string;
  siren?: string;
  siret?: string;
  email?: string;
  zipCode?: string;
  lat?: string;
  long?: string;
  phone?: string;
  address?: string;
  city?: string;
  activity: string;
}

export interface IShop {
  id: number;
  companyName: string;
  siren: string;
  siret: string;
  email: string;
  zipCode: string;
  lat: string;
  long: string;
  phone: string;
  address: string;
  city: string;
}
