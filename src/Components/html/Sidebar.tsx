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
    <div className="sticky inset-y-0 z-50 py-4 bg-fidgreen">
      <Image
        src="/logo_vertical.svg"
        width={150}
        height={100}
        className="m-auto rounded"
        alt="logo"
      />
      <ul className="flex flex-col pt-10 space-y-4">
        <li className="px-6 py-1 hover:bg-fidyellow">
          <Link
            href="/scanner"
            className="flex items-center justify-between p-2 text-white gap-x-4"
          >
            <div className="flex items-center gap-x-6">
              <FontAwesomeIcon icon={faQrcode} />
              <span className="whitespace-nowrap">Scanner</span>
            </div>
            <FontAwesomeIcon icon={faChevronRight} />
          </Link>
        </li>
        <li className="px-6 py-1 hover:bg-fidyellow">
          <Link
            href="/"
            className="flex items-center justify-between p-2 text-white gap-x-4"
          >
            <div className="flex items-center gap-x-6">
              <FontAwesomeIcon icon={faChartLine} />
              <span className="whitespace-nowrap">Tableau de bord</span>
            </div>
            <FontAwesomeIcon icon={faChevronRight} />
          </Link>
        </li>
        <li className="px-6 py-1 hover:bg-fidyellow">
          <Link
            href="/promotion"
            className="flex items-center justify-between p-2 text-white gap-x-4"
          >
            <div className="flex items-center gap-x-6">
              <FontAwesomeIcon icon={faTags} />
              <span className="whitespace-nowrap">Promotions</span>
            </div>
            <FontAwesomeIcon icon={faChevronRight} />
          </Link>
        </li>
        <li className="px-6 py-1 hover:bg-fidyellow">
          <Link
            href="/campagne"
            className="flex items-center justify-between p-2 text-white gap-x-10"
          >
            <div className="flex items-center gap-x-6">
              <FontAwesomeIcon icon={faEnvelope} />
              <span className="whitespace-nowrap">Campagnes marketing</span>
            </div>
            <FontAwesomeIcon icon={faChevronRight} />
          </Link>
        </li>
        <li className="px-6 py-1 hover:bg-fidyellow">
          <Link
            href="/settings"
            className="flex items-center justify-between p-2 text-white gap-x-4"
          >
            <div className="flex items-center gap-x-6">
              <FontAwesomeIcon icon={faGear} />
              <span className="whitespace-nowrap">Réglages</span>
            </div>
            <FontAwesomeIcon icon={faChevronRight} />
          </Link>
        </li>
        <li>
          <div className="flex items-center justify-between p-2 text-white gap-x-4"></div>
        </li>
      </ul>
    </div>
  );
}
