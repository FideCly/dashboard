import { useEffect, useState } from 'react';
import type { IShop } from '../../Models/Shop';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Table } from 'flowbite-react';
import Link from 'next/link';
import { IUser } from '@/Models/User';

export default function ShopList() {
  const [shops, setShops] = useState<IShop[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const loadUser = async (): Promise<IUser> => {
    // get user id from localstorage
    const userid = localStorage.getItem('userid');
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const user = fetch(`/api/user/${userid}`, options)
      .then((response) => response.json())
      .catch((error) => console.error(error));
    return user;
  };
  useEffect(() => {
    const loadShops = async (): Promise<void> => {
      try {
        setIsLoading(true);
        const user = await loadUser();
        const response = await fetch(`/api/shop/${user.shop.id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const data = await response.json();
        setShops(data);
      } catch (error) {
        setError(true);
      }
      setIsLoading(false);
    };
    loadShops();
  }, []);

  if (isLoading) {
    return <div>loading....</div>;
  }

  if (error) {
    return (
      <div>
        <span>Erreur lors du chargement de shops</span>
      </div>
    );
  }

  function deleteshop(id: number): void {
    fetch(`/api/shop/${id}`, {
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
          <Table.HeadCell>Company Name</Table.HeadCell>
          <Table.HeadCell>Address</Table.HeadCell>
          <Table.HeadCell>Zip Code</Table.HeadCell>
          <Table.HeadCell>Phone</Table.HeadCell>
          <Table.HeadCell>Email</Table.HeadCell>
          <Table.HeadCell></Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {shops.map((shop) => (
            <Table.Row className="" key={shop.id}>
              <Table.Cell>{shop.companyName}</Table.Cell>
              <Table.Cell>{shop.address}</Table.Cell>
              <Table.Cell>{shop.zipCode}</Table.Cell>
              <Table.Cell>{shop.phone}</Table.Cell>
              <Table.Cell>{shop.email}</Table.Cell>
              <Table.Cell className="space-x-2">
                <Link href={{ pathname: `/shops/${shop.id}` }}>
                  <FontAwesomeIcon icon={faEdit} />
                </Link>
                <button onClick={() => deleteshop(shop.id)}>
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
