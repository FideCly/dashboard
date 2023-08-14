import React, { useCallback, useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Button, Label, Select, TextInput, Textarea } from 'flowbite-react';
import {
  ICampaignCreatePayload,
  ICampaignUpdatePayload,
} from '@/Models/Campaign';

import { IUser } from '@/Models/User';
import { IPromotion } from '@/Models/Promotions';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';

export const CampaignCreateForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ICampaignCreatePayload>({ mode: 'onChange' });
  // get all shop's promotions
  const [promotions, setPromotions] = useState<IPromotion[]>([]);
  const loadUser = async (): Promise<IUser> => {
    const userUuid = localStorage.getItem('userUuid');
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const user = fetch(`/api/user/${userUuid}`, options)
      .then((response) => response.json())
      .catch((error) => console.error(error));
    return user;
  };
  useEffect(() => {
    const loadCampaigns = async (): Promise<void> => {
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
      } catch (error) {
        console.error(error);
      }
    };
    loadCampaigns();
  }, []);

  const onSubmit: SubmitHandler<ICampaignCreatePayload> = useCallback(
    async (data) => {
      try {
        const toastid = toast.loading('creating campaign...');
        const response = await fetch(`/api/campaign`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          // conserve the number type for the promotionId
          body: JSON.stringify({ ...data, promotionId: +data.promotionId }),
        });
        if (response.status >= 400) {
          const body = await response.json();
          toast.update(toastid, {
            render: `Campaign not created: ${body.message}`,
            type: 'error',
            autoClose: 2000,
            isLoading: false,
          });
        } else {
          toast.update(toastid, {
            render: 'Campaign created',
            type: 'success',
            autoClose: 2000,
            isLoading: false,
          });
          // reload the page to get the new campaign
          window.location.reload();
        }
      } catch (error) {
        console.error(error);
      }
    },
    [],
  );

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      data-cy="campaign-form"
      className="flex flex-col gap-4 p-4 m-4 border rounded-lg bg-fidbg"
    >
      <div className="">
        <Label htmlFor="subject">Nom</Label>
        <TextInput
          {...register('subject', {
            required: 'Le nom de la campagne est requise',
            maxLength: 50,
          })}
          type="text"
          className=""
          id="subject"
          maxLength={50}
          placeholder="subject"
        />
        {errors.subject && (
          <span className="text-sm text-red-600">
            {errors.subject.message.toString()}
          </span>
        )}
      </div>
      <div className="">
        <Label htmlFor="textData">Message</Label>
        <Textarea
          {...register('textData', {
            required: 'Le message est requis',
            maxLength: 50,
          })}
          className=""
          id="textData"
          maxLength={50}
          placeholder="textData"
        />
        {errors.textData && (
          <span className="text-sm text-red-600">
            {errors.textData.message.toString()}
          </span>
        )}
      </div>
      <div className="">
        <Label htmlFor="promotionId">Promotion liée</Label>
        <Select
          {...register('promotionId', {
            required: 'La promotion liée est requise',
            maxLength: 50,
          })}
          className=""
          id="promotionId"
          placeholder="promotionId"
        >
          {promotions?.map((promotion) => (
            <option key={promotion.id} value={promotion.id}>
              {promotion.name}
            </option>
          ))}
        </Select>
        {errors.promotionId && (
          <span className="text-sm text-red-600">
            {errors.promotionId.message.toString()}
          </span>
        )}
      </div>
      <Button
        type="submit"
        className="text-gray-50 w-fit bg-fidgreen hover:bg-fidgreen/80"
      >
        Enregistrer
      </Button>
    </form>
  );
};

export const CampaignUpdateForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<ICampaignUpdatePayload>({ mode: 'onChange' });

  const [promotions, setPromotions] = useState<IPromotion[]>([]);
  const router = useRouter();
  const id = Number(router.query.id);
  const loadUser = async (): Promise<IUser> => {
    const userUuid = localStorage.getItem('userUuid');
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const user = fetch(`/api/user/${userUuid}`, options)
      .then((response) => response.json())
      .catch((error) => console.error(error));
    return user;
  };
  useEffect(() => {
    const loadCampaigns = async (): Promise<void> => {
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
      } catch (error) {
        console.error(error);
      }
    };
    const getCampaign = async (): Promise<void> => {
      try {
        const response = await fetch(`/api/campaign/${id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const data = await response.json(); // Extract JSON data from response
        setValue('id', data.id);
        setValue('shopId', data.shopId);
        setValue('subject', data.subject);
        setValue('textData', data.textData);
        setValue('promotionId', data.promotionId);
      } catch (error) {
        console.log(error);
      }
    };
    if (id) {
      getCampaign();
    }
    loadCampaigns();
  }, []);

  const onSubmit: SubmitHandler<ICampaignUpdatePayload> = useCallback(
    async (data) => {
      try {
        const toastid = toast.loading('updating campaign...');
        const res = await fetch(`/api/campaign/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ ...data, promotionId: +data.promotionId }),
        });
        if (res.status >= 400) {
          // read the response body
          const body = await res.json();
          toast.update(toastid, {
            render: `Campaign not updated: ${body.message}`,
            type: 'error',
            autoClose: 2000,
            isLoading: false,
          });
        } else {
          toast.update(toastid, {
            render: 'Campaign updated',
            type: 'success',
            autoClose: 2000,
            isLoading: false,
          });
          // reload actual page
          router.push('/campagne');
        }
      } catch (error) {
        console.error(error);
      }
    },
    [],
  );

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      data-cy="campaign-form"
      className="flex flex-col gap-4 p-4 m-4 border rounded-lg bg-fidbg"
    >
      <div className="">
        <Label htmlFor="subject">Nom</Label>
        <TextInput
          {...register('subject', {
            required: 'Le nom de la campagne est requise',
            maxLength: 50,
          })}
          type="text"
          className=""
          id="subject"
          maxLength={50}
          placeholder="subject"
        />
        {errors.subject && (
          <span className="text-sm text-red-600">
            {errors.subject.message.toString()}
          </span>
        )}
      </div>
      <div className="">
        <Label htmlFor="textData">Message</Label>
        <Textarea
          {...register('textData', {
            required: 'Le message est requis',
            maxLength: 50,
          })}
          className=""
          id="textData"
          maxLength={50}
          placeholder="textData"
        />
        {errors.textData && (
          <span className="text-sm text-red-600">
            {errors.textData.message.toString()}
          </span>
        )}
      </div>
      <div className="">
        <Label htmlFor="promotionId">Promotion liée</Label>
        <Select
          {...register('promotionId', {
            required: 'La promotion liée est requise',
            maxLength: 50,
          })}
          className=""
          id="promotionId"
          placeholder="promotionId"
        >
          {promotions?.map((promotion) => (
            <option key={promotion.id} value={promotion.id}>
              {promotion.name}
            </option>
          ))}
        </Select>
        {errors.promotionId && (
          <span className="text-sm text-red-600">
            {errors.promotionId.message.toString()}
          </span>
        )}
      </div>
      <Button
        type="submit"
        className="text-gray-50 bg-fidgreen hover:bg-fidgreen/80"
      >
        Submit
      </Button>
    </form>
  );
};
