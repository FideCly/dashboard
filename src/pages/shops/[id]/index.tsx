import { useEffect, useState } from 'react';
import { ShopService } from '@/pages/api/Services';
import { IShop } from '@/Models/Shop';
import { useRouter } from 'next/router';
import Sidebar from '@/Components/html/Sidebar';
import Navbare from '@/Components/html/Navbar';

export default function ShopViewById() {
  const [shop, setShop] = useState<IShop>();
  const router = useRouter();
  const { id } = router.query;
  // get shop by id

  useEffect(() => {
    const getShopById = async () => {
      try {
        const response = await ShopService.getShopById(id as string);
        setShop(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getShopById();
  }, [id]);

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

ShopViewById.getLayout = (page) => (
    <div className="">
      <Sidebar />

      <div className="p-4 sm:ml-64">
        <Navbare />
        {page}
      </div>
    </div>
);
