export default interface ICampaignCreatePayload {
  libelle: string
  types: string
  startAt: string
  endAt: string
  template: string
}

export default interface ICampaignUpdatePayload {
  id: number
  libelle: string
  types: string
  startAt: string
  endAt: string
  template: string
}

export default interface ICampaign {
  id: number
  libelle: string
  types: string
  startAt: string
  endAt: string
  template: string
}
