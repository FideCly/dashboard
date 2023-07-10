import { useEffect, useState } from 'react';
import { PromotionUpdateForm } from '@/Components/form/Promotion.form';
import { IPromotions } from '@/Models/Promotions';
import { useRouter } from 'next/router';
import Sidebar from '@/Components/html/Sidebar';
import { getCookies } from 'cookies-next';

export default function PromotionEditById() {
  const [promotion, setPromotion] = useState<IPromotions>();
  const router = useRouter();
  const { id } = router.query;
  // get promotion by id

  useEffect(() => {
    const getPromotionById = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/promotions/${id}`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          },
        ).then(async (res) => {
          if (res.status >= 400) {
            throw new Error('Bad response from server');
          }
          setPromotion(await res.json());
        });
      } catch (error) {
        console.log(error);
      }
    };
    getPromotionById();
  }, [id]);

  return (
    <div>{promotion && <PromotionUpdateForm promotion={promotion} />}</div>
  );
}

PromotionEditById.getLayout = (page) => (
  <div className="flex">
    <Sidebar />
    {page}
  </div>
);
