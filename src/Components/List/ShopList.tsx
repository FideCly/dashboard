import axios from "axios";
import { useEffect, useState } from "react";
import { IShopCreatePayload } from "../../interfaces";
export default function ShopList() {
  const [shops, setShops] = useState<IShopCreatePayload[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const loadShops = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get<IShopCreatePayload[]>(
          import.meta.env.VITE_API_URL + 'shops'
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
        <div key={shop.companyName}>
          <span>{shop.companyName}</span>
          <span>{shop.address}</span>
          <span>{shop.zipCode}</span>
          <span>{shop.phone}</span>
          <span>{shop.email}</span>
          <span>{shop.geoloc}</span>
        </div>
      ))}
    </div>
  );
}
