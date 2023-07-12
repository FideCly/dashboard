import { ShopUpdateForm } from '@/Components/form/Shop.form';
import Sidebar from '@/Components/html/Sidebar';
import { IShop } from '@/Models/Shop';
import { useEffect, useState } from 'react';

export default function ShopEditById({ id }) {
  const [shop, setShop] = useState<IShop>();
  useEffect(() => {
    fetch(`/api/shop/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data) => setShop(data));
  }, []);
  return <ShopUpdateForm {...shop} />;
}
ShopEditById.getLayout = (page) => (
  <div className="flex">
    <Sidebar />
    {page}
  </div>
);
