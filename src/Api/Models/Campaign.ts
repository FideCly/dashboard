export interface ICampaignCreatePayload {
  libelle: string
  types: string
  startAt: string
  endAt: string
  template: string
}

export interface ICampaignUpdatePayload {
  id: number
  libelle: string
  types: string
  startAt: string
  endAt: string
  template: string
}

export interface ICampaign {
  id: number
  libelle: string
  types: string
  startAt: string
  endAt: string
  template: string
}
