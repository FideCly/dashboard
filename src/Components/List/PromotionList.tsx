import { useEffect, useState } from 'react';
import { IPromotions } from '@/Models/Promotions';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getSession, useSession } from 'next-auth/react';
import { IUser } from '@/Models/User';

export default async function PromotionList() {
  const [user, setUser] = useState<IUser>();
  const [promotions, setPromotions] = useState<IPromotions[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  useSession();
  const session = await getSession();
  useEffect(() => {
    const data = fetch(`/api/user/${session.user?.email}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        res.json();
      })
      .then((res) =>{
        setUser(res);
      })
      .catch((error) => {
        setError(true);
        console.log(error);
      });
    fetch(`/api/shop/${data.shop.id}/promotion`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        res.json();
        setPromotions(res);
      })
      .catch((error) => {
        setError(true);
        console.log(error);
      });
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
    <table className="table w-full" id="PromotionList" data-cy="PromotionList">
      <thead>
        <tr>
          <th>Name</th>
          <th>Description</th>
          <th>Checkout Limit</th>
          <th>Shop Id</th>
          <th>Start At</th>
          <th>End At</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {promotions?.map((promotion) => (
          <tr key={promotion.name}>
            <td>{promotion.name}</td>
            <td>{promotion.description}</td>
            <td>{promotion.checkoutLimit}</td>
            <td>{promotion.shopId}</td>
            <td>{promotion.startAt?.toString()}</td>
            <td>{promotion.endAt.toString()}</td>
            <td className="space-x-2">
              <a href={`/promotion/${promotion.id}/edit`}>
                <FontAwesomeIcon icon={faEdit} />
              </a>
              <a href="">
                <FontAwesomeIcon icon={faTrash} />
              </a>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
