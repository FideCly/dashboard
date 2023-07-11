import { useEffect, useState } from 'react';
import { IPromotions } from '@/Models/Promotions';
import { useRouter } from 'next/router';
import Sidebar from '@/Components/html/Sidebar';

export default function PromotionViewById() {
  const [promotion, setPromotion] = useState<IPromotions>();
  const router = useRouter();
  const { id } = router.query;
  // get promotion by id

  useEffect(() => {
    const getPromotionById = async () => {
      try {
        await fetch(`/api/promotion/${id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }).then(async (res) => {
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
  }, [setPromotion, id]);

  return (
    <div>
      <h1>{promotion?.name}</h1>
      <p>{promotion?.description}</p>
      <p>{promotion?.startAt?.toDateString()} </p>
      <p>{promotion?.endAt?.toDateString()}</p>
    </div>
  );
}

PromotionViewById.getLayout = (page) => (
  <div className="flex">
    <Sidebar />
    {page}
  </div>
);
