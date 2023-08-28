import Sidebar from '@/components/layout/Sidebar';
import ScannerForm from '@/components/scanner';
import Navbar from '@/components/layout/Navbar';

export default function Scanner() {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex items-center">
        <div className="sm:flex-auto border-b p-4 md:p-12">
          <h1 className="text-xl font-semibold leading-6 text-gray-900">
            Valider le passage
          </h1>
          <p className="mt-2 text-sm text-gray-700">
            Scanner le QR code du client et sélectionner la promotion à associer
            afin de valider son passage.
          </p>
        </div>
      </div>
      <div className="sm:flex-auto w-full md:px-12">
        <ScannerForm />
      </div>
    </div>
  );
}

Scanner.getLayout = function getLayout(page) {
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
