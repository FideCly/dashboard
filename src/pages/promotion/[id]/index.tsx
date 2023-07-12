import { useRouter } from 'next/router';
import Sidebar from '@/Components/html/Sidebar';
import { useEffect, useState } from 'react';
import { IPromotions } from '@/Models/Promotions';

export default function PromotionEditById() {
  const router = useRouter();
  const id = router.query.id;
  const [promotion, setPromotion] = useState<IPromotions>();
  useEffect(() => {
    fetch(`/api/promotion/${id}`)
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

PromotionEditById.getLayout = (page) => (
  <div className="flex">
    <Sidebar />
    {page}
  </div>
);
