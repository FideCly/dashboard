import { ShopUpdateForm } from '@/components/form/Shop.form';
import Navbar from '@/components/layout/Navbar';
import Sidebar from '@/components/layout/Sidebar';
import { useRouter } from 'next/router';
import { ReactNode } from 'react';

export default function ShopEditById() {
  const router = useRouter();
  return (
    <>
      {router.isReady ? (
        <div className="text-2xl font-bold text-white-900">
          <ShopUpdateForm />
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
