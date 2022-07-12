import {
  faChartPie,
  faEnvelope,
  faGear,
  faHouse,
  faQrcode,
  faRectangleAd,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import Search from "./Search";
export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="nav-start">
        <span>FideCly</span>
      </div>
      <ul className="nav-center">
        <li>
          <Link className="nav-link" to="/">
            <FontAwesomeIcon icon={faHouse} />
            <span>Home</span>
          </Link>
        </li>
        <li>
          <Link className="nav-link" to="/analytics">
            <FontAwesomeIcon icon={faChartPie} />
            <span>Analytics</span>
          </Link>
        </li>
        <li>
          <Link className="nav-link" to="/mailing">
            <FontAwesomeIcon icon={faEnvelope} />
            <span>Mailing</span>
          </Link>
        </li>
        <li>
          <Link className="nav-link" to="scan">
            <FontAwesomeIcon icon={faQrcode} />
            <span>Scanner</span>
          </Link>
        </li>
        <li>
          <Link className="nav-link" to="/promotion">
            <FontAwesomeIcon icon={faRectangleAd} />
            <span>Promotion</span>
          </Link>
        </li>
        <li>
          <Link className="nav-link" to="/settings">
            <FontAwesomeIcon icon={faGear} />
            <span>Settings</span>
          </Link>
        </li>
      </ul>
      <div className="nav-end">
        <Search />
        <Link className="nav-link" to="">
          <FontAwesomeIcon icon={faRightFromBracket} />
        </Link>
      </div>
    </nav>
  );
}
