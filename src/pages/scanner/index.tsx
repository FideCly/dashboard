import Navbare from '@/Components/html/Navbar';
import Sidebar from '@/Components/html/Sidebar';
import ScannerForm from '@/Components/scanner';
import { IUser } from '@/Models/User';
import { getSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import QRCode from 'qrcode.react';
import { Button } from 'flowbite-react';

export default function Scanner() {
  const [user, setUser] = useState<IUser>();

  //get shop id from user
  const loadUser = async (): Promise<IUser> => {
    const session = await getSession();
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const user = fetch(`/api/user/${session.user.email}`, options)
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
    <>
      <ScannerForm />
      <QRCode
        id="canvas"
        value={user?.shop.id.toString()}
        className="p-4 bg-white rounded rounded-md"
        size={290}
      />
      <Button> Download Qrcode</Button>
    </>
  );
}

Scanner.getLayout = function getLayout(page) {
  return (
    <div className="">
      <Sidebar />
      <div className="p-4 sm:ml-64">
        <Navbare />
        {page}
      </div>
    </div>
  );
};
