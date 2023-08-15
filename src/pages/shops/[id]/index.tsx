import Sidebar from '@/components/html/Sidebar';
import ShopId from '@/components/single/shopId';

export default function ShopEditById({ id }) {
  return <ShopId {...id} />;
}
ShopEditById.getLayout = (page) => (
  <div className="flex">
    <Sidebar />
    {page}
  </div>
);
