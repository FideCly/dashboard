
import { PromotionUpdateForm } from '@/Components/form/Promotion.form';
import { useRouter } from 'next/router';
import Sidebar from '@/Components/html/Sidebar';

export default function PromotionEditById() {
  const router = useRouter();
  // get promotion by id
  const { id } = router.query;
  return (
    <div>
      <PromotionUpdateForm id={id} />
    </div>
  );
}

PromotionEditById.getLayout = (page) => (
  <div className="flex">
    <Sidebar />
    {page}
  </div>
);
