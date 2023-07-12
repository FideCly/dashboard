import Sidebar from '@/Components/html/Sidebar';
import ShopId from '@/Components/single/shopId';

export default function ShopEditById() {
  return <ShopId />;
}
ShopEditById.getLayout = (page) => (
  <div className="flex">
    <Sidebar />
    {page}
  </div>
);
