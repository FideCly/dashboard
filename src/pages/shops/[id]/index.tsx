import Sidebar from '@/Components/html/Sidebar';
import ShopId from '@/Components/single/shopId';

export default function ShopEditById({ id }) {
  return <ShopId {...id} />;
}
ShopEditById.getLayout = (page) => (
  <div className="flex">
    <Sidebar />
    {page}
  </div>
);
