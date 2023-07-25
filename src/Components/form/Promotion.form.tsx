import React, { useCallback, useEffect, useState } from 'react';
import type {
  IPromotionCreatePayload,
  IPromotionUpdatePayload,
  IPromotions,
} from '@/Models/Promotions';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Button, Label, TextInput } from 'flowbite-react';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
// react fc with a promotion variable
export const PromotionCreateForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IPromotionCreatePayload>();

  const onSubmit: SubmitHandler<IPromotionCreatePayload> = useCallback(
    async (data) => {
      try {
        const response = await fetch('/api/promotions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });
        toast('Promotion created', {
          hideProgressBar: true,
          autoClose: 2000,
          type: 'success',
        });
      } catch (error) {
        console.error(error);
      }
    },
    [],
  );
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      data-cy="promotion-form"
      className="flex flex-col gap-4"
    >
      <div className="">
        <Label htmlFor="name">Promotion name</Label>
        <TextInput
          {...register('name', { required: true, maxLength: 50 })}
          type="text"
          className=""
          id="name"
          maxLength={50}
          placeholder="name"
        />
        {errors.name && <span>This field is required</span>}
      </div>
      <div className="">
        <Label htmlFor="description">Promotion description</Label>
        <TextInput
          {...register('description', { required: true, maxLength: 50 })}
          type="text"
          className=""
          id="description"
          maxLength={50}
          placeholder="description"
        />
        {errors.description && <span>This field is required</span>}
      </div>
      <div className="flex justify-center space-x-4">
        <div className="flex-1">
          <Label htmlFor="startAt">Promotion start date</Label>
          <TextInput
            {...register('startAt', { required: true, maxLength: 50 })}
            type="date"
            className=""
            id="startAt"
            maxLength={50}
            placeholder="startAt"
          />
          {errors.startAt && <span>This field is required</span>}
        </div>
        <div className="flex-1">
          <Label htmlFor="endAt">Promotion end date</Label>
          <TextInput
            {...register('endAt', { required: true, maxLength: 50 })}
            type="date"
            className=""
            id="endAt"
            maxLength={50}
            placeholder="endAt"
          />
          {errors.endAt && <span>This field is required</span>}
        </div>
      </div>
      <div className="">
        <Label htmlFor="checkoutLimit">Promotion checkout limit</Label>
        <TextInput
          {...register('checkoutLimit', {
            required: true,
            valueAsNumber: true,
          })}
          type="number"
          className=""
          id="checkoutLimit"
          maxLength={50}
          placeholder="checkoutLimit"
        />
        {errors.checkoutLimit && <span>This field is required</span>}
      </div>
      <Button
        className="text-black bg-green-200 hover:bg-green-300"
        type="submit"
        data-cy="submit"
      >
        Submit
      </Button>
    </form>
  );
};

export const PromotionUpdateForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<IPromotionUpdatePayload>();

  const [promotion, setPromotion] = useState<IPromotions>();
  const router = useRouter();
  const id = Number(router.query.id);

  useEffect(() => {
    console.log('id :' + id);
    if (!id) return;
    const loadPromotion = async (): Promise<void> => {
      const options = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      };
      try {
        const response = await fetch(`/api/promotions/${id}`, options);
        const data = await response.json();
        setPromotion(data);
        console.log('promotion on page :' + data);
        const startAt = data.startAt.split('T')[0];
        const endAt = data.endAt.split('T')[0];
        setValue('name', data.name);
        setValue('description', data.description);
        setValue('startAt', startAt);
        setValue('endAt', endAt);
        setValue('checkoutLimit', data.checkoutLimit);
        setValue('id', data.id);
      } catch (error) {
        console.error(error);
      }
    };
    loadPromotion();
  }, [id]);
  const onSubmit: SubmitHandler<IPromotionUpdatePayload> = useCallback(
    async (data) => {
      try {
        const res = await fetch(`/api/promotions/${data.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });
        if (res.status >= 400) {
          toast('Promotion not updated', {
            hideProgressBar: true,
            autoClose: 2000,
            type: 'error',
          });
        } else {
          toast('Promotion updated', {
            hideProgressBar: true,
            autoClose: 2000,
            type: 'success',
          });
        }
      } catch (error) {
        console.error(error);
      }
    },
    [promotion?.id],
  );
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="">
        <TextInput
          {...register('name', { required: true, maxLength: 50 })}
          type="text"
          className=""
          id="name"
          maxLength={50}
          placeholder="name"
        />
        {errors.name && <span>This field is required</span>}
      </div>
      <div className="">
        <TextInput
          {...register('description', { required: true, maxLength: 50 })}
          type="text"
          className=""
          id="description"
          maxLength={50}
          placeholder="description"
        />
        {errors.description && <span>This field is required</span>}
      </div>
      <div className="">
        <TextInput
          {...register('startAt', { required: true, maxLength: 50 })}
          type="date"
          className=""
          id="startAt"
          maxLength={50}
          placeholder="startAt"
        />
        {errors.startAt && <span>This field is required</span>}
      </div>
      <div className="">
        <TextInput
          {...register('endAt', { required: true, maxLength: 50 })}
          type="date"
          className=""
          id="endAt"
          maxLength={50}
          placeholder="endAt"
        />
        {errors.endAt && <span>This field is required</span>}
      </div>
      <div className="">
        <TextInput
          {...register('checkoutLimit', { required: true })}
          type="number"
          className=""
          id="checkoutLimit"
          placeholder="checkoutLimit"
        />
        {errors.checkoutLimit && <span>This field is required</span>}
      </div>
      <Button className="btn btn-primary" type="submit">
        Submit
      </Button>
    </form>
  );
};
