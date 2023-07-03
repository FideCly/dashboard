import { Profile } from '@/Components/auth/Profile';
import Navbare from '@/Components/html/Navbar';
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
    <div className="">
      <Sidebar />

      <div className="p-2 sm:ml-64">
        <Navbare />
        {page}
      </div>
    </div>
  );
};
