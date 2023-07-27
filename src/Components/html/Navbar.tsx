import { faRightToBracket } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Avatar, TextInput } from 'flowbite-react';
import { signOut } from 'next-auth/react';
import Link from 'next/link';

export default function Navbare() {
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
        onClick={() => signOut()}
        className="items-center p-4 bg-green-200 rounded-full"
        id="logout"
      >
        <FontAwesomeIcon icon={faRightToBracket} />
      </button>
    </nav>
  );
}
