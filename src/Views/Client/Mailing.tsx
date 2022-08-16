import { faPlusSquare } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Emailform from "../../Components/form/EmailForm";
import { useState } from "react";
export default function Mailing() {
  const [isShown, setIsShown] = useState(false);
  const handleClick = (envent) => {
    setIsShown((current) => !current);
  };
  return (
    <div className="max-w-2xl mt-4 container mx-auto">
      <div className="flex">
        <h1 className="text-4xl flex-1">Mailing</h1>
        <button
          type="button"
          onClick={handleClick}
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          <FontAwesomeIcon icon={faPlusSquare} />
          Create Campagne
        </button>
      </div>
      {isShown && <Emailform />}
    </div>
  );
}
