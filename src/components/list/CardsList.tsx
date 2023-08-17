import { useEffect, useState } from 'react';
import { IUser } from '@/models/User';
import moment from 'moment';
import { errorCode } from '@/translation';

export default function CardsList() {
  const [balances, setBalances] = useState<any[]>([]);
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
  useEffect(() => {
    const loadCards = async (): Promise<void> => {
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
          `/api/shop/${user.shop.id}/cards`,
          options,
        );
        const data = await response.json();
        const list = [];
        data.forEach((c) => {
          c.balances.forEach((b) => {
            list.push({ ...b, username: c.user.username });
          });
        });

        list.sort((a, b) => a.updatedAt - b.updatedAt);
        setBalances(list);
      } catch (error) {
        console.error(error);
        setError(true);
      }

      setIsLoading(false);
    };
    loadCards();
  }, []);

  return (
    <>
      <div className="sm:flex-auto">
        <h1 className="text-xl font-semibold leading-6 text-gray-900">
          Activité récente
        </h1>
        <p className="mt-2 text-sm text-gray-700">
          Liste des promotions de votre commerce.
        </p>
      </div>
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
                    Propriétaire
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Promotion
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Compteur
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Status
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Mise à jour le
                  </th>
                </tr>
              </thead>
              <tbody className="bg-fidbg">
                {isLoading && (
                  <div>
                    <td
                      className="py-4 pl-4 pr-3 text-sm mx-auto justify-center font-medium text-gray-900 whitespace-nowrap sm:pl-3"
                      colSpan={7}
                    >
                      Chargement de l'activité
                    </td>
                  </div>
                )}
                {error && (
                  <div>
                    <td
                      className="py-4 pl-4 pr-3 text-sm mx-auto justify-center font-medium text-gray-900 whitespace-nowrap sm:pl-3"
                      colSpan={7}
                    >
                      Error lors du chargement de l'activité
                    </td>
                  </div>
                )}
                {!error &&
                  balances.map((balance) => (
                    <tr
                      key={balance.username}
                      className="border-t border-gray-300"
                    >
                      <td className="py-4 pl-4 pr-3 text-sm font-medium text-gray-900 whitespace-nowrap sm:pl-3">
                        {balance.username}
                      </td>
                      <td className="px-3 py-4 text-sm text-gray-500 whitespace-nowrap">
                        {balance.promotion.description}
                      </td>
                      <td className="px-3 py-4 text-sm text-gray-500 whitespace-nowrap">
                        {balance.counter}
                      </td>
                      <td className="px-3 py-4 text-sm text-gray-500 whitespace-nowrap">
                        {balance.counter == balance.promotion.checkoutLimit
                          ? errorCode[200]['Promotion limit reached']
                          : errorCode[200]['Balance updated']}
                      </td>
                      <td className="px-3 py-4 text-sm text-gray-500 whitespace-nowrap">
                        {moment(balance.updatedAt).format(
                          'dddd, MMMM Do YYYY, h:mm:ss a',
                        )}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
