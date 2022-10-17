import axios from "axios";
import { useEffect, useState } from "react";

export default function CampagneList() {
  const [campagnes, setCampagnes] = useState<Campagne[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const loadCampagnes = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get<Campagne[]>(
          import.meta.env.VITE_API_URL + "campagnes"
        );
        setCampagnes(response.data);
      } catch (error) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };
    loadCampagnes();
  }, []);

  if (isLoading) {
    return <div>loading....</div>;
  }

  if (error) {
    return (
      <div>
        <span>Erreur lors du chargement des campagnes</span>
      </div>
    );
  }

  return (
    <div>
      {campagnes.map((campagne) => (
        <div key={campagne.id}>
          <span>{campagne.name}</span>
          <span>{campagne.description}</span>
          <span>{campagne.startAt}</span>
          <span>{campagne.endAt}</span>
        </div>
      ))}
    </div>
  );
}
