import { type AxiosResponse } from 'axios'
import http from '../http-common'
import {IPromotionCreatePayload,IPromotionUpdatePayload,IPromotions} from '../Models/Promotions'

/**
   * Récupère la liste des promotions
   * @returns Retourne une promesse de type Promotions[]
   */
const getPromotions = async (): Promise<AxiosResponse<IPromotions[], any>> => {
  return await http.get<IPromotions[]>('/promotions')
}

/**
   * Récupère la promotion par son id
   * @param id - Id de la promotion
   * @returns Retourne une promesse de type Promotions
   */
const getPromotionById = async (id: string): Promise<AxiosResponse<IPromotions, any>> => {
  return await http.get<IPromotions>(`/promotions/${id}`)
}

/**
   * Met à jour la promotion
   * @param id - Id de la promotion
   * @param promotion - Nouvelle promotion
   * @returns Retourne une promesse de type Promotions
   */
const updatePromotion = async (id: string, promotion: IPromotionUpdatePayload): Promise<AxiosResponse<IPromotionUpdatePayload, any>> => {
  return await http.put<IPromotionUpdatePayload>(`/promotions/${id}`, promotion)
}

/**
   * Crée une promotion
   * @param promotion - Nouvelle promotion
   * @returns Retourne une promesse de type Promotions
   */
const createPromotion = async (promotion: IPromotionCreatePayload): Promise<AxiosResponse<IPromotionCreatePayload, any>> => {
  return await http.post<IPromotionCreatePayload>('/promotions', promotion)
}

/**
   * Supprime une promotion
   * @param id - Id de la promotion
   * @returns Retourne une promesse de type Promotions
   */
const deletePromotion = async (id: string): Promise<AxiosResponse<IPromotions, any>> => {
  return await http.delete<IPromotions>(`/promotions/${id}`)
}

/**
 * get promotion for a shop
 * @param id - Id of the shop
 * @returns Retourne une promesse de type Promotions
 * @see Promotions
 * @see src/Types/Promotions.ts
 */
const getPromotionsByShopId = async (id: string): Promise<AxiosResponse<IPromotions[], any>> => {
  return await http.get<IPromotions[]>(`/shops/${id}/promotions`)
}

const PromotionService = {
  getPromotions,
  getPromotionById,
  updatePromotion,
  createPromotion,
  deletePromotion,
  getPromotionsByShopId
}

export default PromotionService
