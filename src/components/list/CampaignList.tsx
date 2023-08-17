import { useEffect, useState } from 'react';
import { ICampaign } from '@/models/Campaign';
import { IUser } from '@/models/User';
import Link from 'next/link';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import { errorCode } from '@/translation';
import moment from 'moment';

export default function CampaignList() {
  const [campaigns, setCampaigns] = useState<ICampaign[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const router = useRouter();

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
    const user = await loadUser();
    setIsLoading(true);
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
      setCampaigns(data);
    } catch (error) {
      setError(true);
    }
    setIsLoading(false);
  };

  async function deletecampaign(id: number): Promise<void> {
    const toastid = toast.loading('Vérification en cours...');
    const response = await fetch(`/api/campaign/${id}`, {
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
        hideProgressBar: true,
        autoClose: 3000,
        isLoading: false,
        type: 'error',
      });
    } else {
      toast.update(toastid, {
        render: `${
          errorCode[response.status][body.message] ||
          errorCode[response.status][response.statusText]
        }`,
        hideProgressBar: true,
        autoClose: 3000,
        isLoading: false,
        type: 'success',
      });
      router.reload();
    }
  }

  async function sendCampaign(campaigns: ICampaign): Promise<void> {
    const toastid = toast.loading('Vérification en cours....');
    const response = await fetch(`/api/campaign/send`, {
      method: 'POST',
      body: JSON.stringify(campaigns),
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
        hideProgressBar: true,
        autoClose: 3000,
        isLoading: false,
        type: 'error',
      });
    } else {
      toast.update(toastid, {
        render: `${errorCode[response.status]['Campaign sent']}`,
        hideProgressBar: true,
        autoClose: 3000,
        isLoading: false,
        type: 'success',
      });
    }
  }

  useEffect(() => {
    loadUser();
    loadCampaigns();
  }, []);

  return (
    <div className="flow-root mt-8 bg-fidbg rounded-lg">
      <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
          <table className="min-w-full">
            <thead className="bg-fidbg">
              <tr>
                <th
                  scope="col"
                  className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-3"
                >
                  Sujet
                </th>
                <th
                  scope="col"
                  className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-3"
                >
                  Date de dernière édition
                </th>
                <th
                  scope="col"
                  className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-3"
                >
                  Date de création
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
            <tbody className="bg-fidbg">
              {isLoading && (
                <tr>
                  <td
                    className="py-4 pl-4 pr-3 text-sm mx-auto justify-center font-medium text-gray-900 whitespace-nowrap sm:pl-3"
                    colSpan={5}
                  >
                    Chargement des campagnes
                  </td>
                </tr>
              )}
              {error && (
                <tr>
                  <td
                    className="py-4 pl-4 pr-3 text-sm mx-auto justify-center font-medium text-gray-900 whitespace-nowrap sm:pl-3"
                    colSpan={5}
                  >
                    Error lors du chargement des campagnes
                  </td>
                </tr>
              )}
              {!error &&
                campaigns.map((campaign) => (
                  <tr key={campaign.id} className="border-t border-gray-300">
                    <td className="py-4 pl-4 pr-3 text-sm font-medium text-gray-900 whitespace-nowrap sm:pl-3">
                      {campaign.subject}
                    </td>
                    <td className="py-4 pl-4 pr-3 text-sm text-gray-500 whitespace-nowrap sm:pl-3">
                      {moment(campaign.updatedAt).format(
                        'dddd, MMMM Do YYYY, h:mm:ss a',
                      )}
                    </td>
                    <td className="py-4 pl-4 pr-3 text-sm text-gray-500 whitespace-nowrap sm:pl-3">
                      {moment(campaign.createdAt).format(
                        'dddd, MMMM Do YYYY, h:mm:ss a',
                      )}
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
