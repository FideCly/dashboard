import { useEffect, useState } from 'react';
import { IUser } from '@/models/User';
import { faRightToBracket } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { deleteCookie } from 'cookies-next';
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function Navbar() {
  const router = useRouter();
  const [user, setUser] = useState<IUser>(null);
  const loadUser = async (): Promise<IUser> => {
    const userUuid = localStorage.getItem('userUuid');
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    };
    fetch(`/api/user/${userUuid}`, options)
      .then((response) => response.json())
      .then((data) => setUser(data))
      .catch((error) => console.error(error));
    return user;
  };
  useEffect(() => {
    loadUser();
  }, []);
  return (
    <div className="sticky top-0 z-40 w-full lg:mx-auto lg:px-8 py-2 bg-white border-b">
      <div className="flex items-center w-full h-fit px-4 border-gray-200 shadow-sm gap-x-4 sm:gap-x-6 sm:px-6 lg:px-0 lg:shadow-none">
        <Link
          className=" w-full justify-start items-center flex"
          href="/settings#shop"
        >
          {user?.shop.pictureUrl && (
            <img
              className="inline-block h-10 w-10 rounded-full"
              src={user?.shop.pictureUrl}
              alt=""
            ></img>
          )}
          <span className="flex-1 ml-4 text-2xl font-medium leading-6 text-gray-900 w-fit">
            {user?.shop.companyName}
          </span>
        </Link>
        <Link href="/settings#profile">
          {user?.pictureUrl && (
            <img
              className="inline-block h-10 w-10 rounded-full"
              src={user?.pictureUrl}
              alt=""
            ></img>
          )}
          {!user?.pictureUrl && (
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-gray-500">
              <span className="font-medium leading-none text-white">
                {user?.username[0]}
              </span>
            </span>
          )}
        </Link>
        <button
          onClick={() => {
            // delete user id from localstorage
            localStorage.removeItem('userUuid');
            // delete cookie
            deleteCookie('token');
            // return to signin page
            router.push('/auth/signin');
          }}
          id="logout"
          className='hover:text-fidgreen'
        >
          <FontAwesomeIcon icon={faRightToBracket} />
        </button>
      </div>
    </div>
  );
}
