import {
  faEnvelope,
  faGear,
  faHouse,
  faQrcode,
  faRectangleAd,
  faShop,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'
import Image from 'next/image'

export default function Navbar () {
  return (
<div className="flex flex-col w-64 min-h-screen bg-base-300">
<div className="flex justify-center p-8 align-middle">
<Image src="/logo.png" alt='logo' width={50} height={50} className="w-1/2 p-4 bg-white rounded-lg"/>
</div>
<div className="flex-grow overflow-x-auto overflow-y-auto">
  <ul className="flex flex-col py-4 space-y-1">
  <li className="px-5">
    <div className="flex flex-row h-8">
      <div className="text-sm font-light tracking-wide text-gray-500">Menu</div>
    </div>
  </li>
  <li className="justify-start flex-1 ml-4 border-0 btn btn-ghost hover:border-primary hover:border-l-4">
  <Link className="flex items-center space-x-2" href="/">
    <span className="text-sm tracking-wide truncate">dashboard</span>
  </Link>
  </li>
  <li>
              <Link className="flex" href="/shops">
                <FontAwesomeIcon icon={faShop} />
                <span
                  className="hidden py-2 pl-3 pr-4 text-white bg-blue-700 rounded lg:block md:bg-transparent md:text-blue-700 md:p-0 dark:text-white"
                  aria-current="page"
                >
                  Shops
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
  )
}
