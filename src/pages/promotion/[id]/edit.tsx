import Sidebar from '@/Components/html/Sidebar';
import PromotionId from '@/Components/single/promotionId';

export default function PromotionEditById() {
  return <PromotionId />;
}

PromotionEditById.getLayout = (page) => (
  <div className="flex">
    <Sidebar />
    {page}
  </div>
);
