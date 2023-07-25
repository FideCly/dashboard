import { CampaignUpdateForm } from '@/Components/form/Campaing.form';
import Navbare from '@/Components/html/Navbar';
import Sidebar from '@/Components/html/Sidebar';
import { useRouter } from 'next/router';
import { ReactNode } from 'react';

export default function ShopEditById() {
  const router = useRouter();
  return (
    <>
      {router.isReady ? (
        <div className="text-2xl font-bold text-white-900">
          <CampaignUpdateForm />
        </div>
      ) : null}
    </>
  );
}

ShopEditById.getLayout = function getLayout(page: ReactNode) {
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
