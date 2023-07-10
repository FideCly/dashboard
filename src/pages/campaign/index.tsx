import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import Sidebar from '@/Components/html/Sidebar';
import Navbare from '@/Components/html/Navbar';
import { CampaignCreateForm } from '@/Components/form/Campaing.form';
import CampaignList from '@/Components/List/CampaignList';

export default function Campaign() {
  const [isShown, setIsShown] = useState(false);
  const handleClick = (_envent: any): void => {
    setIsShown((current) => !current);
  };

  return (
    <div className="flex flex-col ">
      <div className="flex flex-1">
        <h1 className="flex-1 text-4xl">Campagnes emails</h1>
        <button
          data-cy="add-promotion"
          id="add-promotion"
          type="button"
          onClick={handleClick}
          className="inline-flex items-center font-medium text-center bg-green-200 rounded-full tet-sm hover:bg-green-300 dark:hover:bg-green-500 dark:bg-green-400"
        >
          <FontAwesomeIcon icon={faPlus} />
        </button>
      </div>
      {isShown && (
        <div>
          <h1>Crée une campagne email</h1>
          <CampaignCreateForm />
        </div>
      )}
      <CampaignList />
    </div>
  );
}

Campaign.getLayout = (page) => (
  <div className="">
    <Sidebar />

    <div className="p-2 sm:ml-64">
      <Navbare />
      {page}
    </div>
  </div>
);
