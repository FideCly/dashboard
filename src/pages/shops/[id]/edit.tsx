import { ShopUpdateForm } from '@/Components/form/Shop.form';
import { useRouter } from 'next/router';
import Sidebar from '@/Components/html/Sidebar';

export default function ShopEditById() {
  const router = useRouter();
  const { id } = router.query;
  // get shop by id
  return (
    <div>
      <ShopUpdateForm id={id} />
    </div>
  );
}
ShopEditById.getLayout = (page) => (
  <div className="flex">
    <Sidebar />
    {page}
  </div>
);
