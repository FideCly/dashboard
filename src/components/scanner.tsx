import { IScanner } from '@/models/scanner';
import { Button } from 'flowbite-react';

import React, { useCallback } from 'react';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { QrReader } from 'react-qr-reader';
import { toast } from 'react-toastify';
import { isMobile } from 'react-device-detect';
import { errorCode } from '@/translation';
import { IPromotion } from '@/models/Promotions';
import { ICard } from '@/models/Card';

export default function ScannerForm() {
  const [data, setData] = useState(
    'Scanner un QR Code pour voir apparaître son contenu',
  );
  const [promotion, setPromotion] = useState<IPromotion[]>([]);
  const [cards, setCards] = useState<ICard[]>([]);
  const [isLoading, setLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<IScanner>();
  //get promotion server side
  const handleConstraints = () => {
    // if the device is mobile, use the rear camera
    if (isMobile) {
      return { facingMode: 'environment' };
    }
    // otherwise, use the facing camera
    return { facingMode: 'user' };
  };

  const loadUser = async (): Promise<void> => {
    try {
      setLoading(true);
      const userUuid = localStorage.getItem('userUuid');
      const user = await fetch(`/api/user/${userUuid}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await user.json();
      localStorage.setItem('shopId', data.shop.id);
    } catch (error) {}
  };

  const loadClients = async (): Promise<void> => {
    try {
      const shopId = localStorage.getItem('shopId');
      const response = await fetch(`/api/shop/${shopId}/cards`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const body = await response.json();
      if (response.status >= 400)
        setData('Erreur lors du chargement des utilisateurs');
      else {
        setCards(body);
        setLoading(false);
      }
    } catch (error) {
      setData('Erreur lors du chargement des utilisateurs');
    }
  };

  const loadPromotions = async (): Promise<void> => {
    const shopId = localStorage.getItem('shopId');
    const response = await fetch(
      `/api/shop/${shopId}/promotion?isActive=true`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    if (response.status >= 400) {
      throw new Error('Bad response from server');
    }
    const dataPromotion = await response.json();
    setPromotion(dataPromotion.filter((p) => p.isActive));
  };

  const findUsername = (uuid: string) => {
    const card = cards.find((card) => {
      return card.user.uuid === uuid;
    });

    card
      ? setData(card.user.username)
      : setData('Cet utilisateur ne possède pas de carte chez vous');
  };

  const onSubmit: SubmitHandler<IScanner> = useCallback(async (data) => {
    const toastId = toast.loading('Vérification en cours...');
    const response = await fetch(`/api/checkout`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      // promotionId is a number in the body
      body: JSON.stringify({ ...data, promotionId: +data.promotionId }),
    });
    const body = await response.json();
    if (response.status >= 400) {
      toast.update(toastId, {
        render: `${
          errorCode[response.status][body.message] ??
          (errorCode[response.status][response.statusText] ||
            'Une erreur est survenue')
        }`,
        type: 'error',
        isLoading: false,
        autoClose: 3000,
      });
    } else {
      toast.update(toastId, {
        render: `${
          errorCode[response.status][body.message] ||
          errorCode[response.status][response.statusText]
        }`,
        type: 'success',
        isLoading: false,
        autoClose: 4000,
      });
      setData('Scanner un QR Code pour voir apparaître son contenu');
      setValue('uuid', null);
    }
  }, []);

  React.useEffect(() => {
    loadUser();
    loadPromotions();
    loadClients();
  }, []);

  return (
    <form
      className="grid grid-cols-2 h-full divide-x border-b"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex flex-col justify-center w-full h-full basis-1/2 p-14">
        <h1 className="flex justify-start gap-x-6 items-center text-lg leading-6 font-medium text-gray-600">
          <span className="">1.</span>
          <span className="">Scanner</span>
        </h1>

        {!isLoading ? (
          <div className="flex flex-col gap-4 rounded-lg">
            <QrReader
              onResult={(result) => {
                if (result) {
                  findUsername(result.getText());
                  setValue('uuid', result.getText());
                }
              }}
              constraints={handleConstraints()}
              videoStyle={{ width: '100%', height: '100%' }}
              className="w-full"
              scanDelay={300}
            />
            <p className="mt-2 text-sm font-semibold text-center text-gray-700">
              {data}
            </p>
          </div>
        ) : (
          <div className="grid content-center gap-4">
            <div
              role="status"
              className="flex items-center justify-center h-56 max-w-sm bg-gray-300 rounded-lg animate-pulse dark:bg-gray-700"
            >
              <svg
                className="w-10 h-10 text-gray-200 dark:text-gray-600"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 16 20"
              >
                <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z" />
                <path d="M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2ZM9 13a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-2a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2Zm4 .382a1 1 0 0 1-1.447.894L10 13v-2l1.553-1.276a1 1 0 0 1 1.447.894v2.764Z" />
              </svg>{' '}
            </div>
            <p className="mt-2 text-sm text-center text-gray-700">{data}</p>
          </div>
        )}
      </div>
      <div className="flex flex-col w-full h-full basis-1/2 p-14">
        <h1 className="flex justify-start gap-x-6 items-center text-lg leading-6 font-medium text-gray-600">
          <span className="">2.</span>
          <span className="">Sélectionner la promotion à appliquer</span>
        </h1>

        <div className="grid items-center content-center self-center w-full h-full gap-8">
          <select
            className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-fidgreen focus:border-fidgreen block w-full p-2.5"
            name="promotion"
            id="promotion"
            {...register('promotionId', {
              required: 'Une promotion est requise',
            })}
          >
            <option key="" value="">
              -- Choisissez une option --
            </option>
            {promotion.map((item: any) => {
              return (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              );
            })}
          </select>
          {errors.promotionId && (
            <span className="text-red-600 text-sm">
              {errors.promotionId.message.toString()}
            </span>
          )}

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
