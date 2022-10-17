import axios from "axios";
import { useEffect, useState } from "react";

export default function ShopList() {
  const [shops, setShops] = useState<Shop[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const loadShops = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get<Shop[]>(
          import.meta.env.VITE_API_URL + "shops"
        );
        setShops(response.data);
      } catch (error) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };
    loadShops();
  }, []);

  if (isLoading) {
    return <div>loading....</div>;
  }

  if (error) {
    return (
      <div>
        <span>Erreur lors du chargement des magasins</span>
      </div>
    );
  }

  return (
    <div>
      {shops.map((shop) => (
        <div key={shop.id}>
          <span>{shop.name}</span>
          <span>{shop.description}</span>
          <span>{shop.address}</span>
          <span>{shop.city}</span>
          <span>{shop.postalCode}</span>
          <span>{shop.phone}</span>
          <span>{shop.email}</span>
          <span>{shop.website}</span>
          <span>{shop.openingHours}</span>
          <span>{shop.promotion}</span>
        </div>
      ))}
    </div>
  );
}
