import Navbare from '@/Components/html/Navbar';
import Sidebar from '@/Components/html/Sidebar';
import React, { useState } from 'react';
import { QrReader } from 'react-qr-reader';

export default function Scanner () {
  const [data, setData] = useState('No result');
  const [promotion, setPromotion] = useState<any>([]);

  const [promotionID, setPromotionID] = useState<any>([]);

  //get promotion server side
  


const handleConstraints = () => {
  return {
    facingMode: 'environment',
  };
};

return (
  <div className="max-w-2xl mt-4 ">
    <div className="flex">
      <h1 className="flex-1 text-4xl">Scanner</h1>
    </div>
    <div>
      {/* select with the promotion */}
      <select
        className="w-full h-10 px-3 text-base placeholder-gray-600 border rounded-lg appearance-none focus:shadow-outline"
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
      </select>

      <QrReader
        onResult={(result, error) => {
          if (result) {
            setData(result.getText());
            BalanceServices.checkout(result.getText())
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

Scanner.getLayout = function getLayout (page) {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <Navbare />
        {page}
      </div>
    </div>
  );
};

