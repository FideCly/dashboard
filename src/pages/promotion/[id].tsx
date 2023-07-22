import Sidebar from '@/Components/html/Sidebar';
import PromotionId from '@/Components/single/promotionId';
import { IPromotions } from '@/Models/Promotions';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function PromotionEditById() {
  const [promotion, setPromotion] = useState<IPromotions>();
  const router = useRouter();
  useEffect(() => {
    const loadPromotion = async (): Promise<void> => {
      const id = router.query.id;
      const options = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      };
      try {
        const response = await fetch(`/api/promotions/${id}`, options);
        const data = await response.json();
        setPromotion(data);
      } catch (error) {
        console.error(error);
      }
    };
    loadPromotion();
  }, []);

  return <PromotionId {...promotion} />;
}

PromotionEditById.getLayout = (page) => (
  <div className="flex">
    <Sidebar />
    {page}
  </div>
);
