import { useEffect, useState } from 'react';
import { ICampaign } from '@/Models/Campaign';
import { IUser } from '@/Models/User';
import Link from 'next/link';
import { toast } from 'react-toastify';

export default function CampaignList() {
  const [campaigns, setCampaigns] = useState<ICampaign[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  // get campaigns by campaign id
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
    const loadCampaigns = async (): Promise<void> => {
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
          `/api/shop/${user.shop.id}/campaigns`,
          options,
        );
        const data = await response.json();
        setCampaigns(data);
      } catch (error) {
        setError(true);
      }
      setIsLoading(false);
    };
    loadCampaigns();
  }, []);

  if (isLoading) {
    return <div>Chargement....</div>;
  }

  function deletecampaign(id: number): void {
    fetch(`/api/campaign/${id}`, {
      method: 'DELETE',
    }).then((res) => {
      if (res.status >= 400) {
        throw new Error('Bad response from server');
      }
      return res.json();
    });
  }

  async function sendCampaign(campaigns: ICampaign): Promise<void> {
    const toastid = toast.loading('Envoi en cours');
    const response = await fetch(`/api/campaign/${campaigns.id}/send`, {
      method: 'POST',
      body: JSON.stringify(campaigns),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (response.status >= 400) {
      const res = await response.json();
      toast.update(toastid, {
        render: `Erreur lors de l\'envoi: ${res.message}`,
        hideProgressBar: true,
        autoClose: 2000,
        isLoading: false,
        type: 'error',
      });
    } else {
      toast.update(toastid, {
        render: 'Envoi réussi',
        hideProgressBar: true,
        autoClose: 2000,
        isLoading: false,
        type: 'success',
      });
    }
  }

  return (
    <div className="flow-root mt-8">
      <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
          <table className="min-w-full">
            <thead className="bg-white">
              <tr>
                <th
                  scope="col"
                  className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-3"
                >
                  Sujet
                </th>
                <th
                  scope="col"
                  className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                >
                  Promotion
                </th>
                <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-3">
                  <span className="sr-only">Send</span>
                </th>
                <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-3">
                  <span className="sr-only">Edit</span>
                </th>
                <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-3">
                  <span className="sr-only">Delete</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {error && (
                <div>
                  <span>Erreur lors du chargement des campagnes</span>
                </div>
              )}
              {!error &&
                campaigns.map((campaign) => (
                  <tr key={campaign.id} className="border-t border-gray-300">
                    <td className="py-4 pl-4 pr-3 text-sm font-medium text-gray-900 whitespace-nowrap sm:pl-3">
                      {campaign.subject}
                    </td>
                    <td className="px-3 py-4 text-sm text-gray-500 whitespace-nowrap">
                      {campaign.promotionId}
                    </td>
                    <td className="relative py-4 pl-3 pr-4 text-sm font-medium text-right whitespace-nowrap sm:pr-3">
                      <button
                        className="text-fidgreen hover:text-fidgreen/80 hover:underline"
                        onClick={() => sendCampaign(campaign)}
                      >
                        Envoyer
                      </button>
                    </td>
                    <td className="relative py-4 pl-3 pr-4 text-sm font-medium text-right whitespace-nowrap sm:pr-3">
                      <Link
                        href={`/campaign/${campaign.id}/edit`}
                        className="text-fidgreen hover:text-fidgreen/80 hover:underline"
                      >
                        Modifier
                      </Link>
                    </td>
                    <td className="relative py-4 pl-3 pr-4 text-sm font-medium text-right whitespace-nowrap sm:pr-3">
                      <button
                        className="text-fidgreen hover:text-fidgreen/80 hover:underline"
                        onClick={() => deletecampaign(campaign.id)}
                      >
                        Supprimer
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
