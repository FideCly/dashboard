import React, { useCallback, useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Button, Label, Select, TextInput, Textarea } from 'flowbite-react';
import {
  ICampaignCreatePayload,
  ICampaignUpdatePayload,
} from '@/Models/Campaign';
import { getSession } from 'next-auth/react';
import { IUser } from '@/Models/User';
import { IPromotions } from '@/Models/Promotions';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';

export const CampaignCreateForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ICampaignCreatePayload>();
  // get all shop's promotions
  const [promotions, setPromotions] = useState<IPromotions[]>([]);
  const loadUser = async (): Promise<IUser> => {
    const session = await getSession();
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const user = fetch(`/api/user/${session.user.email}`, options)
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
        const response = await fetch(`/api/campaign`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          // conserve the number type for the promotionId
          body: JSON.stringify({ ...data, promotionId: +data.promotionId }),
        });
        if (response.status >= 400) {
          toast('Error', {
            hideProgressBar: true,
            autoClose: 2000,
            type: 'error',
          });
        } else {
          toast('Campaign created', {
            hideProgressBar: true,
            autoClose: 2000,
            type: 'success',
          });
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
      className="flex flex-col gap-4"
    >
      <div className="">
        <Label htmlFor="subject">Nom de la campagne</Label>
        <TextInput
          {...register('subject', { required: true, maxLength: 50 })}
          type="text"
          className=""
          id="subject"
          maxLength={50}
          placeholder="subject"
        />
        {errors.subject && <span>This field is required</span>}
      </div>
      <div className="">
        <Label htmlFor="textData">Type de campagne</Label>
        <Textarea
          {...register('textData', { required: true, maxLength: 50 })}
          className=""
          id="textData"
          maxLength={50}
          placeholder="textData"
        />
        {errors.textData && <span>This field is required</span>}
      </div>
      <div className="">
        <Label htmlFor="promotionId">promotions</Label>
        <Select
          {...register('promotionId', { required: true, maxLength: 50 })}
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
        {errors.promotionId && <span>This field is required</span>}
      </div>
      <Button
        type="submit"
        className="text-black bg-green-200 hover:bg-green-300"
      >
        Submit
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
  } = useForm<ICampaignUpdatePayload>();

  const [promotions, setPromotions] = useState<IPromotions[]>([]);
  const router = useRouter();
  const id = Number(router.query.id);
  const loadUser = async (): Promise<IUser> => {
    const session = await getSession();
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const user = fetch(`/api/user/${session.user.email}`, options)
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
        const res = await fetch(`/api/campaign/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ ...data, promotionId: +data.promotionId }),
        });
        if (res.status >= 400) {
          toast('Error', {
            hideProgressBar: true,
            autoClose: 2000,
            type: 'error',
          });
        } else {
          toast('Campaign updated', {
            hideProgressBar: true,
            autoClose: 2000,
            type: 'success',
          });
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
      className="flex flex-col gap-4"
    >
      <div className="">
        <Label htmlFor="libelle">Nom de la campagne</Label>
        <TextInput
          {...register('subject', { required: true, maxLength: 50 })}
          type="text"
          className=""
          id="libelle"
          maxLength={50}
          placeholder="libelle"
        />
        {errors.subject && <span>This field is required</span>}
      </div>

      <div className="">
        <Label htmlFor="types">Type de campagne</Label>
        <Textarea
          {...register('textData', { required: true, maxLength: 50 })}
          className=""
          id="types"
          maxLength={50}
          placeholder="types"
        />
        {errors.textData && <span>This field is required</span>}
      </div>

      <div className="">
        <Label htmlFor="promotionId">Shop</Label>
        <Select
          {...register('promotionId', { required: true, maxLength: 50 })}
          className=""
          id="promotionId"
          placeholder="promotionId"
        >
          {promotions.map((promotion) => (
            <option key={promotion.id} value={promotion.id}>
              {promotion.name}
            </option>
          ))}
        </Select>
        {errors.promotionId && <span>This field is required</span>}
      </div>

      <Button
        type="submit"
        className="text-black bg-green-200 hover:bg-green-300"
      >
        Submit
      </Button>
    </form>
  );
};
