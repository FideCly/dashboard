import {
  faEnvelope,
  faGear,
  faHouse,
  faQrcode,
  faRectangleAd
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'
import Image from 'next/image'

export default function Navbar () {
  return (
    <nav className="  px-2 sm:px-4 py-2.5">
      <div className="container flex flex-wrap items-center justify-between mx-auhref">
        <a href="" className="flex items-center">
          <Image src="/logo.png" alt='logo' width={50} height={50} />
          <span className="self-center text-xl font-semibold whitespace-nowrap ">
            FideCly
          </span>
        </a>
        <div className="flex md:order-2">
          <ul className="flex flex-col p-4 mt-4 border border-gray-100 rounded-lg md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0">
            <li>
              <Link className="flex" href="/">
                <FontAwesomeIcon icon={faHouse} />
                <span
                  className="hidden py-2 pl-3 pr-4 text-white bg-blue-700 rounded lg:block md:bg-transparent md:text-blue-700 md:p-0 dark:text-white"
                  aria-current="page"
                >
                  Dashboard
                </span>
              </Link>
            </li>
            <li>
              <Link className="flex" href="/campaing">
                <FontAwesomeIcon icon={faEnvelope} />
                <span
                  className="hidden py-2 pl-3 pr-4 text-white bg-blue-700 rounded lg:block md:bg-transparent md:text-blue-700 md:p-0 dark:text-white"
                  aria-current="page"
                >
                  Mailing
                </span>
              </Link>
            </li>
            
            <li>
              <Link className="flex" href="/scan">
                <FontAwesomeIcon icon={faQrcode} />
                <span
                  className="hidden py-2 pl-3 pr-4 text-white bg-blue-700 rounded lg:block md:bg-transparent md:text-blue-700 md:p-0 dark:text-white"
                  aria-current="page"
                >
                  Scanner
                </span>
              </Link>
            </li>
            <li>
              <Link className="flex" href="/promotion">
                <FontAwesomeIcon icon={faRectangleAd} />
                <span
                  className="hidden py-2 pl-3 pr-4 text-white bg-blue-700 rounded lg:block md:bg-transparent md:text-blue-700 md:p-0 dark:text-white"
                  aria-current="page"
                >
                  Promotion
                </span>
              </Link>
            </li>
            <li>
              <Link className="flex" href="/settings">
                <FontAwesomeIcon icon={faGear} />
                <span
                  className="hidden py-2 pl-3 pr-4 text-white bg-blue-700 rounded lg:block md:bg-transparent md:text-blue-700 md:p-0 dark:text-white"
                  aria-current="page"
                >
                  Settings
                </span>
              </Link>
            </li>
            <li>
              <Link className="flex" href="/auth/signup">
                <FontAwesomeIcon icon={faGear} />
                <span
                  className="hidden py-2 pl-3 pr-4 text-white bg-blue-700 rounded lg:block md:bg-transparent md:text-blue-700 md:p-0 dark:text-white"
                  aria-current="page"
                >
                  Signup
                </span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}
