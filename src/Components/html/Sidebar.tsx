import {
   faBarcode,
  faChartPie,
  faEnvelope,
  faGear,
  faHouse,
  faMoon,
  faQrcode,
  faRectangleAd,
  faRightToBracket,
  faShop,
  faSun,
  
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'
import Image from 'next/image'
import { signOut } from "next-auth/react"
import { useTheme } from 'next-themes'

export function darkMode (){
  
}

export default function Sidebar () {
  const {systemTheme,theme, setTheme} = useTheme ();
  const currentTheme = theme === 'system' ? systemTheme : theme;
 return (
 <aside id="logo-sidebar" className="w-64 h-screen text-white" aria-label="Sidebar">
   <div className="h-full px-3 py-4 overflow-y-auto text-white bg-green-400 dark:bg-green-800">
      <p className="flex items-center pl-2.5 mb-5">
          <Image src="/logo.png" width={40} height={40} className="h-6 mr-3 sm:h-7" alt="logo" />
         <span className="self-center flex-1 text-xl font-semibold whitespace-nowrap dark:text-white">Fidecly</span>
         <button className="block py-2 pl-3 pr-4 rounded md:p-0" onClick={() => theme == "dark"? setTheme('light'): setTheme("dark")}>
              { theme==="dark"? <span>light</span>: <span>dark</span> }
              </button>
      </p>
      <ul className="space-y-2 font-bold ">
         <li>
            <Link  href="/" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
            <FontAwesomeIcon icon={faChartPie} />
               <span className="ml-3">Tableau de bord</span>
            </Link>
         </li>
         <li>
            <Link href="/scanner" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
            <FontAwesomeIcon icon={faBarcode} />
               <span className="flex-1 ml-3 whitespace-nowrap">Scanner</span>
            </Link>
         </li>
         <li>
            <Link href="/campaign" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
            <FontAwesomeIcon icon={faEnvelope} />
               <span className="flex-1 ml-3 whitespace-nowrap">Campagnes d'emails</span>
            </Link>
         </li>
         <li>
            <Link href="/promotion" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
              <FontAwesomeIcon icon={faRectangleAd} />
               <span className="flex-1 ml-3 whitespace-nowrap">Promotions</span>
            </Link>
         </li>
         <li>
            <Link href="/shops" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
            <FontAwesomeIcon icon={faShop} />
               <span className="flex-1 ml-3 whitespace-nowrap">Boutiques</span>
            </Link>
         </li>
         <li>
            <Link href="/settings" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
            <FontAwesomeIcon icon={faGear} />
               <span className="flex-1 ml-3 whitespace-nowrap">Réglages</span>
            </Link>
         </li>
      </ul>
   </div>
</aside>  
 ) 
 }


