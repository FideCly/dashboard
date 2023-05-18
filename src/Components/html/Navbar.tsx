import { faRightToBracket } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Avatar, TextInput } from 'flowbite-react'
import { signOut } from 'next-auth/react'
import Link from 'next/link'

export default function Navbare () {
    return (
        <nav className="flex items-center p-4 space-x-2 bg-green-100 shadow dark:bg-gray-800">
            <TextInput
                type="text"
                className="flex-1 dark:bg-gray-700 dark:text-white"
                id="name"
                maxLength={50}
                placeholder='Rechercher' />
            <Link href='/me'>
                <Avatar
                    img="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                    rounded={true}
                />
            </Link>
            <button onClick={() => signOut()} className="flex items-center p-4 bg-green-200 rounded-full bg dark:hover:bg-green-500 dark:bg-green-400 hover:bg-green-300" id="logout">
                <FontAwesomeIcon icon={faRightToBracket} />
            </button>
        </nav>
    )
}
