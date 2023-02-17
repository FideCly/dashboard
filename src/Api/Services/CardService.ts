import { type AxiosResponse } from 'axios'
import http from '../http-common'
import type Card from '../Models/Card'

const route = '/cards'

/**
   * Récupère la liste des cartes
   * @returns Retourne une promesse de type Card[]
   * @see Card
   * @see src/Types/Card.ts
   */
const getCards = async (): Promise<AxiosResponse<Card[], any>> => {
  return await http.get<Card[]>(route)
}

/**
   * Récupère la la carte par son id
   * @param id - Id de la carte
   * @returns Retourne une promesse de type Card
   * @see Card
   * @see src/Types/Card.ts
   */
const getCardById = async (id: string): Promise<AxiosResponse<Card, any>> => {
  return await http.get<Card>(`${route}/${id}`)
}

/**
   * Met à jour la carte
   * @param id - Id de la carte
   * @param card - Nouvelle carte
   * @returns Retourne une promesse de type Card
   * @see Card
   * @see src/Types/Card.ts
   */
const updateCard = async (id: string, card: Card): Promise<AxiosResponse<Card, any>> => {
  return await http.put<Card>(`${route}/${id}`, card)
}

/**
   * Crée une carte
   * @param card - Nouvelle carte
   * @returns Retourne une promesse de type Card
   * @see Card
   */
const createCard = async (card: Card): Promise<AxiosResponse<Card, any>> => {
  return await http.post<Card>(route, card)
}

/**
   * delete une carte
   * @param id - Id de la carte
   * @returns
   */
const deleteCard = async (id: string): Promise<AxiosResponse<Card, any>> => {
  return await http.delete<Card>(`${route}/${id}`)
}

const CardService = {
  getCards,
  getCardById,
  updateCard,
  createCard,
  deleteCard
}

export default CardService
