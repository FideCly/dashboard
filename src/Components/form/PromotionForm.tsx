import React, { useState, type ChangeEvent } from 'react'
import type {IPromotionCreatePayload} from '../../Api/Models/Promotions'
import { PromotionService } from '../../Api/Services'

const PromotionForm: React.FC = () => {
  const initialPromotionState: IPromotionCreatePayload = {
    name: '',
    description: '',
    startAt: new Date(),
    endAt: new Date(),
    shopId: 0,
    checkoutLimit: 0
    
  }
  const [promotion, setPromotion] = useState<IPromotionCreatePayload>(initialPromotionState)

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = event.target
    setPromotion({ ...promotion, [name]: value })
  }

  const savePromotion = (): void => {
    const data = {
      name: promotion.name,
      description: promotion.description,
      startAt: promotion.startAt,
      endAt: promotion.endAt,
      shopId: promotion.shopId,
      checkoutLimit: promotion.checkoutLimit
    }

    PromotionService.createPromotion(data)
      .then((response: any) => {
        setPromotion({
          name: response.data.name,
          description: response.data.description,
          startAt: response.data.startAt,
          endAt: response.data.endAt,
          shopId: response.data.shopId,
          checkoutLimit: response.data.checkoutLimit
        })
        console.log(response.data)
      })
      .catch((e: Error) => {
        console.log(e)
      })
  }

  return (
    <div className="submit-form">
      <div>
        <div className="form-group">
          <label htmlFor="title">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            required
            value={promotion.name}
            onChange={handleInputChange}
            name="name"
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <input
            type="text"
            className="form-control"
            id="description"
            required
            value={promotion.description}
            onChange={handleInputChange}
            name="description"
          />
        </div>
        <div className="form-group">
          <label htmlFor="startAt">Start At</label>
          <input
            type="date"
            className="form-control"
            id="startAt"
            required
            value={promotion.startAt.toDateString()}
            onChange={handleInputChange}
            name="startAt"
          />
        </div>
        <div className="form-group">
          <label htmlFor="endAt">End At</label>
          <input
            type="date"
            className="form-control"
            id="endAt"
            required
            value={promotion.endAt.toDateString()}
            onChange={handleInputChange}
            name="endAt"
          />
        </div>
        <button onClick={savePromotion} className="btn btn-success">
          Submit
        </button>
      </div>
    </div>
  )
}

export default PromotionForm
