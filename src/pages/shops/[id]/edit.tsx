import { useEffect, useState } from 'react';
import { ShopUpdateForm } from '@/Components/form/Shop.form';
import { IShop } from '@/Models/Shop';
import { useRouter } from 'next/router';
import Sidebar from '@/Components/html/Sidebar';

export default function ShopEditById() {
  const [shop, setShop] = useState<IShop>();
  const router = useRouter();
  const { id } = router.query;
  // get shop by id

  useEffect(() => {
    const getShopById = async () => {
      try {
        const response = await fetch(`/api/shop/${id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const data = await response.json();
        setShop(data);
      } catch (error) {
        console.log(error);
      }
    };
    getShopById();
  }, [id]);

  return <div>{shop && <ShopUpdateForm shop={shop} />}</div>;
}
ShopEditById.getLayout = (page) => (
  <div className="flex">
    <Sidebar />
    {page}
  </div>
);
