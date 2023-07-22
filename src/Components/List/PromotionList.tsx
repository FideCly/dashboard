import { useEffect, useState } from 'react';
import { IPromotions } from '@/Models/Promotions';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getSession } from 'next-auth/react';
import { IUser } from '@/Models/User';
import { Table } from 'flowbite-react';
import Link from 'next/link';

export default function PromotionList() {
  const [promotions, setPromotions] = useState<IPromotions[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

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
        console.log(data);
      } catch (error) {
        console.error(error);
        setError(true);
      }
      setIsLoading(false);
    };
    loadPromotions();
  }, []);

  if (isLoading) {
    return <div>loading....</div>;
  }

  if (error) {
    return (
      <div>
        <span>Erreur lors du chargement de promotions</span>
      </div>
    );
  }

  return (
    <Table striped className="table w-full ">
      <Table.Head>
        <Table.HeadCell>Name</Table.HeadCell>
        <Table.HeadCell>Description</Table.HeadCell>
        <Table.HeadCell>Checkout Limit</Table.HeadCell>
        <Table.HeadCell>Shop Id</Table.HeadCell>
        <Table.HeadCell>Start At</Table.HeadCell>
        <Table.HeadCell>End At</Table.HeadCell>
        <Table.HeadCell>Actions</Table.HeadCell>
      </Table.Head>
      <Table.Body className="divide-y">
        {promotions?.map((promotion) => (
          <Table.Row
            className=" dark:border-gray-700 dark:bg-gray-800"
            key={promotion.name}
          >
            <Table.Cell>{promotion.name}</Table.Cell>
            <Table.Cell>{promotion.description}</Table.Cell>
            <Table.Cell>{promotion.checkoutLimit}</Table.Cell>
            <Table.Cell>{promotion.shopId}</Table.Cell>
            <Table.Cell>{promotion.startAt?.toString()}</Table.Cell>
            <Table.Cell>{promotion.endAt.toString()}</Table.Cell>
            <Table.Cell className="space-x-2">
              <Link href={`/promotion/${promotion.id}/edit`}>
                <FontAwesomeIcon icon={faEdit} />
              </Link>
              <Link href="">
                <FontAwesomeIcon icon={faTrash} />
              </Link>
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
}
