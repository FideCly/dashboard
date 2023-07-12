import { PromotionUpdateForm } from '@/Components/form/Promotion.form';
import Sidebar from '@/Components/html/Sidebar';
import { IPromotions } from '@/Models/Promotions';
import { useEffect, useState } from 'react';

export default function PromotionEditById({ id }) {
  const [promotion, setPromotion] = useState<IPromotions>();
  useEffect(() => {
    fetch(`/api/promotion/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data) => setPromotion(data));
  }, []);

  return <PromotionUpdateForm {...promotion} />;
}

PromotionEditById.getLayout = (page) => (
  <div className="flex">
    <Sidebar />
    {page}
  </div>
);
