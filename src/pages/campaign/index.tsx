import { useEffect, useState } from 'react';
import Sidebar from '@/components/layout/Sidebar';
import { CampaignCreateForm } from '@/components/form/Campaign.form';
import CampaignList from '@/components/list/CampaignList';
import Navbar from '@/components/layout/Navbar';
import { ICampaign } from '@/models/Campaign';
import { IUser } from '@/models/User';
import { IPromotion } from '@/models/Promotions';

export default function Campaign() {
  const [isShown, setIsShown] = useState(false);
  const [campaigns, setCampaigns] = useState<ICampaign[]>([]);
  const [promotions, setPromotions] = useState<IPromotion[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const loadUser = async (): Promise<IUser> => {
    const userUuid = localStorage.getItem('userUuid');
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      const response = await fetch(`/api/user/${userUuid}`, options);
      const data = await response.json();
      return data;
    } catch (error) {
      setError(true);
    }
  };

  const loadCampaigns = async (): Promise<void> => {
    setIsLoading(true);

    const user = await loadUser();
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      const response = await fetch(
        `/api/shop/${user.shop.id}/campaigns`,
        options,
      );
      const data = await response.json();
      const sortedList: ICampaign[] = data.sort(
        (a, b) => a.updatedAt - b.updatedAt,
      );
      setCampaigns(sortedList);
    } catch (error) {
      setError(true);
    }

    setIsLoading(false);
  };

  const loadPromotions = async (): Promise<void> => {
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const user = await loadUser();
    try {
      const response = await fetch(
        `/api/shop/${user.shop.id}/promotion`,
        options,
      );
      const data = await response.json();
      setPromotions(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleClick = (): void => {
    setIsShown((current) => !current);
  };

  useEffect(() => {
    loadPromotions();
    loadCampaigns();
  }, []);

  return (
    <div className="p-4 sm:p-6 lg:p-8 min-h-screen h-screen">
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
            className="block px-3 py-2 text-sm font-semibold text-center text-white rounded-md shadow-sm bg-fidgreen hover:bg-fidgreen/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fidgreen"
          >
            Ajouter une campagne
          </button>
        </div>
      </div>
      {isShown && (
        <div>
          <CampaignCreateForm
            setShown={setIsShown}
            setCampaigns={setCampaigns}
            campaigns={campaigns}
            promotions={promotions}
          />
        </div>
      )}
      <CampaignList
        campaigns={campaigns}
        setCampaigns={setCampaigns}
        isLoading={isLoading}
        error={error}
      />
    </div>
  );
}

Campaign.getLayout = function getLayout(page) {
  return (
    <div className="w-full bg-fidbg flex min-h-screen">
      <div className=" inset-y-0 z-50 bg-fidgreen min-h-screen">
        <Sidebar />
      </div>
      <div className="w-full min-h-screen">
        <Navbar />
        <main className="min-h-screen">
          <div className="mx-auto min-h-screen">{page}</div>
        </main>
      </div>
    </div>
  );
};
