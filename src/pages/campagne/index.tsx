import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import Sidebar from '@/Components/html/Sidebar';
import Navbare from '@/Components/html/Navbar';
import { CampaignCreateForm } from '@/Components/form/Campaign.form';
import CampaignList from '@/Components/List/CampaignList';
import Navbar from '@/Components/html/Navbar';

export default function Campaign() {
  const [isShown, setIsShown] = useState(false);
  const handleClick = (): void => {
    setIsShown((current) => !current);
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8 bg-white">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-xl font-semibold leading-6 text-gray-900">
            Campagnes marketing
          </h1>
          <p className="mt-2 text-sm text-gray-700">
            Liste des campagnes de votre commerce.
          </p>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <button
            data-cy="add-campaign"
            id="add-campaign"
            type="button"
            onClick={handleClick}
            className="block rounded-md bg-fidgreen px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-fidgreen/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fidgreen"
          >
            Ajouter une campagne
          </button>
        </div>
      </div>
      {isShown && (
        <div>
          <CampaignCreateForm />
        </div>
      )}
      <CampaignList />
    </div>
  );
}

Campaign.getLayout = function getLayout(page) {
  return (
    <div className="relative z-50 flex">
      <Sidebar />
      <div className="w-full">
        <Navbar />
        <main className="py-10 h-screen">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">{page}</div>
        </main>
      </div>
    </div>
  );
};
