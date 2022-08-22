import {
  faEnvelope,
  faGear,
  faHouse,
  faQrcode,
  faRectangleAd,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import Search from "../Search";
import logo from "../../assets/logo.svg";
export default function Navbar() {
  return (
    <nav className="bg-[#69B578] border-gray-200 px-2 sm:px-4 py-2.5 dark:bg-gray-900">
      <div className="container flex flex-wrap justify-between items-center mx-auto">
        <a href="" className="flex items-center">
          <img src={logo} alt="logo" className="mr-1 h-6 sm:h-9" />
          <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
            FideCly
          </span>
        </a>
        <div className="flex md:order-2">
          <div className="hidden relative lg:block ">
            <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none"></div>
            <Search />
          </div>
        </div>
        <ul className="flex flex-col p-4 mt-4  rounded-lg border border-gray-100 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0  dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
          <li>
            <Link className="nav-link" to="/">
              <FontAwesomeIcon icon={faHouse} />
              <span
                className="hidden lg:block py-2 pr-4 pl-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white"
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
                className="hidden lg:block py-2 pr-4 pl-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white"
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
                className="hidden lg:block py-2 pr-4 pl-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white"
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
                className="hidden lg:block py-2 pr-4 pl-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white"
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
                className="hidden lg:block py-2 pr-4 pl-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white"
                aria-current="page"
              >
                Settings
              </span>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
