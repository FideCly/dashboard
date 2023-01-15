import http from "../http-common";
import {Promotions} from "../Models/Promotions";


  /**
   * Récupère la liste des promotions
   * @returns Retourne une promesse de type Promotions[]
   */
  const getPromotions = () => {
    return http.get<Promotions[]>("/promotions");
};

  /**
   * Récupère la la promotion par son id
   * @param id - Id de la promotion
   * @returns Retourne une promesse de type Promotions
   */
  const getPromotionById = (id: string) => {
    return http.get<Promotions>(`/promotions/${id}`);
};

  /**
   * Met à jour la promotion
   * @param id - Id de la promotion
   * @param promotion - Nouvelle promotion
   * @returns Retourne une promesse de type Promotions
   */
  const updatePromotion = (id: string, promotion: Promotions) => {
    return http.post<Promotions>(`/promotions/${id}`, "PUT", { data: promotion });
};

  /**
   * Crée une promotion
   * @param promotion - Nouvelle promotion
   * @returns Retourne une promesse de type Promotions
   */
  const createPromotion = (promotion: Promotions) => {
    return http.post<Promotions>(`/promotions`, "POST", { data: promotion });
};

  /**
   * Supprime une promotion
   * @param id - Id de la promotion
   * @returns Retourne une promesse de type Promotions
   */
  const deletePromotion = (id: string) => {
    return http.delete<Promotions>(`/promotions/${id}`);
};
const PromotionService = {
  getPromotions,
  getPromotionById,
  updatePromotion,
  createPromotion,
  deletePromotion,
};

export default PromotionService;