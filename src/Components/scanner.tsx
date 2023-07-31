import { IScanner } from '@/Models/scanner';
import { Button, Select } from 'flowbite-react';

import React, { useCallback } from 'react';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { QrReader } from 'react-qr-reader';
import { toast } from 'react-toastify';
import { isMobile } from 'react-device-detect';

export default function ScannerForm() {
  const [data, setData] = useState('No result');
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
        throw new Error('Bad response from server');
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
    <form className="flex-1" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex">
        <h1 className="flex-1 text-4xl">Scanner</h1>
      </div>
      <div>
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
      </div>
      <div className="flex flex-col items-center justify-center">
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
          className="w-1/2 rounded rounded-md"
          scanDelay={300}
        />
        <p>{data}</p>
        <Button type="submit" className="btn btn-primary">
          Submit
        </Button>
      </div>
    </form>
  );
}
