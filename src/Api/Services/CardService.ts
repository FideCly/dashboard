import http from "../http-common";
import Card from "../Models/Card";
  /**
   * Récupère la liste des cartes
   * @returns Retourne une promesse de type Card[]
   * @see Card
   * @see src/Types/Card.ts
   */
  const getCards = () =>{
    return http.get<Card[]>("/cards");
  };

  /**
   * Récupère la la carte par son id
   * @param id - Id de la carte
   * @returns Retourne une promesse de type Card
   * @see Card
   * @see src/Types/Card.ts
   */
  const getCardById = (id: string) => {
    return http.get<Card>(`/cards/${id}`);
  };

  /**
   * Met à jour la carte
   * @param id - Id de la carte
   * @param card - Nouvelle carte
   * @returns Retourne une promesse de type Card
   * @see Card
   * @see src/Types/Card.ts
   */
  const updateCard = (id: string, card: Card) => {
    return http.post<Card>(`/cards/${id}`, "PUT", { data: card });
  };

  /**
   * Crée une carte
   * @param card - Nouvelle carte
   * @returns Retourne une promesse de type Card
   * @see Card
   */
  const createCard = (card: Card) => {
    return http.post<Card>(`/cards`, "POST", { data: card });
  };

  /**
   * delete une carte
   * @param id - Id de la carte
   * @returns
   */
  const deleteCard = (id: string) => {
    return http.delete<Card>(`/cards/${id}`);
  };

const CardService = {
  getCards,
  getCardById,
  updateCard,
  createCard,
  deleteCard,
};

export default CardService;
