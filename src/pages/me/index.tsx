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
        <main className="h-screen py-10">
          <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">{page}</div>
        </main>
      </div>
    </div>
  );
};
