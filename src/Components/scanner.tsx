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
    const toastId = toast.loading('Checking...');
    const response = await fetch(`/api/checkout`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      // promotionId is a number in the body
      body: JSON.stringify({ ...data, promotionId: +data.promotionId }),
    });
    const res = await response.json();
    if (response.status >= 400) {
      toast.update(toastId, {
        render: `Error while checkout: ${res.message}`,
        type: 'error',
        isLoading: false,
        autoClose: 2000,
      });
    } else {
      toast.update(toastId, {
        render: `Checkout done: ${res.message}`,
        type: 'success',
        isLoading: false,
        autoClose: 2000,
      });
    }
  }, []);

  return (
    <form
      className="flex flex-row bg-white h-2/3 gap-x-8"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex flex-col justify-center w-full h-full p-4 border basis-1/2 bg-fidbg rounded-xl">
        <h1 className="text-xl font-medium leading-6 text-left text-gray-900">
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
          <p className="mt-2 text-sm text-center text-gray-700">{data}</p>
        </div>
      </div>
      <div className="flex flex-col w-full h-full p-4 border basis-1/2 bg-fidbg rounded-xl">
        <h1 className="text-xl font-medium leading-6 text-gray-900">
          2. Sélectionner la promotion à appliquer
        </h1>

        <div className="grid items-center content-center self-center w-full h-full gap-8">
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
            className="w-full p-2 m-auto font-medium rounded-lg text-gray-50 bg-fidgreen hover:bg-fidgreen/80"
          >
            Valider
          </Button>
        </div>
      </div>
    </form>
  );
}
