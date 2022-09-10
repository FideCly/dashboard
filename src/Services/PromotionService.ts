import { callAPI } from "../Modules/api";
import {Promotions} from "../Types";

export const PromotionService = {
  /**
   * Récupère la liste des promotions
   * @returns Retourne une promesse de type Promotions[]
   */
  getPromotions() {
    return callAPI<Promotions[]>("/promotions", "GET");
  },

  /**
   * Récupère la la promotion par son id
   * @param id - Id de la promotion
   * @returns Retourne une promesse de type Promotions
   */
  getPromotionById(id: string) {
    return callAPI<Promotions>(`/promotions/${id}`, "GET");
  },

  /**
   * Met à jour la promotion
   * @param id - Id de la promotion
   * @param promotion - Nouvelle promotion
   * @returns Retourne une promesse de type Promotions
   */
  updatePromotion(id: string, promotion: Promotions) {
    return callAPI<Promotions>(`/promotions/${id}`, "PUT", { data: promotion });
  },

  /**
   * Crée une promotion
   * @param promotion - Nouvelle promotion
   * @returns Retourne une promesse de type Promotions
   */
  createPromotion(promotion: Promotions) {
    return callAPI<Promotions>(`/promotions`, "POST", { data: promotion });
  },

  /**
   * Supprime une promotion
   * @param id - Id de la promotion
   * @returns Retourne une promesse de type Promotions
   */
  deletePromotion(id: string) {
    return callAPI<Promotions>(`/promotions/${id}`, "DELETE");
  },
};
