import axios from "axios";
import { useEffect, useState } from "react";

export default function PromotionList() {
  const [promotions, setPromotions] = useState<Promotion[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const loadPromotions = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get<Promotion[]>(
          import.meta.env.VITE_API_URL + "promotions"
        );
        setPromotions(response.data);
      } catch (error) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };
    loadPromotions();
  }, []);

  if (isLoading) {
    return <div>loading....</div>;
  }

  if (error) {
    return (
      <div>
        <span>Erreur lors du chargement des promotion</span>
      </div>
    );
  }

  return (
    <div>
      {promotions.map((promotion) => (
        <div key={promotion.id}>
          <span>{promotion.name}</span>
          <span>{promotion.description}</span>
          <span>{promotion.startAt}</span>
          <span>{promotion.endAt}</span>
        </div>
      ))}
    </div>
  );
}
