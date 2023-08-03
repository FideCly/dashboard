import Sidebar from '@/Components/html/Sidebar';
import Navbar from '@/Components/html/Navbar';
import QRCode from 'qrcode.react';
import { IUser } from '@/Models/User';
import { Button } from 'flowbite-react';
import { useState, useEffect } from 'react';

export default function GeneralSettings() {
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
        <div className="sm:flex-auto p-4 rounded-xl">
          <h1 className="text-xl font-semibold leading-6 text-gray-900">
            Réglages
          </h1>
          <p className="mt-2 text-sm text-gray-700"></p>
        </div>
      </div>
      <QRCode
        id="canvas"
        value={user?.shop.id.toString()}
        className="p-8 shadow-md mx-auto rounded-md bg-fidbg"
        size={500}
      />
      <button className="block rounded-md mx-auto bg-fidgreen px-3 w-1/2 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-fidgreen/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fidgreen">
        Télécharger le Qrcode
      </button>
    </div>
  );
}

GeneralSettings.getLayout = function getLayout(page) {
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
