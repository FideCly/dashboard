import { type AxiosResponse } from 'axios'
import http from '../http-common'
import type Card from '../Models/Card'
/**
   * Récupère la liste des cartes
   * @returns Retourne une promesse de type Card[]
   * @see Card
   * @see src/Types/Card.ts
   */
const getCards = async (): Promise<AxiosResponse<Card[], any>> => {
  return await http.get<Card[]>('/cards')
}

/**
   * Récupère la la carte par son id
   * @param id - Id de la carte
   * @returns Retourne une promesse de type Card
   * @see Card
   * @see src/Types/Card.ts
   */
const getCardById = async (id: string): Promise<AxiosResponse<Card, any>> => {
  return await http.get<Card>(`/cards/${id}`)
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
  return await http.put<Card>(`/cards/${id}`, card)
}

/**
   * Crée une carte
   * @param card - Nouvelle carte
   * @returns Retourne une promesse de type Card
   * @see Card
   */
const createCard = async (card: Card): Promise<AxiosResponse<Card, any>> => {
  return await http.post<Card>('/cards', card)
}

/**
   * delete une carte
   * @param id - Id de la carte
   * @returns
   */
const deleteCard = async (id: string): Promise<AxiosResponse<Card, any>> => {
  return await http.delete<Card>(`/cards/${id}`)
}

const CardService = {
  getCards,
  getCardById,
  updateCard,
  createCard,
  deleteCard
}

export default CardService
