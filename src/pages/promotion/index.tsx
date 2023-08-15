import { PromotionCreateForm } from '../../components/form/Promotion.form';
import { useState } from 'react';
import Sidebar from '@/components/html/Sidebar';
import PromotionList from '@/components/List/PromotionList';
import Navbar from '@/components/html/Navbar';

export default function Promotion() {
  const [isShown, setIsShown] = useState(false);
  const handleClick = (): void => {
    setIsShown((current) => !current);
  };

  return (
    <div className="px-4 bg-white sm:px-6 lg:px-8">
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
          <PromotionCreateForm />
        </div>
      )}
      <PromotionList />
    </div>
  );
}

Promotion.getLayout = function getLayout(page) {
  return (
    <div className="relative z-50 flex">
      <Sidebar />
      <div className="w-full">
        <Navbar />
        <main className="h-screen py-10">
          <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">{page}</div>
        </main>
      </div>
    </div>
  );
};
