import {
  faChartLine,
  faChevronRight,
  faEnvelope,
  faGear,
  faQrcode,
  faTags,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import Image from 'next/image';

export default function Sidebar() {
  return (
    <div className="py-4 bg-fidgreen sticky inset-y-0 z-50">
      <Image
        src="/logo_vertical.svg"
        width={150}
        height={100}
        className="rounded m-auto"
        alt="logo"
      />
      <ul className="flex flex-col space-y-4 pt-10">
        <li className="hover:bg-fidyellow px-6 py-1">
          <Link
            href="/scanner"
            className="flex items-center justify-between p-2 gap-x-4 text-white"
          >
            <div className="flex gap-x-6 items-center">
              <FontAwesomeIcon icon={faQrcode} />
              <span className="whitespace-nowrap">Scanner</span>
            </div>
            <FontAwesomeIcon icon={faChevronRight} />
          </Link>
        </li>
        <li className="hover:bg-fidyellow px-6 py-1">
          <Link
            href="/"
            className="flex items-center p-2 justify-between gap-x-4 text-white"
          >
            <div className="flex gap-x-6 items-center">
              <FontAwesomeIcon icon={faChartLine} />
              <span className="whitespace-nowrap">Tableau de bord</span>
            </div>
            <FontAwesomeIcon icon={faChevronRight} />
          </Link>
        </li>
        <li className="hover:bg-fidyellow px-6 py-1">
          <Link
            href="/promotion"
            className="flex items-center p-2 gap-x-4 justify-between text-white"
          >
            <div className="flex gap-x-6 items-center">
              <FontAwesomeIcon icon={faTags} />
              <span className="whitespace-nowrap">Promotions</span>
            </div>
            <FontAwesomeIcon icon={faChevronRight} />
          </Link>
        </li>
        <li className="hover:bg-fidyellow px-6 py-1">
          <Link
            href="/campagne"
            className="flex items-center p-2 gap-x-10 justify-between text-white"
          >
            <div className="flex gap-x-6 items-center">
              <FontAwesomeIcon icon={faEnvelope} />
              <span className="whitespace-nowrap">Campagnes marketing</span>
            </div>
            <FontAwesomeIcon icon={faChevronRight} />
          </Link>
        </li>
        <li className="hover:bg-fidyellow px-6 py-1">
          <Link
            href="/settings"
            className="flex items-center p-2 gap-x-4 justify-between text-white"
          >
            <div className="flex gap-x-6 items-center">
              <FontAwesomeIcon icon={faGear} />
              <span className="whitespace-nowrap">Réglages</span>
            </div>
            <FontAwesomeIcon icon={faChevronRight} />
          </Link>
        </li>
        <li>
          <div className="flex items-center p-2 gap-x-4 justify-between text-white"></div>
        </li>
      </ul>
    </div>
  );
}
