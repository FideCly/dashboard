import { PromotionCreateForm } from '../../components/form/Promotion.form';
import { useEffect, useState } from 'react';
import Sidebar from '@/components/layout/Sidebar';
import PromotionList from '@/components/list/PromotionList';
import Navbar from '@/components/layout/Navbar';
import { IPromotion } from '@/models/Promotions';
import { IUser } from '@/models/User';

export default function Promotion() {
  const [isShown, setIsShown] = useState(false);
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
    const user = fetch(`/api/user/${userUuid}`, options)
      .then((response) => response.json())
      .catch((error) => console.error(error));
    return user;
  };

  const loadPromotions = async (): Promise<void> => {
    setIsLoading(true);

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
      setError(true);
    }

    setIsLoading(false);
  };

  const handleClick = (): void => {
    setIsShown((current) => !current);
  };

  useEffect(() => {
    loadPromotions();
  }, []);

  return (
    <div className="p-4 lg:p-8 min-h-screen">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-xl font-semibold leading-6 text-gray-900">
            Promotions
          </h1>
          <p className="mt-2 text-sm text-gray-700">
            Liste des promotions de votre commerce.
          </p>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <button
            data-cy="add-promotion"
            id="add-promotion"
            type="button"
            onClick={handleClick}
            className="block px-3 py-2 text-sm font-semibold text-center text-white rounded-md shadow-sm bg-fidgreen hover:bg-fidgreen/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fidgreen"
          >
            Ajouter une promotion
          </button>
        </div>
      </div>
      {isShown && (
        <div>
          <PromotionCreateForm
            promotions={promotions}
            setPromotions={setPromotions}
            setShown={setIsShown}
          />
        </div>
      )}
      <PromotionList
        promotions={promotions}
        setPromotions={setPromotions}
        isLoading={isLoading}
        error={error}
      />
    </div>
  );
}

Promotion.getLayout = function getLayout(page) {
  return (
    <div className="w-full bg-fidbg flex">
      <div className=" inset-y-0 z-50 bg-fidgreen">
        <Sidebar />
      </div>
      <div className="w-full">
        <Navbar />
        <main className="">
          <div className="mx-auto">{page}</div>
        </main>
      </div>
    </div>
  );
};
