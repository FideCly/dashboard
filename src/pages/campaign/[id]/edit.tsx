import { CampaignUpdateForm } from '@/components/form/Campaign.form';
import Navbar from '@/components/html/Navbar';
import Sidebar from '@/components/html/Sidebar';
import { useRouter } from 'next/router';
import { ReactNode } from 'react';

export default function ShopEditById() {
  const router = useRouter();
  return (
    <>
      {router.isReady ? (
        <div className="text-2xl font-bold bg-white text-white-900">
          <CampaignUpdateForm />
        </div>
      ) : null}
    </>
  );
}

ShopEditById.getLayout = function getLayout(page: ReactNode) {
  return (
    <div className="relative z-50 flex">
      <Sidebar />
      <div className="w-full">
        <Navbar />
        <main className="h-screen py-10">
          <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">{page}</div>
        </main>
      </div>
    </div>
  );
};
