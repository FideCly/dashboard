import Navbare from '@/Components/html/Navbar';
import Sidebar from '@/Components/html/Sidebar';
import { Select } from 'flowbite-react';
import { getSession } from 'next-auth/react';
import React, { useState } from 'react';
import { QrReader } from 'react-qr-reader';

export default function Scanner() {
  const [data, setData] = useState('No result');
  const [promotion, setPromotion] = useState<any>([]);
  const [promotionID, setPromotionID] = useState<any>([]);
  const [error, setError] = useState(false);

  //get promotion server side
  const handleConstraints = () => {
    return {
      facingMode: 'environment',
    };
  };

  React.useEffect(() => {
    const loadPromotions = async (): Promise<void> => {
      try {
        const session = await getSession();
        const user = await fetch(`/api/user/${session?.user?.email}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const data = await user.json();
        const response = await fetch(`/api/shop/${data.shop.id}/promotion`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        console.log(response);
        if (response.status >= 400) {
          throw new Error('Bad response from server');
        }
        const dataPromotion = await response.json();
        setPromotion(dataPromotion);
      } catch (error) {
        setError(true);
      }
    };
    void loadPromotions();
  }, []);

  return (
    <div className="flex-1">
      <div className="flex">
        <h1 className="flex-1 text-4xl">Scanner</h1>
      </div>
      <div>
        <Select
          className=""
          name="promotion"
          id="promotion"
          onChange={(e) => {
            setPromotionID(e.target.value);
          }}
        >
          {promotion.map((item: any) => {
            return (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            );
          })}
        </Select>

        <QrReader
          onResult={(result, error) => {
            if (result) {
              setData(result.getText());
              fetch(`/api/promotion/${data}/checkout`, {
                method: 'POST',
              })
                .then((response) => {
                  console.log(response);
                })
                .catch((e) => {
                  console.log(e);
                });
            }
            if (error) {
              console.log(error);
            }
          }}
          constraints={handleConstraints()}
        />
        {data?.length > 0 && (
          <div>
            <p>{data}</p>
          </div>
        )}
      </div>
    </div>
  );
}

Scanner.getLayout = function getLayout(page) {
  return (
    <div className="flex">
      <Sidebar />
      <div className="p-4 sm:ml-64">
        <Navbare />
        {page}
      </div>
    </div>
  );
};
