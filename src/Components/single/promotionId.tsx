import { IPromotions } from '@/Models/Promotions';
import { useEffect, useState } from 'react';

export default function PromotionId(id: any) {
  const [promotion, setPromotion] = useState<IPromotions>();
  useEffect(() => {
    fetch(`/api/promotions/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data) => setPromotion(data));
  }, []);

  return (
    <div>
      <h1>{promotion?.name}</h1>
      <p>{promotion?.description}</p>
      <p>{promotion?.startAt.toDateString()} </p>
      <p>{promotion?.endAt.toDateString()}</p>
    </div>
  );
}
