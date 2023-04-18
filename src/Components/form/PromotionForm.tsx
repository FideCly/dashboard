import React, { useCallback, useState } from 'react'
import type {IPromotionCreatePayload, IPromotions} from '@/Api/Models/Promotions'
import { PromotionService, ShopService } from '@/Api/Services'
import { SubmitHandler, useForm } from 'react-hook-form'
import { IShop } from '@/Api/Models/Shop'


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
    <form onSubmit={handleSubmit(onSubmit)} data-cy='promotion-form'>
      <div className="submit-form">
        <div>
          <div className="form-group">
            <input
              {...register('name', { required: true, maxLength: 50 })}
              type="text"
              className="w-full max-w-xs input"
              id="name"
              maxLength={50}
              placeholder='name'
            />
            {errors.name && <span>This field is required</span>}
          </div>
          <div className="form-group">
            <input
              {...register('description', { required: true, maxLength: 50 })}
              type="text"
              className="w-full max-w-xs input"
              id="description"
              maxLength={50}
              placeholder='description'
            />
            {errors.description && <span>This field is required</span>}
          </div>
          <div className="form-group">
            <input
              {...register('startAt', { required: true, maxLength: 50 })}
              type="date"
              className="w-full max-w-xs input"
              id="startAt"
              maxLength={50}
              placeholder='startAt'
            />
            {errors.startAt && <span>This field is required</span>}
          </div>
          <div className="form-group">
            <input
              {...register('endAt', { required: true, maxLength: 50 })}
              type="date"
              className="w-full max-w-xs input"
              id="endAt"
              maxLength={50}
              placeholder='endAt'
            />
            {errors.endAt && <span>This field is required</span>}
          </div>
          <div className="form-group">
            <input
              {...register('checkoutLimit', { required: true, maxLength: 50 })}
              type="number"
              className="w-full max-w-xs input"
              id="checkoutLimit"
              maxLength={50}
              placeholder='checkoutLimit'
            />
            {errors.checkoutLimit && <span>This field is required</span>}
          </div>
          <button className="btn btn-primary" type="submit" data-cy='submit'>
            Submit
          </button>
        </div>
      </div>
    </form>
  )
}

export const PromotionUpdateForm: React.FC<{promotion: IPromotions}> = ({promotion}) => {
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
      <div className="submit-form">
        <div>
          <div className="form-group">
            <input
              {...register('name', { required: true, maxLength: 50 })}
              type="text"
              className="w-full max-w-xs input"
              id="name"
              maxLength={50}
              placeholder='name'
            />
            {errors.name && <span>This field is required</span>}
          </div>
          <div className="form-group">
            <input
              {...register('description', { required: true, maxLength: 50 })}
              type="text"
              className="w-full max-w-xs input"
              id="description"
              maxLength={50}
              placeholder='description'
            />
            {errors.description && <span>This field is required</span>}
          </div>
          <div className="form-group">
            <input
              {...register('startAt', { required: true, maxLength: 50 })}
              type="date"
              className="w-full max-w-xs input"
              id="startAt"
              maxLength={50}
              placeholder='startAt'
            />
            {errors.startAt && <span>This field is required</span>}
          </div>
          <div className="form-group">
            <input
              {...register('endAt', { required: true, maxLength: 50 })}
              type="date"
              className="w-full max-w-xs input"
              id="endAt"
              maxLength={50}
              placeholder='endAt'
            />
            {errors.endAt && <span>This field is required</span>}
          </div>
          <div className="form-group">
            <input
              {...register('checkoutLimit', { required: true, maxLength: 50 })}
              type="number"
              className="w-full max-w-xs input"
              id="checkoutLimit"
              maxLength={50}
              placeholder='checkoutLimit'
            />
            {errors.checkoutLimit && <span>This field is required</span>}
          </div>
          <button className="btn btn-primary" type="submit">
            Submit
          </button>
        </div>
      </div>
    </form>
  )
}
          
          


  