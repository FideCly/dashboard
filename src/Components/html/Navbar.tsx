import {
  faEnvelope,
  faGear,
  faHouse,
  faQrcode,
  faRectangleAd
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'
import logo from '../../assets/logo.png'
export default function Navbar (): JSX.Element {
  return (
    <nav className="bg-[#69B578] border-gray-200 px-2 sm:px-4 py-2.5 dark:bg-gray-900 min-h-screen min-w-max">
      <div className="container flex flex-col justify-between mx-auto tems-center -flex-wrap">
        <a href="" className="flex items-center">
          <img src={logo} alt="logo" className="" />
        </a>
        <div className="flex">
          <ul className="flex flex-col">
            <li>
              <Link className="flex nav-link" to="/" >
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
              <Link className="flex nav-link" to="/mailing">
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
              <Link className="flex nav-link" to="scan">
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
              <Link className="flex nav-link" to="/promotion">
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
              <Link className="flex nav-link" to="/settings">
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
              <Link className="flex nav-link" to="/signup">
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
