import { ICampaign } from '@/models/Campaign';
import Link from 'next/link';
import { toast } from 'react-toastify';
import { errorCode } from '@/translation';
import { DateTime } from 'luxon';

export default function CampaignList({
  campaigns,
  setCampaigns,
  isLoading,
  error,
}) {
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
      setCampaigns(campaigns.filter((campaign) => campaign.id !== id));
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
                <tr className="border-t border-gray-300">
                  <td className="py-4 pl-4 pr-3 text-sm mx-auto justify-center font-medium text-gray-900 whitespace-nowrap sm:pl-3 w-1/4">
                    <div className="animate-pulse flex space-x-4">
                      <div className="h-2 bg-gray-200 rounded w-full"></div>
                    </div>
                  </td>
                  <td className="py-4 pl-4 pr-3 text-sm mx-auto justify-center font-medium text-gray-900 whitespace-nowrap sm:pl-3 w-1/5">
                    <div className="animate-pulse flex space-x-4 w-full">
                      <div className="h-2 bg-gray-200 rounded w-full"></div>
                    </div>
                  </td>
                  <td className="py-4 pl-4 pr-3 text-sm mx-auto justify-center font-medium text-gray-900 whitespace-nowrap sm:pl-3 w-1/5">
                    <div className="animate-pulse flex space-x-4 w-full">
                      <div className="h-2 bg-gray-200 rounded w-full"></div>
                    </div>
                  </td>
                  <td className="py-4 pl-4 pr-3 text-sm mx-auto justify-center font-medium text-gray-900 whitespace-nowrap sm:pl-3 w-1/5">
                    <div className="animate-pulse flex space-x-4 w-full">
                      <div className="h-2 bg-gray-200 rounded w-full"></div>
                    </div>
                  </td>
                  <td className="py-4 pl-4 pr-3 text-sm mx-auto justify-center font-medium text-gray-900 whitespace-nowrap sm:pl-3 w-1/5">
                    <div className="animate-pulse flex space-x-4 w-full">
                      <div className="h-2 bg-gray-200 rounded w-full"></div>
                    </div>
                  </td>
                </tr>
              )}
              {!isLoading && error && (
                <tr>
                  <td
                    className="py-4 pl-4 pr-3 text-sm mx-auto justify-center font-medium text-gray-900 whitespace-nowrap sm:pl-3"
                    colSpan={5}
                  >
                    Error lors du chargement des campagnes
                  </td>
                </tr>
              )}
              {!isLoading &&
                !error &&
                campaigns.map((campaign) => (
                  <tr key={campaign.id} className="border-t border-gray-300">
                    <td className="py-4 pl-4 pr-3 text-sm font-medium text-gray-900 whitespace-nowrap sm:pl-3">
                      {campaign.subject}
                    </td>
                    <td className="py-4 pl-4 pr-3 text-sm text-gray-500 whitespace-nowrap sm:pl-3 capitalize">
                      {campaign.updatedAt
                        ? DateTime.fromISO(campaign.updatedAt)
                            .setLocale('fr')
                            .toFormat('DDDD t')
                        : ''}
                    </td>
                    <td className="py-4 pl-4 pr-3 text-sm text-gray-500 whitespace-nowrap sm:pl-3 capitalize">
                      {DateTime.fromISO(campaign.createdAt)
                        .setLocale('fr')
                        .toFormat('DDDD t')}
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
