import { useEffect, useState } from 'react';
import { IUser } from '@/Models/User';
import { deleteCookie } from 'cookies-next';
import { useRouter } from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightToBracket } from '@fortawesome/free-solid-svg-icons';

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
    <div className="sticky top-0 z-40 w-full lg:mx-auto lg:px-8">
      <div className="flex items-center h-16 px-4 border-b border-gray-200 shadow-sm gap-x-4 sm:gap-x-6 sm:px-6 lg:px-0 lg:shadow-none">
        <div className="flex self-stretch gap-x-4 lg:gap-x-6">
          <div className="flex items-center gap-x-4 lg:gap-x-6 ">
            <div className="flex items-center "></div>
            <div className="flex-1 lg:block lg:h-6 lg:w-px"></div>
            <div className="flex items-center justify-between p-2 text-white gap-x-4">
              <span className="flex-1 ml-4 text-sm font-semibold leading-6 text-gray-900">
                {user?.username}
              </span>
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
              >
                <FontAwesomeIcon icon={faRightToBracket} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
