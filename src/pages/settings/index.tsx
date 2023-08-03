import Sidebar from '@/Components/html/Sidebar';
import Navbar from '@/Components/html/Navbar';
import QRCode from 'qrcode.react';
import { IUser } from '@/Models/User';
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
    <div className="flex flex-col h-screen px-4 bg-white sm:px-6 lg:px-8 gap-y-8">
      <div className="flex items-center gap-y-4">
        <div className="p-4 sm:flex-auto rounded-xl">
          <h1 className="text-xl font-semibold leading-6 text-gray-900">
            Réglages
          </h1>
          <p className="mt-2 text-sm text-gray-700"></p>
        </div>
      </div>
      <QRCode
        id="canvas"
        value={user?.shop.id.toString()}
        className="p-8 mx-auto rounded-md shadow-md bg-fidbg"
        size={500}
      />
      <button className="block w-1/2 px-3 py-2 mx-auto text-sm font-semibold text-center text-white rounded-md shadow-sm bg-fidgreen hover:bg-fidgreen/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fidgreen">
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
        <main className="h-screen py-10">
          <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">{page}</div>
        </main>
      </div>
    </div>
  );
};
