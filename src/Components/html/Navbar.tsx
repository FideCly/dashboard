import { faRightToBracket } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { deleteCookie } from 'cookies-next';
import { useRouter } from 'next/router';

export default function Navbar() {
  const router = useRouter();
  return (
    <div className="sticky top-0 z-40 w-full lg:mx-auto lg:px-8">
      <div className="flex items-center h-16 px-4 bg-white border-b border-gray-200 shadow-sm gap-x-4 sm:gap-x-6 sm:px-6 lg:px-0 lg:shadow-none">
        <div className="flex self-stretch flex-1 gap-x-4 lg:gap-x-6">
          <form className="relative flex flex-1" action="#" method="GET">
            <label htmlFor="search-field" className="sr-only">
              Search
            </label>
            <svg
              className="absolute inset-y-0 left-0 w-5 h-full text-gray-400 pointer-events-none"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                clipRule="evenodd"
              />
            </svg>
            <input
              id="search-field"
              className="block w-full h-full py-0 pl-8 pr-0 text-gray-900 border-0 placeholder:text-gray-400 focus:ring-0 sm:text-sm"
              placeholder="Search..."
              type="search"
              name="search"
            />
          </form>
          <div className="flex items-center gap-x-4 lg:gap-x-6">
            <div className="lg:block lg:h-6 lg:w-px lg:bg-gray-200"></div>

            <div className="relative">
              {/* <Image
                className="w-8 h-8 rounded-full bg-gray-50"
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt=""
                width={10}
                height={10}
              /> */}
              <span className="ml-4 text-sm font-semibold leading-6 text-gray-900">
                Tim Cook
              </span>
            </div>
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
  );
}
