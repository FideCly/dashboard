import { IShop } from '@/Models/Shop';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function ShopId() {
  const router = useRouter();
  const [shop, setShop] = useState<IShop>();
  useEffect(() => {
    fetch(`/api/shop/${router.query.id}`)
      .then((res) => res.json())
      .then((data) => setShop(data));
  }, []);

  return (
    <div>
      <h1>{shop?.companyName}</h1>
      <p>{shop?.address}</p>
      <p>{shop?.zipCode}</p>
      <p>{shop?.phone}</p>
      <p>{shop?.email}</p>
      <p>{shop?.siren}</p>
      <p>{shop?.siret}</p>
    </div>
  );
}
