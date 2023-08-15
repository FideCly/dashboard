<<<<<<< HEAD
import Sidebar from '@/Components/html/Sidebar';
=======
import Sidebar from '@/components/html/Sidebar';
import Navbar from '@/components/html/Navbar';
>>>>>>> 1042aa2 (fix: translate toast messages)
import QRCode from 'qrcode.react';
import { IUser } from '@/models/User';
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleChevronDown } from '@fortawesome/free-solid-svg-icons';
import { ShopUpdateForm } from '@/Components/form/Shop.form';
import { UserUpdateForm } from '@/Components/form/User.form';
import html2canvas from 'html2canvas';
import Navbar from '@/Components/html/Navbar';

export default function GeneralSettings() {
  const [user, setUser] = useState<IUser>();
  const [isShown, setIsShown] = useState(true);
  const [isShown2, setIsShown2] = useState(false);
  const [isShown3, setIsShown3] = useState(false);
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
  const handleClick = (): void => {
    setIsShown((current) => !current);
  };

  const handleClick2 = (): void => {
    setIsShown2((current) => !current);
  };

  const handleClick3 = (): void => {
    setIsShown3((current) => !current);
  };

  const getCanvas = () => {
    const qr = document.getElementById('fancy-qr-code');
    if (!qr) return;

    return html2canvas(qr, {
      onclone: (snapshot) => {
        const qrElement = snapshot.getElementById('fancy-qr-code');
        if (!qrElement) return;
        // Make element visible for cloning
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
    <main className="flex flex-col flex-1 h-screen px-4 bg-white sm:px-6 lg:px-8 gap-y-8">
      <h1 className="text-xl font-semibold leading-6 text-gray-900">
        Réglages
      </h1>
      <span className="flex mt-2 text-sm text-gray">
        <h2 className="flex-1">Shop QrCode</h2>
        <button
          data-cy="add-promotion"
          id="add-promotion"
          type="button"
          onClick={handleClick}
          className="block px-3 py-2 text-sm font-semibold text-center text-white rounded-md shadow-sm bg-fidgreen hover:bg-fidgreen/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fidgreen"
        >
          <FontAwesomeIcon icon={faCircleChevronDown} />
        </button>
      </span>
      {isShown && (
        <>
          <QRCode
            id="fancy-qr-code"
            value={user?.shop.id.toString()}
            className="p-8 mx-auto rounded-md shadow-md bg-fidbg"
            size={500}
          />
          <button
            className="block w-1/2 px-3 py-2 mx-auto text-sm font-semibold text-center text-white rounded-md shadow-sm bg-fidgreen hover:bg-fidgreen/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fidgreen"
            onClick={downloadQRCode}
          >
            Télécharger le Qrcode
          </button>
        </>
      )}

      <span className="flex mt-2 text-sm text-gray">
        <h2 className="flex-1">Edit shop</h2>
        <button
          data-cy="add-promotion"
          id="add-promotion"
          type="button"
          onClick={handleClick2}
          className="block px-3 py-2 text-sm font-semibold text-center text-white rounded-md shadow-sm bg-fidgreen hover:bg-fidgreen/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fidgreen"
        >
          <FontAwesomeIcon icon={faCircleChevronDown} />
        </button>
      </span>
      {isShown2 && (
        <>
          <ShopUpdateForm />
        </>
      )}
      <span className="flex mt-2 text-sm text-gray">
        <h2 className="flex-1">Edit profile</h2>
        <button
          data-cy="add-promotion"
          id="add-promotion"
          type="button"
          onClick={handleClick3}
          className="block px-3 py-2 text-sm font-semibold text-center text-white rounded-md shadow-sm bg-fidgreen hover:bg-fidgreen/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fidgreen"
        >
          <FontAwesomeIcon icon={faCircleChevronDown} />
        </button>
      </span>
      {isShown3 && (
        <>
          <UserUpdateForm />
        </>
      )}
    </main>
  );
}

GeneralSettings.getLayout = function getLayout(page) {
  return (
    <div className="relative z-50 flex">
      <Sidebar />
      <div className="w-full">
        <main className="h-screen py-10">
          <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">{page}</div>
        </main>
      </div>
    </div>
  );
};
