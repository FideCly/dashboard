import { PromotionUpdateForm } from '@/Components/form/Promotion.form';
import Navbare from '@/Components/html/Navbar';
import Sidebar from '@/Components/html/Sidebar';
import { IPromotions } from '@/Models/Promotions';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function PromotionEditById() {
  const [promotion, setPromotion] = useState<IPromotions>();
  const router = useRouter();
  const id = router.query.id;
  useEffect(() => {
    const loadPromotion = async (): Promise<void> => {
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
  }, [id]);

  return <PromotionUpdateForm {...promotion} />;
}

PromotionEditById.getLayout = function getLayout(page) {
  return (
    <div className="">
      <Sidebar />
      <div className="p-2 sm:ml-64">
        <Navbare />
        {page}
      </div>
    </div>
  );
};
