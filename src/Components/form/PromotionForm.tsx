import React, { useCallback, useState } from 'react'
import type {IPromotionCreatePayload, IPromotions} from '@/Api/Models/Promotions'
import { PromotionService, ShopService } from '@/Api/Services'
import { SubmitHandler, useForm } from 'react-hook-form'
import { IShop } from '@/Api/Models/Shop'

export const CreatePromotionForm: React.FC = () => {
  
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
    <form onSubmit={handleSubmit(onSubmit)}>
    <div className="submit-form">
      <div>
        <div className="form-group">
          <input
            // register the input with react-hook-form is required on where promotion is undefined
            {...register('name', { required: true, maxLength: 50})}
            type="text"
            className="w-full max-w-xs input"
            id="name"
            maxLength={50}
            placeholder='Name'
          />
          {errors.name && <span>This field is required</span>}
        </div>

        <div className="form-group">
          <select
            {...register('shopId', { required:true })}
            className="w-full max-w-xs select"
            id="shopId"
            placeholder='shop'
          >
            <option value="">Select a shop</option>
            {shops.map((shop) => (
              <option key={shop.id} value={shop.id}>
                {shop.companyName}
              </option>
            ))}
          </select>
          {errors.shopId && <span>This field is required</span>}
        </div>
        

        <div className="form-group">
          <input
            {...register('startAt', { required: true })}
            type="date"
            className="w-full max-w-xs input"
            id="startAt"
            placeholder='date de debut'
          />
          {errors.startAt && <span>This field is required</span>}
        </div>
        
        <div className="form-group">
          <input
            {...register('endAt', { required: true })}
            type="date"
            className="w-full max-w-xs input"
            id="endAt"
            placeholder='date de fin'
          />
          {errors.endAt && <span>This field is required</span>}
        </div>
        
        <div className="form-group">
          <input
            {...register('checkoutLimit', { required: true })}
            type="number"
            className="w-full max-w-xs input"
            id="checkoutLimit"
            placeholder='checkoutLimit'
          />
          {errors.checkoutLimit && <span>This field is required</span>}
        </div>

        <div className="form-group">
          <textarea
            {...register('description', { required: true, maxLength: 250 })}
            className="textarea textarea-bordered"
            id="description"
            maxLength={250}
            placeholder='Description'
          />
          {errors.description && <span>This field is required</span>}
        </div>
        
        <button type="submit" className="btn btn-success">
          Submit
        </button>
      </div>
    </div>
    </form>
  )
}


export const UpdatePromotionForm: React.FC<{promotion: IPromotions}> = ({ promotion }) => {
  
  const { register, handleSubmit, formState: { errors } } = useForm<IPromotionCreatePayload>({
    defaultValues: {
      name: promotion.name,
      shopId: promotion.shopId,
      startAt: promotion.startAt,
      endAt: promotion.endAt,
      checkoutLimit: promotion.checkoutLimit,
      description: promotion.description,
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
            // register the input with react-hook-form is required on where promotion is undefined
            {...register('name', { required: true, maxLength: 50})}
            type="text"
            className="w-full max-w-xs input"
            id="name"
            maxLength={50}
            placeholder='Name'
          />
          {errors.name && <span>This field is required</span>}
        </div>

        <div className="form-group">
          <select
            {...register('shopId', { required:true })}
            className="w-full max-w-xs select"
            id="shopId"
            placeholder='shop'
          >
            <option value="">Select a shop</option>
            {shops.map((shop) => (
              <option key={shop.id} value={shop.id}>
                {shop.companyName}
              </option>
            ))}
          </select>
          {errors.shopId && <span>This field is required</span>}
        </div>
        

        <div className="form-group">
          <input
            {...register('startAt', { required: true })}
            type="date"
            className="w-full max-w-xs input"
            id="startAt"
            placeholder='date de debut'
          />
          {errors.startAt && <span>This field is required</span>}
        </div>
        
        <div className="form-group">
          <input
            {...register('endAt', { required: true })}
            type="date"
            className="w-full max-w-xs input"
            id="endAt"
            placeholder='date de fin'
          />
          {errors.endAt && <span>This field is required</span>}
        </div>
        
        <div className="form-group">
          <input
            {...register('checkoutLimit', { required: true })}
            type="number"
            className="w-full max-w-xs input"
            id="checkoutLimit"
            placeholder='checkoutLimit'
          />
          {errors.checkoutLimit && <span>This field is required</span>}
        </div>

        <div className="form-group">
          <textarea
            {...register('description', { required: true, maxLength: 250 })}
            className="textarea textarea-bordered"
            id="description"
            maxLength={250}
            placeholder='Description'
          />
          {errors.description && <span>This field is required</span>}
        </div>
        
        <button type="submit" className="btn btn-success">
          Submit
        </button>
      </div>
    </div>
    </form>
  )
}

