import React, { useState, type ChangeEvent } from 'react'
import { CardService } from '../../Api/Services'
import type Card from '../../Api/Models/Card'

const CardForm: React.FC = () => {
  const initialCardState: Card = {
    name: '',
    startAt: '',
    endAt: ''
  }
  const [card, setCard] = useState<Card>(initialCardState)

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = event.target
    setCard({ ...card, [name]: value })
  }

  const saveCard = (): void => {
    const data = {
      name: card.name,
      startAt: card.startAt,
      endAt: card.endAt
    }

    CardService.createCard(data)
      .then((response: any) => {
        setCard({
          name: response.data.name,
          startAt: response.data.startAt,
          endAt: response.data.endAt
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
            value={card.name}
            onChange={handleInputChange}
            name="name"
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Start at</label>
          <input
            type="date"
            className="form-control"
            id="startAt"
            required
            value={card.startAt}
            onChange={handleInputChange}
            name="startAt"
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">EndAt</label>
          <input
            type="date"
            className="form-control"
            id="endAt"
            required
            value={card.endAt}
            onChange={handleInputChange}
            name="endAt"
          />
        </div>
        <button onClick={saveCard} className="btn btn-success">
          Submit
        </button>
      </div>
    </div>
  )
}

export default CardForm
