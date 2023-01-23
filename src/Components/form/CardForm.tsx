import React, { useState, ChangeEvent } from "react";
import { CardService } from "../../Api/Services";
import Card from "../../Api/Models/Card";

const CardForm : React.FC = () => {
  const initialCardState: Card = {
    name: "",
    startAt: "",
    endAt: ""
  }
  const [card, setCard] = useState<Card>(initialCardState);
  const [submitted, setSubmitted] = useState<boolean>(false);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setCard({ ...card, [name]: value });
  }

  const saveCard = () => {
    var data = {
      name: card.name,
      startAt: card.startAt,
      endAt: card.endAt
    };

    CardService.createCard(data)
      .then((response : any) => {
        setCard({
          name: response.data.name,
          startAt: response.data.startAt,
          endAt: response.data.endAt
        });
        setSubmitted(true);
        console.log(response.data);
      })
      .catch((e : Error )=> {
        console.log(e);
      });
  }

  const newCard = () => {
    setCard(initialCardState);
    setSubmitted(false);
  }

  return (
    <div className="submit-form">
      {submitted ? (
        <div>
          <h4>You submitted successfully!</h4>
          <button className="btn btn-success" onClick={newCard}>
            Add
          </button>
        </div>
      ) : (
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
      )}
    </div>
  );

}

export default CardForm;


