import React, { useCallback, useState } from 'react'
import type {IPromotionCreatePayload, IPromotions} from '@/Api/Models/Promotions'
import { PromotionService, ShopService } from '@/Api/Services'
import { SubmitHandler, useForm } from 'react-hook-form'
import { IShop } from '@/Api/Models/Shop'


// react fc with a promotion variable
const PromotionForm: React.FC<{promotion?: IPromotions}> = ({promotion}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IPromotionCreatePayload>()

  const onSubmit: SubmitHandler<IPromotionCreatePayload> = useCallback(async (data) => {
    if (promotion?.id !== undefined) {
      // update promotion
      try {
        //convert checkoutLimit and shopId to number
        data.checkoutLimit = Number(data.checkoutLimit)
        data.shopId = Number(data.shopId)
        const response = await PromotionService.updatePromotion(promotion.id.toString(), data)
        console.log(response)
      } catch (error) {
        console.log(error)
      }
    }else{
      try {
      //convert checkoutLimit and shopId to number
      data.checkoutLimit = Number(data.checkoutLimit)
      data.shopId = Number(data.shopId)
      const response = await PromotionService.createPromotion(data)
      console.log(response)
    } catch (error) {
      console.log(error)
    }
    }
  }, [promotion?.id])

  const [shops, setShops] = useState<IShop[]>([])

  // get all shops
  const getShops = () => {
    ShopService.getShops()
      .then((response: any) => {
        setShops(response.data)
        console.log(response.data)
      })
      .catch((e: Error) => {
        console.log(e)
      })
  }

  React.useEffect(() => {
    getShops()
  }, [])
  

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
    <div className="submit-form">
      <div>
        <div className="form-group">
          <input
            {...register('name', { required: true })}
            type="text"
            className="w-full max-w-xs input"
            id="name"
            maxLength={50}
            value={promotion?.name}
            placeholder='Name'
          />
          {errors.name && <span>This field is required</span>}
        </div>

        <div className="form-group">
          <select
            {...register('shopId', { required: true })}
            className="w-full max-w-xs select"
            id="shopId"
            value={promotion?.shopId}
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
            value={promotion?.startAt?.toString()}
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
            value={promotion?.endAt.toString()}
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
            value={promotion?.checkoutLimit}
            placeholder='checkoutLimit'
          />
          {errors.checkoutLimit && <span>This field is required</span>}
        </div>

        <div className="form-group">
          <textarea
            {...register('description', { required: true })}
            className="textarea textarea-bordered"
            id="description"
            maxLength={250}
            value={promotion?.description}
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

export default PromotionForm
