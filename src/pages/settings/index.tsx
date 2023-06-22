import Sidebar from '@/Components/html/Sidebar';
import Navbare from '@/Components/html/Navbar';

export default function GeneralSettings() {
  return (
    <div className="mt-4 ">
      <div className="flex">
        <h1 className="flex-1 text-4xl">Réglages</h1>
      </div>
    </div>
  );
}

GeneralSettings.getLayout = (page) => (
    <div className="">
      <Sidebar />

      <div className="p-4 sm:ml-64">
        <Navbare />
        {page}
      </div>
    </div>
);
