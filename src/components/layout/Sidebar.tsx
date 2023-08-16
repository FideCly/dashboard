import {
  faChartLine,
  faChevronRight,
  faEnvelope,
  faGear,
  faQrcode,
  faTags,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { IUser } from '@/models/User';
import { useRouter } from 'next/router';
import Link from 'next/link';

function NavLink({ icon, label, href }) {
  const router = useRouter();
  return (
    <div
      className={
        'px-6 py-1 hover:bg-fidyellow ' +
        (router.pathname == href ? 'bg-fidyellow ' : '')
      }
    >
      <Link
        href={href}
        className="flex items-center justify-between p-2 text-white gap-x-4"
      >
        <div className="flex items-center gap-x-6">
          <FontAwesomeIcon icon={icon} />
          <span className="whitespace-nowrap">{label}</span>
        </div>
        <FontAwesomeIcon icon={faChevronRight} />
      </Link>
    </div>
  );
}

export default function Sidebar() {
  const [user, setUser] = useState<IUser>(null);
  const loadUser = async (): Promise<IUser> => {
    const userUuid = localStorage.getItem('userUuid');
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    };
    fetch(`/api/user/${userUuid}`, options)
      .then((response) => response.json())
      .then((data) => setUser(data))
      .catch((error) => console.error(error));
    return user;
  };
  useEffect(() => {
    loadUser();
  }, []);
  return (
    <div className="sticky inset-y-0 z-50 py-4 bg-fidgreen">
      <Image
        src="/logo_vertical.svg"
        width={150}
        height={100}
        className="m-auto rounded"
        alt="logo"
      />
      <nav className="flex flex-col pt-10 space-y-4">
        <NavLink icon={faQrcode} label={'Scanner'} href={'/scanner'} />
        <NavLink icon={faChartLine} label={'Tableau de bord'} href={'/'} />
        <NavLink icon={faTags} label={'Promotions'} href={'/promotion'} />
        <NavLink
          icon={faEnvelope}
          label={'Campagnes marketing'}
          href={'/campaign'}
        />
        <NavLink icon={faGear} label={'Réglages'} href={'/settings'} />
      </nav>
    </div>
  );
}
