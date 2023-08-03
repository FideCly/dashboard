import { useRouter } from 'next/router';
import { PromotionUpdateForm } from '@/Components/form/Promotion.form';
import Navbar from '@/Components/html/Navbar';
import Sidebar from '@/Components/html/Sidebar';
import { ReactNode } from 'react';

export default function PromotionEditById() {
  const router = useRouter();
  return (
    <>
      {router.isReady ? (
        <div className="text-2xl font-bold bg-white text-white-900">
          <PromotionUpdateForm />
        </div>
      ) : null}
    </>
  );
}

PromotionEditById.getLayout = function getLayout(page: ReactNode) {
  return (
    <div className="relative z-50 flex">
      <Sidebar />
      <div className="w-full">
        <Navbar />
        <main className="py-10 h-screen">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">{page}</div>
        </main>
      </div>
    </div>
  );
};
