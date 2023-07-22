import { IScanner } from '@/Models/scanner';
import { Button, Select } from 'flowbite-react';
import { getSession } from 'next-auth/react';
import React, { useCallback } from 'react';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { QrReader } from 'react-qr-reader';
import { toast } from 'react-toastify';

export default function ScannerForm() {
  const [data, setData] = useState('No result');
  const [promotion, setPromotion] = useState<any>([]);
  const { register, handleSubmit } = useForm<IScanner>();
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
      const response = await fetch(
        `/api/balance/${data.promotionId}/checkout`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        },
      );
      toast('Checkout done', {
        hideProgressBar: true,
        autoClose: 2000,
        type: 'success',
      });
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
          {...register('userId', { required: true })}
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
          {...register('promotionId', { required: true })}
          onResult={(result, error) => {
            if (result) {
              setData(result.getText());
            }
            if (error) {
              console.log(error);
            }
          }}
          constraints={handleConstraints()}
        />
        <p>{data}</p>
        <Button type="submit" className="btn btn-primary">
          Submit
        </Button>
      </div>
    </form>
  );
}
