import { faRightToBracket } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Avatar, Button, Label, TextInput } from 'flowbite-react'
import { signOut } from 'next-auth/react'
import Link from 'next/link'

export default function Navbare () {
    return (
        <nav className="flex items-center space-x-2 bg-white p-t-4 dark:bg-gray-800">
            <TextInput
                type="text"
                className="flex-1"
                id="name"
                maxLength={50}
                placeholder='Rechercher' />
            <Link href='/me'>
                <Avatar
                    img="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                    rounded={true}
                />
            </Link>
            <button onClick={() => signOut()} className="flex items-center p-4 bg-green-200 rounded-full bg hover:bg-green-300" id="logout">
                <FontAwesomeIcon icon={faRightToBracket} />
            </button>
        </nav>
    )
}
