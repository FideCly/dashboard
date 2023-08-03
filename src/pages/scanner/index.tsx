import Sidebar from '@/Components/html/Sidebar';
import ScannerForm from '@/Components/scanner';
import Navbar from '@/Components/html/Navbar';

export default function Scanner() {
  return (
    <div className="flex flex-col h-screen px-4 bg-white sm:px-6 lg:px-8 gap-y-8">
      <div className="flex items-center gap-y-4">
        <div className="p-4 border sm:flex-auto bg-fidbg rounded-xl">
          <h1 className="text-xl font-semibold leading-6 text-gray-900">
            Valider le passage
          </h1>
          <p className="mt-2 text-sm text-gray-700">
            Scanner le QR code du client et sélectionner la promotion à associer
            afin de valider son passage.
          </p>
        </div>
      </div>
      <ScannerForm />
    </div>
  );
}

Scanner.getLayout = function getLayout(page) {
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
