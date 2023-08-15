import Sidebar from '@/components/layout/Sidebar';
import Navbar from '@/components/layout/Navbar';
import QRCode from 'qrcode.react';
import { IUser } from '@/models/User';
import { useState, useEffect } from 'react';
import { ShopUpdateForm } from '@/components/form/Shop.form';
import { UserUpdateForm } from '@/components/form/User.form';
import html2canvas from 'html2canvas';

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
  const getCanvas = () => {
    const qr = document.getElementById('fancy-qr-code');
    if (!qr) return;

    return html2canvas(qr, {
      onclone: (snapshot) => {
        const qrElement = snapshot.getElementById('fancy-qr-code');
        if (!qrElement) return;
        // Make element visible htmlFor cloning
        qrElement.style.display = 'block';
      },
    });
  };

  const downloadQRCode = async () => {
    const canvas = await getCanvas();
    if (!canvas) throw new Error('<canvas> not found in DOM');

    const pngUrl = canvas
      .toDataURL('image/png')
      .replace('image/png', 'image/octet-stream');
    const downloadLink = document.createElement('a');
    downloadLink.href = pngUrl;
    downloadLink.download = 'QR code.png';
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  return (
    <main className="w-full h-full">
      <h1 className="pb-12 text-xl font-semibold leading-6 text-gray-900 border-b p-12">
        Réglages
      </h1>
      <header className="border-b border-white/5 bg-gray-50">
        <nav className="flex py-4 border-b px-12">
          <ul
            role="list"
            className="flex min-w-full flex-none gap-x-6 px-4 text-sm font-semibold leading-6 text-gray-800 sm:px-6 lg:px-8"
          >
            <li>
              <a href="#qrcode" className="hover:text-fidgreen">
                QR code
              </a>
            </li>
            <li>
              <a href="#shop" className="hover:text-fidgreen">
                Boutique
              </a>
            </li>
            <li>
              <a href="#profile" className="hover:text-fidgreen">
                Profile
              </a>
            </li>
          </ul>
        </nav>
      </header>
      <div className="divide-y" id="qrcode">
        <div className="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 py-16 sm:px-6 md:grid-cols-3 px-10 lg:px-20">
          <div>
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              QR code de votre boutique
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-400">
              Présentez ce QR code à vos clients afin qu'ils puissent
              enregistrer votre boutique sur leurs applications.
            </p>
          </div>

          <div className="grid md:col-span-2 gap-4">
            <QRCode
              id="fancy-qr-code"
              value={user?.shop.id.toString()}
              className="p-8 mx-auto rounded-md shadow-md bg-fidbg"
              size={500}
            />
            <button
              className="block w-1/2 px-3 py-2 mx-auto text-sm font-medium text-center text-white rounded-md shadow-sm bg-fidgreen hover:bg-fidgreen/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fidgreen"
              onClick={downloadQRCode}
            >
              Télécharger le QR code
            </button>
          </div>
        </div>

        <div
          className="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 py-16 sm:px-6 md:grid-cols-3 px-10 lg:px-20"
          id="shop"
        >
          <div>
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Modifier votre boutique
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-400">
              Apportez des changements à votre boutique. Ces changements seront
              visibles par les utilisateurs de l'application mobile.
            </p>
          </div>
          <ShopUpdateForm />
        </div>

        <div
          className="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 py-16 sm:px-6 md:grid-cols-3 px-10 lg:px-20"
          id="profile"
        >
          <div>
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Modifier votre profil
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-400">
              Apportez des changements à votre profile utilisateur. Ces
              changements ne seront visibles que par vous.
            </p>
          </div>

          <UserUpdateForm />
        </div>
      </div>
    </main>
  );
}

GeneralSettings.getLayout = function getLayout(page) {
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
