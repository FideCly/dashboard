import { useRouter } from 'next/router';
import { PromotionUpdateForm } from '@/Components/form/Promotion.form';
import Navbare from '@/Components/html/Navbar';
import Sidebar from '@/Components/html/Sidebar';
import { ReactNode } from 'react';

export default function PromotionEditById() {
  const router = useRouter();
  return (
    <>
      {router.isReady ? (
        <div className="text-2xl font-bold text-white-900">
          <PromotionUpdateForm />
        </div>
      ) : null}
    </>
  );
}

PromotionEditById.getLayout = function getLayout(page: ReactNode) {
  return (
    <div className="">
      <Sidebar />
      <div className="p-2 sm:ml-64">
        <Navbare />
        {page}
      </div>
    </div>
  );
};
