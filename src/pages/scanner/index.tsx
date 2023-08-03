import Sidebar from '@/Components/html/Sidebar';
import ScannerForm from '@/Components/scanner';
import { IUser } from '@/Models/User';

import { useEffect, useState } from 'react';
import Navbar from '@/Components/html/Navbar';

export default function Scanner() {
  const [user, setUser] = useState<IUser>();

  //get shop id from user
  const loadUser = async (): Promise<IUser> => {
    const userUuid = localStorage.getItem('userUuid');
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const user = fetch(`/api/user/${userUuid}`, options)
      .then((response) => response.json())
      .catch((error) => console.error(error));
    return user;
  };

  useEffect(() => {
    const loadUserShop = async (): Promise<void> => {
      const user = await loadUser();
      setUser(user);
    };
    loadUserShop();
  }, []);

  return (
    <div className="px-4 sm:px-6 lg:px-8 bg-white flex flex-col gap-y-8 h-screen">
      <div className="flex items-center gap-y-4">
        <div className="sm:flex-auto bg-fidbg p-4 rounded-xl shadow-md">
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
        <main className="py-10 h-screen">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">{page}</div>
        </main>
      </div>
    </div>
  );
};
