import axios from 'axios';
import { useEffect, useState } from 'react';

export default function CardList() {
  const [cards, setCards] = useState<Card[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const loadCards = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get<Card[]>(import.meta.env.VITE_API_URL + 'wallet');
        setCards(response.data);
      } catch (error) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };
    loadCards();
  }, []);

  if (isLoading) {
    return <div>loading....</div>;
  }

  if (error) {
    return (
      <div>
        <span>Erreur lors du chargement des cartes</span>
      </div>
    );
  }

  return (
    <div>
      {cards.map((card) => (
        <div key={card.id}>
          <span>{card.name}</span>
          <span>{card.description}</span>
          <span>{card.startAt}</span>
          <span>{card.endAt}</span>
        </div>
      ))}
    </div>
  );
}
