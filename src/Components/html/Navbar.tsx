import {
  faEnvelope,
  faGear,
  faHouse,
  faQrcode,
  faRectangleAd
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'
export default function Navbar (): JSX.Element {
  return (
    <nav className="bg-[#69B578] border-gray-200 px-2 sm:px-4 py-2.5 dark:bg-gray-900">
      <div className="container flex flex-wrap items-center justify-between mx-auto">
        <a href="" className="flex items-center">
          <img src="" alt="logo" className="h-6 mr-1 sm:h-9" />
          <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
            FideCly
          </span>
        </a>
        <div className="flex md:order-2">
          <ul className="flex flex-col p-4 mt-4 border border-gray-100 rounded-lg md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
              <Link className="nav-link" to="/">
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
              <Link className="nav-link" to="/mailing">
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
              <Link className="nav-link" to="scan">
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
              <Link className="nav-link" to="/promotion">
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
              <Link className="nav-link" to="/settings">
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
              <Link className="nav-link" to="/signup">
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
