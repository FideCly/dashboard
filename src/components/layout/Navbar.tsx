import { useEffect, useState } from 'react';
import { IUser } from '@/models/User';
import { faRightToBracket } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { deleteCookie } from 'cookies-next';
import { useRouter } from 'next/router';
import Link from 'next/link';

function Skeleton() {
  return (
    <>
      <div className="w-full animate-pulse flex items-center space-x-3">
        <svg
          className="w-10 h-10 text-gray-200 dark:text-gray-700"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
        </svg>
        <div>
          <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-32 mb-2"></div>
        </div>
      </div>
      <svg
        className="w-10 h-10 text-gray-200 dark:text-gray-700 animate-pulse"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
      </svg>
    </>
  );
}

export default function Navbar() {
  const router = useRouter();
  const [user, setUser] = useState<IUser>(null);
  const [isLoading, setIsLoading] = useState(false);

  const loadUser = async (): Promise<void> => {
    setIsLoading(true);

    const userUuid = localStorage.getItem('userUuid');
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const response = await fetch(`/api/user/${userUuid}`, options);
    const body = await response.json();
    if (response.status >= 400) {
    } else {
      setUser(body);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadUser();
  }, []);

  return (
    <div className="sticky top-0 z-40 w-full lg:mx-auto lg:px-8 py-2 bg-gray-50 border-b">
      <div className="flex items-center w-full h-fit px-4 border-gray-200 shadow-sm gap-x-4 sm:gap-x-6 sm:px-6 lg:px-0 lg:shadow-none">
        {isLoading ? (
          <Skeleton />
        ) : (
          <>
            <Link
              className=" w-full justify-start items-center flex"
              href="/settings#shop"
            >
              <img
                className="inline-block h-10 w-10 rounded-full"
                src={user?.shop.pictureUrl}
                alt=""
              ></img>
              <span className="flex-1 ml-4 text-2xl font-medium leading-6 text-gray-900 w-fit">
                {user?.shop.companyName}
              </span>
            </Link>
            <Link href="/settings#profile">
              {user?.pictureUrl ? (
                <img
                  className="inline-block h-10 w-10 rounded-full"
                  src={user?.pictureUrl}
                  alt=""
                ></img>
              ) : (
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-gray-500">
                  <span className="font-medium leading-none text-white">
                    {user?.username[0]}
                  </span>
                </span>
              )}
            </Link>
          </>
        )}
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
          className="hover:text-fidgreen"
        >
          <FontAwesomeIcon icon={faRightToBracket} />
        </button>
      </div>
    </div>
  );
}
