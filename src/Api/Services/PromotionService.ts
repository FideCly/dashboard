import { type AxiosResponse } from 'axios'
import http from '../http-common'
import type Promotions from '../Models/Promotions'

/**
   * Récupère la liste des promotions
   * @returns Retourne une promesse de type Promotions[]
   */
const getPromotions = async (): Promise<AxiosResponse<Promotions[], any>> => {
  return await http.get<Promotions[]>('/promotions')
}

/**
   * Récupère la la promotion par son id
   * @param id - Id de la promotion
   * @returns Retourne une promesse de type Promotions
   */
const getPromotionById = async (id: string): Promise<AxiosResponse<Promotions, any>> => {
  return await http.get<Promotions>(`/promotions/${id}`)
}

/**
   * Met à jour la promotion
   * @param id - Id de la promotion
   * @param promotion - Nouvelle promotion
   * @returns Retourne une promesse de type Promotions
   */
const updatePromotion = async (id: string, promotion: Promotions): Promise<AxiosResponse<Promotions, any>> => {
  return await http.post<Promotions>(`/promotions/${id}`, promotion)
}

/**
   * Crée une promotion
   * @param promotion - Nouvelle promotion
   * @returns Retourne une promesse de type Promotions
   */
const createPromotion = async (promotion: Promotions): Promise<AxiosResponse<Promotions, any>> => {
  return await http.post<Promotions>('/promotions', promotion)
}

/**
   * Supprime une promotion
   * @param id - Id de la promotion
   * @returns Retourne une promesse de type Promotions
   */
const deletePromotion = async (id: string): Promise<AxiosResponse<Promotions, any>> => {
  return await http.delete<Promotions>(`/promotions/${id}`)
}
const PromotionService = {
  getPromotions,
  getPromotionById,
  updatePromotion,
  createPromotion,
  deletePromotion
}

export default PromotionService
