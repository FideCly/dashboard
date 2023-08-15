import { CampaignUpdateForm } from '@/components/form/Campaign.form';
import Navbar from '@/components/layout/Navbar';
import Sidebar from '@/components/layout/Sidebar';
import { useRouter } from 'next/router';
import { ReactNode } from 'react';

export default function ShopEditById() {
  const router = useRouter();
  return (
    <>
      {router.isReady ? (
        <div className="p-4 sm:p-6 lg:p-8 min-h-screen">
          <div className="sm:flex sm:items-center">
            <div className="sm:flex-auto">
              <h1 className="text-xl font-semibold leading-6 text-gray-900">
                Modifier la campagne marketing
              </h1>
              <p className="mt-2 text-sm text-gray-700">
                Apportez des changements à votre campagne.
              </p>
            </div>
          </div>
          <CampaignUpdateForm />
        </div>
      ) : null}
    </>
  );
}

ShopEditById.getLayout = function getLayout(page: ReactNode) {
  return (
    <div className="w-full bg-fidbg flex">
      <div className=" inset-y-0 z-50 bg-fidgreen">
        <Sidebar />
      </div>
      <div className="w-full">
        <Navbar />
        <main className="">
          <div className="mx-auto">{page}</div>
        </main>
      </div>
    </div>
  );
};
