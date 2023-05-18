import React, { useCallback, useState } from 'react'
import type { IPromotionCreatePayload, IPromotions } from '@/Api/Models/Promotions'
import { PromotionService, ShopService } from '@/Api/Services'
import { SubmitHandler, useForm } from 'react-hook-form'
import { IShop } from '@/Api/Models/Shop'
import { Button, Label, TextInput } from 'flowbite-react'


// react fc with a promotion variable
export const PromotionCreateForm: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<IPromotionCreatePayload>()
  const [shops, setShops] = useState<IShop[]>([])

  const onSubmit: SubmitHandler<IPromotionCreatePayload> = useCallback(async (data) => {
    try {
      await PromotionService.createPromotion(data)
    } catch (error) {
      console.error(error)
    }
  }, [])

  const loadShops = useCallback(async () => {
    try {
      const { data } = await ShopService.getShops()
      setShops(data)
    } catch (error) {
      console.error(error)
    }
  }, [])

  React.useEffect(() => {
    loadShops()
  }, [loadShops])

  return (
    <form onSubmit={handleSubmit(onSubmit)} data-cy='promotion-form' className="flex flex-col gap-4">
      <div className="">
        <Label htmlFor='name'>Promotion name</Label>
        <TextInput
          {...register('name', { required: true, maxLength: 50 })}
          type="text"
          className=""
          id="name"
          maxLength={50}
          placeholder='name'
        />
        {errors.name && <span>This field is required</span>}
      </div>
      <div className="">
        <Label htmlFor='description'>Promotion description</Label>
        <TextInput
          {...register('description', { required: true, maxLength: 50 })}
          type="text"
          className=""
          id="description"
          maxLength={50}
          placeholder='description'
        />
        {errors.description && <span>This field is required</span>}
      </div>
      <div className="flex justify-center space-x-4">
        <div className="flex-1">
          <Label htmlFor='startAt'>Promotion start date</Label>
          <TextInput
            {...register('startAt', { required: true, maxLength: 50 })}
            type="date"
            className=""
            id="startAt"
            maxLength={50}
            placeholder='startAt'
          />
          {errors.startAt && <span>This field is required</span>}
        </div>
        <div className="flex-1">
          <Label htmlFor='endAt'>Promotion end date</Label>
          <TextInput
            {...register('endAt', { required: true, maxLength: 50 })}
            type="date"
            className=""
            id="endAt"
            maxLength={50}
            placeholder='endAt'
          />
          {errors.endAt && <span>This field is required</span>}
        </div>
      </div>
      <div className="">
        <Label htmlFor='checkoutLimit'>Promotion checkout limit</Label>
        <TextInput
          {...register('checkoutLimit', { required: true,  valueAsNumber: true})}
          type="number"
          className=""
          id="checkoutLimit"
          maxLength={50}
          placeholder='checkoutLimit'
        />
        {errors.checkoutLimit && <span>This field is required</span>}
      </div>
      <Button className='text-black bg-green-200 hover:bg-green-300' type="submit" data-cy='submit'>
        Submit
      </Button>
    </form>
  )
}

export const PromotionUpdateForm: React.FC<{ promotion: IPromotions }> = ({ promotion }) => {
  const { register, handleSubmit, formState: { errors } } = useForm<IPromotionCreatePayload>({
    defaultValues: {
      name: promotion.name,
      description: promotion.description,
      startAt: promotion.startAt,
      endAt: promotion.endAt,
      checkoutLimit: promotion.checkoutLimit,
    }
  })

  const [shops, setShops] = useState<IShop[]>([])

  const onSubmit: SubmitHandler<IPromotionCreatePayload> = useCallback(async (data) => {
    try {
      await PromotionService.updatePromotion(promotion.id.toString(), data)
    } catch (error) {
      console.error(error)
    }
  }, [promotion.id])

  const loadShops = useCallback(async () => {
    try {
      const { data } = await ShopService.getShops()
      setShops(data)
    } catch (error) {
      console.error(error)
    }
  }, [])

  React.useEffect(() => {
    loadShops()
  }, [loadShops])

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
          <div className="">
            <TextInput
              {...register('name', { required: true, maxLength: 50 })}
              type="text"
              className=""
              id="name"
              maxLength={50}
              placeholder='name'
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
              placeholder='description'
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
              placeholder='startAt'
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
              placeholder='endAt'
            />
            {errors.endAt && <span>This field is required</span>}
          </div>
          <div className="">
            <TextInput
              {...register('checkoutLimit', { required: true })}
              type="number"
              className=""
              id="checkoutLimit"
              placeholder='checkoutLimit'
            />
            {errors.checkoutLimit && <span>This field is required</span>}
          </div>
          <Button className="btn btn-primary" type="submit">
            Submit
          </Button>
    </form>
  )
}




