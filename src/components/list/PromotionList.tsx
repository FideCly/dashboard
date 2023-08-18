import { Fragment, useEffect } from 'react';
import Link from 'next/link';
import { toast } from 'react-toastify';
import { errorCode } from '@/translation';
import { DateTime } from 'luxon';

export default function PromotionList({
  promotions,
  setPromotions,
  isLoading,
  error,
}) {
  const activesPromotions = promotions.filter((p) => p.isActive);
  const inactivesPromotions = promotions.filter((p) => p.isActive === false);

  const deletePromotion = async (id: number): Promise<void> => {
    const toastid = toast.loading('Vérification en cours...');
    const response = await fetch(`/api/promotions/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const body = await response.json();
    if (response.status >= 400) {
      toast.update(toastid, {
        render: `${
          errorCode[response.status][body.message] ||
          errorCode[response.status][body.error]
        }`,
        type: 'error',
        autoClose: 2000,
        isLoading: false,
      });
    } else {
      toast.update(toastid, {
        render: `${
          errorCode[response.status][body.message] ||
          errorCode[response.status][response.statusText]
        }`,
        type: 'success',
        autoClose: 2000,
        isLoading: false,
      });
      setPromotions(promotions.filter((promotion) => promotion.id !== id));
    }
  };

  useEffect(() => {}, []);

  return (
    <div className="flow-root mt-8 rounded-lg bg-fidbg">
      <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
          <table className="min-w-full">
            <thead className="bg-fidbg">
              <tr>
                <th
                  scope="col"
                  className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-3"
                >
                  Nom
                </th>
                <th
                  scope="col"
                  className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                >
                  Description
                </th>
                <th
                  scope="col"
                  className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                >
                  Limite de passage
                </th>
                <th
                  scope="col"
                  className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                >
                  Date de début
                </th>
                <th
                  scope="col"
                  className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                >
                  Date de fin
                </th>
                <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-3">
                  <span className="sr-only">Edit</span>
                </th>
                <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-3">
                  <span className="sr-only">Delete</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-fidbg">
              {isLoading && (
                <tr className="border-t border-gray-300">
                  <td className="py-4 pl-4 pr-3 text-sm mx-auto justify-center font-medium text-gray-900 whitespace-nowrap sm:pl-3 w-1/7">
                    <div className="animate-pulse flex space-x-4">
                      <div className="h-2 bg-gray-200 rounded w-full"></div>
                    </div>
                  </td>
                  <td className="py-4 pl-4 pr-3 text-sm mx-auto justify-center font-medium text-gray-900 whitespace-nowrap sm:pl-3 w-1/7">
                    <div className="animate-pulse flex space-x-4 w-full">
                      <div className="h-2 bg-gray-200 rounded w-full"></div>
                    </div>
                  </td>
                  <td className="py-4 pl-4 pr-3 text-sm mx-auto justify-center font-medium text-gray-900 whitespace-nowrap sm:pl-3 w-1/7">
                    <div className="animate-pulse flex space-x-4 w-full">
                      <div className="h-2 bg-gray-200 rounded w-full"></div>
                    </div>
                  </td>
                  <td className="py-4 pl-4 pr-3 text-sm mx-auto justify-center font-medium text-gray-900 whitespace-nowrap sm:pl-3 w-1/7">
                    <div className="animate-pulse flex space-x-4 w-full">
                      <div className="h-2 bg-gray-200 rounded w-full"></div>
                    </div>
                  </td>
                  <td className="py-4 pl-4 pr-3 text-sm mx-auto justify-center font-medium text-gray-900 whitespace-nowrap sm:pl-3 w-1/7">
                    <div className="animate-pulse flex space-x-4 w-full">
                      <div className="h-2 bg-gray-200 rounded w-full"></div>
                    </div>
                  </td>
                  <td className="py-4 pl-4 pr-3 text-sm mx-auto justify-center font-medium text-gray-900 whitespace-nowrap sm:pl-3 w-1/7">
                    <div className="animate-pulse flex space-x-4 w-full">
                      <div className="h-2 bg-gray-200 rounded w-full"></div>
                    </div>
                  </td>
                  <td className="py-4 pl-4 pr-3 text-sm mx-auto justify-center font-medium text-gray-900 whitespace-nowrap sm:pl-3 w-1/7">
                    <div className="animate-pulse flex space-x-4 w-full">
                      <div className="h-2 bg-gray-200 rounded w-full"></div>
                    </div>
                  </td>
                </tr>
              )}
              {!isLoading && error && (
                <div>
                  <td
                    className="py-4 pl-4 pr-3 text-sm mx-auto justify-center font-medium text-gray-900 whitespace-nowrap sm:pl-3"
                    colSpan={7}
                  >
                    Error lors du chargement des promotions
                  </td>
                </div>
              )}
              {!isLoading && !error && (
                <>
                  {activesPromotions.length > 0 && (
                    <Fragment key="Actives">
                      <tr className="border-t border-gray-200">
                        <th
                          colSpan={7}
                          scope="colgroup"
                          className="py-2 pl-4 pr-3 text-sm font-semibold text-left text-gray-900 bg-white sm:pl-3"
                        >
                          Actives
                        </th>
                      </tr>
                      {activesPromotions.map((promotion) => (
                        <tr
                          key={promotion.id}
                          className="border-t border-gray-300"
                        >
                          <td className="py-4 pl-4 pr-3 text-sm font-medium text-gray-900 whitespace-nowrap sm:pl-3">
                            {promotion.name}
                          </td>
                          <td className="px-3 py-4 text-sm text-gray-500 whitespace-nowrap">
                            {promotion.description}
                          </td>
                          <td className="px-3 py-4 text-sm text-gray-500 whitespace-nowrap">
                            {promotion.checkoutLimit}
                          </td>
                          <td className="px-3 py-4 text-sm text-gray-500 whitespace-nowrap capitalize">
                            {DateTime.fromISO(promotion.startAt)
                              .setLocale('fr')
                              .toFormat('DDDD')}
                          </td>
                          <td className="px-3 py-4 text-sm text-gray-500 whitespace-nowrap capitalize">
                            {DateTime.fromISO(promotion.endAt)
                              .setLocale('fr')
                              .toFormat('DDDD')}
                          </td>
                          <td className="relative py-4 pl-3 pr-4 text-sm font-medium text-right whitespace-nowrap sm:pr-3">
                            <Link
                              href={`/promotion/${promotion.id}/edit`}
                              className="text-fidgreen hover:text-fidgreen/80 hover:underline"
                            >
                              Modifier
                              <span className="sr-only">{promotion.name}</span>
                            </Link>
                          </td>
                          <td className="relative py-4 pl-3 pr-4 text-sm font-medium text-right whitespace-nowrap sm:pr-3">
                            <button
                              onClick={() => deletePromotion(promotion.id)}
                              className="text-fidgreen hover:text-fidgreen/80 hover:underline"
                            >
                              Supprimer
                            </button>
                          </td>
                        </tr>
                      ))}
                    </Fragment>
                  )}
                  {inactivesPromotions.length > 0 && (
                    <Fragment key="Inactives">
                      <tr className="border-t border-gray-200">
                        <th
                          colSpan={7}
                          scope="colgroup"
                          className="py-2 pl-4 pr-3 text-sm font-semibold text-left text-gray-900 bg-white sm:pl-3"
                        >
                          Inactives
                        </th>
                      </tr>
                      {inactivesPromotions.map((promotion) => (
                        <tr
                          key={promotion.id}
                          className="border-t border-gray-300"
                        >
                          <td className="py-4 pl-4 pr-3 text-sm font-medium text-gray-900 whitespace-nowrap sm:pl-3">
                            {promotion.name}
                          </td>
                          <td className="px-3 py-4 text-sm text-gray-500 whitespace-nowrap">
                            {promotion.description}
                          </td>
                          <td className="px-3 py-4 text-sm text-gray-500 whitespace-nowrap">
                            {promotion.checkoutLimit}
                          </td>
                          <td className="px-3 py-4 text-sm text-gray-500 whitespace-nowrap">
                            {DateTime.fromISO(promotion.startAt)
                              .setLocale('fr')
                              .toFormat('DDDD')}
                          </td>
                          <td className="px-3 py-4 text-sm text-gray-500 whitespace-nowrap">
                            {DateTime.fromISO(promotion.endAt)
                              .setLocale('fr')
                              .toFormat('DDDD')}
                          </td>
                          <td className="relative py-4 pl-3 pr-4 text-sm font-medium text-right whitespace-nowrap sm:pr-3">
                            <Link
                              href={`/promotion/${promotion.id}/edit`}
                              className="text-fidgreen hover:text-fidgreen/80 hover:underline"
                            >
                              Modifier
                              <span className="sr-only">{promotion.name}</span>
                            </Link>
                          </td>
                          <td className="relative py-4 pl-3 pr-4 text-sm font-medium text-right whitespace-nowrap sm:pr-3">
                            <button
                              onClick={() => deletePromotion(promotion.id)}
                              className="text-fidgreen hover:text-fidgreen/80 hover:underline"
                            >
                              Supprimer
                            </button>
                          </td>
                        </tr>
                      ))}
                    </Fragment>
                  )}
                </>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
