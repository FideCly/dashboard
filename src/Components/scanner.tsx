import { IScanner } from '@/Models/scanner';
import { Button, Select } from 'flowbite-react';

import React, { useCallback } from 'react';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { QrReader } from 'react-qr-reader';
import { toast } from 'react-toastify';
import { isMobile } from 'react-device-detect';

export default function ScannerForm() {
  const [data, setData] = useState(
    'Scanner un QR Code pour voir apparaître son contenu',
  );
  const [promotion, setPromotion] = useState<any>([]);
  const { register, handleSubmit, setValue } = useForm<IScanner>();
  //get promotion server side
  const handleConstraints = () => {
    // if the device is mobile, use the rear camera
    if (isMobile) {
      return { facingMode: 'environment' };
    }
    // otherwise, use the facing camera
    return { facingMode: 'user' };
  };

  React.useEffect(() => {
    const loadPromotions = async (): Promise<void> => {
      try {
        const userUuid = localStorage.getItem('userUuid');
        const user = await fetch(`/api/user/${userUuid}`, {
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
        if (response.status >= 400) {
          throw new Error('Bad response from server');
        }
        const dataPromotion = await response.json();
        setPromotion(dataPromotion);
      } catch (error) {
        console.error(error);
      }
    };
    void loadPromotions();
  }, []);

  const onSubmit: SubmitHandler<IScanner> = useCallback(async (data) => {
    try {
      const response = await fetch(`/api/checkout`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        // promotionId is a number in the body
        body: JSON.stringify({ ...data, promotionId: +data.promotionId }),
      });
      if (response.status >= 400) {
        toast('Checkout not done', {
          hideProgressBar: true,
          autoClose: 2000,
          type: 'error',
        });
        const res = await response.json();
        throw new Error(res.message);
      } else {
        toast('Checkout done', {
          hideProgressBar: true,
          autoClose: 2000,
          type: 'success',
        });
      }
    } catch (error) {
      console.error(error);
    }
  }, []);

  return (
    <form
      className="flex flex-row bg-white h-2/3 gap-x-8"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="basis-1/2 w-full h-full shadow-md bg-fidbg flex flex-col p-4 justify-center rounded-xl">
        <h1 className="text-xl text-left font-medium leading-6 text-gray-900">
          1. Scanner
        </h1>

        <div className="grid content-center gap-4">
          <QrReader
            onResult={(result, error) => {
              if (result) {
                setData(result.getText());
                setValue('uuid', result.getText());
              }
              if (error) {
                console.log(error);
              }
            }}
            constraints={handleConstraints()}
            videoStyle={{ width: '100%' }}
            className="w-full rounded-xl"
            scanDelay={300}
          />
          <p className="text-center mt-2 text-sm text-gray-700">{data}</p>
        </div>
      </div>
      <div className="w-full h-full basis-1/2 shadow-md bg-fidbg flex flex-col rounded-xl p-4">
        <h1 className="text-xl font-medium leading-6 text-gray-900">
          2. Sélectionner la promotion à appliquer
        </h1>

        <div className="self-center items-center h-full grid gap-8 content-center w-full">
          <Select
            className=""
            name="promotion"
            id="promotion"
            {...register('promotionId', { required: true })}
          >
            {promotion.map((item: any) => {
              return (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              );
            })}
          </Select>
          <Button
            type="submit"
            className="p-2 w-full m-auto text-gray-50 font-medium rounded-lg bg-fidgreen hover:bg-fidgreen/80"
          >
            Valider
          </Button>
        </div>
      </div>
    </form>
  );
}
