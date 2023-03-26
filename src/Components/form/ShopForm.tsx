import React, { useCallback, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { IShopCreatePayload, IShopUpdatePayload, IShop  } from '@/Api/Models/Shop'
import { ShopService } from '@/Api/Services/index'

export const ShopForm: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<IShopCreatePayload>()

  const [shops, setShops] = useState<IShop[]>([])

  const onSubmit: SubmitHandler<IShopCreatePayload> = useCallback(async (data) => {
    try {
      await ShopService.createShop(data)
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
              {...register('companyName', { required: true, maxLength: 50 })}
              type="text"
              className="w-full max-w-xs input"
              id="name"
              maxLength={50}
              placeholder='companyName'
            />
            {errors.companyName && <span>This field is required</span>}
          </div>

          <div className="form-group">
            <input
              {...register('address', { required: true, maxLength: 50 })}
              type="text"
              className="w-full max-w-xs input"
              id="name"
              maxLength={50}
              placeholder='address'
            />
            {errors.address && <span>This field is required</span>}
          </div>

          <div className="form-group">
            <input
              {...register('phone', { required: true, maxLength: 50 })}
              type="text"
              className="w-full max-w-xs input"
              id="name"
              maxLength={50}
              placeholder='phone'
            />
            {errors.phone && <span>This field is required</span>}
          </div>

          <div className="form-group">
            <input
              {...register('email', { required: true, maxLength: 50 })}
              type="text"
              className="w-full max-w-xs input"
              id="name"
              maxLength={50}
              placeholder='email'
            />
            {errors.email && <span>This field is required</span>}
          </div>

          <div className="form-group">
            <input
              {...register('siren', { required: true, maxLength: 9 })}
              type=""
              className="w-full max-w-xs input"
              id="name"
              maxLength={9}
              placeholder='siren'
            />
            {errors.siren && <span>This field is required</span>}
          </div>

          <div className="form-group">
            <input
              {...register('siret', { required: true, maxLength: 14 })}
              type="text"
              className="w-full max-w-xs input"
              id="name"
              maxLength={14}
              placeholder='siret'
            />
            {errors.siret && <span>This field is required</span>}
          </div>

          <div className="form-group">
            <select
              {...register('activity', { required: true })}
              className="w-full max-w-xs select"
              id="activity"
              placeholder='activity'
            >
              <option value="">Select a activity</option>
              <option value="1">Activity 1</option>
              <option value="2">Activity 2</option>
              <option value="3">Activity 3</option>
            </select>
            {errors.activity && <span>This field is required</span>}
          </div>

          <button type="submit">
            Submit
          </button>
        </div>
      </div>
    </form>
  )
}

export const ShopUpdateForm: React.FC <{shop: IShop}> = ({shop}) => {
  const { register, handleSubmit, formState: { errors } } = useForm<IShopUpdatePayload>({
    defaultValues: {
      companyName: shop.companyName,
      address: shop.address,
      phone: shop.phone,
      email: shop.email,
      siren: shop.siren,
      siret: shop.siret,
      activity: shop.activity
    }
  })

  const [shops, setShops] = useState<IShop[]>([])

  const onSubmit: SubmitHandler<IShopUpdatePayload> = useCallback(async (data) => {
    try {
      await ShopService.updateShop(shop.id.toString(), data)
    } catch (error) {
      console.error(error)
    }
  }, [shop.id])

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
              {...register('companyName', { required: true, maxLength: 50 })}
              type="text"
              className="w-full max-w-xs input"
              id="name"
              maxLength={50}
              placeholder='companyName'
            />
            {errors.companyName && <span>This field is required</span>}
          </div>

          <div className="form-group">
            <input
              {...register('address', { required: true, maxLength: 50 })}
              type="text"
              className="w-full max-w-xs input"
              id="name"
              maxLength={50}
              placeholder='address'
            />
            {errors.address && <span>This field is required</span>}
          </div>

          <div className="form-group">
            <input
              {...register('phone', { required: true, maxLength: 50 })}
              type="text"
              className="w-full max-w-xs input"
              id="name"
              maxLength={50}
              placeholder='phone'
            />
            {errors.phone && <span>This field is required</span>}
          </div>

          <div className="form-group">
            <input
              {...register('email', { required: true, maxLength: 50 })}
              type="text"
              className="w-full max-w-xs input"
              id="name"
              maxLength={50}
              placeholder='email'
            />
            {errors.email && <span>This field is required</span>}
          </div>

          <div className="form-group">
            <input
              {...register('siren', { required: true, maxLength: 9 })}
              type="text"
              className="w-full max-w-xs input"
              id="name"
              maxLength={9}
              placeholder='siren'
            />
            {errors.siren && <span>This field is required</span>}
          </div>

          <div className="form-group">
            <input
              {...register('siret', { required: true, maxLength: 14 })}
              type="text"
              className="w-full max-w-xs input"
              id="name"
              maxLength={14}
              placeholder='siret'
            />
            {errors.siret && <span>This field is required</span>}
          </div>

          <div className="form-group">
            <select
              {...register('activity', { required: true })}
              className="w-full max-w-xs select"
              id="activity"
              placeholder='activity'
            >
              <option value="">Select a activity</option>
              <option value="1">Activity 1</option>
              <option value="2">Activity 2</option>
              <option value="3">Activity 3</option>
            </select>
            {errors.activity && <span>This field is required</span>}
          </div>

          <button type="submit">
            Submit
          </button>
        </div>
      </div>
    </form>
  )
}
