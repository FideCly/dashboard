import { callAPI } from "../Modules/api";
import {Card} from "../Types";

export const CardService = {
  /**
   * Récupère la liste des cartes
   * @returns Retourne une promesse de type Card[]
   * @see Card
   * @see src/Types/Card.ts
   */
  getCards() {
    return callAPI<Card[]>("/cards", "GET");
  },

  /**
   * Récupère la la carte par son id
   * @param id - Id de la carte
   * @returns Retourne une promesse de type Card
   * @see Card
   * @see src/Types/Card.ts
   */
  getCardById(id: string) {
    return callAPI<Card>(`/cards/${id}`, "GET");
  },

  /**
   * Met à jour la carte
   * @param id - Id de la carte
   * @param card - Nouvelle carte
   * @returns Retourne une promesse de type Card
   * @see Card
   * @see src/Types/Card.ts
   */
  updateCard(id: string, card: Card) {
    return callAPI<Card>(`/cards/${id}`, "PUT", { data: card });
  },

  /**
   * Crée une carte
   * @param card - Nouvelle carte
   * @returns Retourne une promesse de type Card
   * @see Card
   */
  createCard(card: Card) {
    return callAPI<Card>(`/cards`, "POST", { data: card });
  },

  /**
   * delete une carte
   * @param id - Id de la carte
   * @returns
   */
  deleteCard(id: string) {
    return callAPI<Card>(`/cards/${id}`, "DELETE");
  },
};
