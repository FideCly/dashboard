import Navbare from '@/Components/html/Navbar';
import Sidebar from '@/Components/html/Sidebar';
import ScannerForm from '@/Components/scanner';

export default function Scanner() {
  return <ScannerForm />;
}

Scanner.getLayout = function getLayout(page) {
  return (
    <div className="flex">
      <Sidebar />
      <div className="p-4 sm:ml-64">
        <Navbare />
        {page}
      </div>
    </div>
  );
};
