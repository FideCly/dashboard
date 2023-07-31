import { faRightToBracket } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { deleteCookie } from 'cookies-next';
import { Avatar, TextInput } from 'flowbite-react';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Navbare() {
  const router = useRouter();
  return (
    <nav className="flex content-center w-full space-x-2 ">
      <TextInput
        type="text"
        className="flex-1"
        id="name"
        maxLength={50}
        placeholder="Rechercher"
      />
      <Link href="/me" className="justify-self-start">
        <Avatar
          img="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
          rounded={true}
        />
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
        className="items-center p-4 bg-green-200 rounded-full"
        id="logout"
      >
        <FontAwesomeIcon icon={faRightToBracket} />
      </button>
    </nav>
  );
}
