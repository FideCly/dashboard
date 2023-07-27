import { useEffect, useState } from 'react';
import { ICampaign } from '@/Models/Campaign';
import { getSession } from 'next-auth/react';
import { IUser } from '@/Models/User';
import { Table } from 'flowbite-react';
import Link from 'next/link';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function CampaignList() {
  const [campaigns, setCampaigns] = useState<ICampaign[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  // get campaigns by campaign id
  const loadUser = async (): Promise<IUser> => {
    const session = await getSession();
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const user = fetch(`/api/user/${session.user.email}`, options)
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
    return <div>loading....</div>;
  }

  if (error) {
    return (
      <div>
        <span>Erreur lors du chargement de Campaigns</span>
      </div>
    );
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

  return (
    <main className="p-4">
      <Table striped className="table w-full ">
        <Table.Head>
          <Table.HeadCell>subject</Table.HeadCell>
          <Table.HeadCell>message</Table.HeadCell>
          <Table.HeadCell></Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {campaigns.map((campaign) => (
            <Table.Row className="" key={campaign.id}>
              <Table.Cell>{campaign.subject}</Table.Cell>
              <Table.Cell>{campaign.textData}</Table.Cell>
              <Table.Cell className="space-x-2">
                <Link href={{ pathname: `/campagne/${campaign.id}/edit` }}>
                  <FontAwesomeIcon icon={faEdit} />
                </Link>
                <button onClick={() => deletecampaign(campaign.id)}>
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </main>
  );
}
