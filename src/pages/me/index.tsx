import { Profile } from '@/Components/auth/Profile';
import Navbar from '@/Components/html/Navbar';
import Sidebar from '@/Components/html/Sidebar';

export default function Me() {
  return (
    <>
      <Profile />
    </>
  );
}

Me.getLayout = function getLayout(page) {
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
