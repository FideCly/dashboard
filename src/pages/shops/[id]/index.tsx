import Navbar from '@/components/layout/Navbar';
import Sidebar from '@/components/layout/Sidebar';
import ShopId from '@/components/single/shopId';

export default function ShopEditById({ id }) {
  return <ShopId {...id} />;
}
ShopEditById.getLayout = (page) => (
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
