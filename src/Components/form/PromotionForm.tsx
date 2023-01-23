import React, { useState, ChangeEvent } from "react";
import Promotions from "../../Api/Models/Promotions";
import { PromotionService } from "../../Api/Services";

const PromotionForm : React.FC = () => {
  const initialPromotionState: Promotions = {
    name: "",
    description: "",
    startAt: "",
    endAt: "",
    shopId: 0,
    checkoutLimit: 0,
    
  }
  const [promotion, setPromotion] = useState<Promotions>(initialPromotionState);
  const [submitted, setSubmitted] = useState<boolean>(false);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setPromotion({ ...promotion, [name]: value });
  }

  const savePromotion = () => {
    var data = {
      name: promotion.name,
      description: promotion.description,
      startAt: promotion.startAt,
      endAt: promotion.endAt,
      shopId: promotion.shopId,
      checkoutLimit: promotion.checkoutLimit,
    };

    PromotionService.createPromotion(data)
      .then((response : any) => {
        setPromotion({
          name: response.data.name,
          description: response.data.description,
          startAt: response.data.startAt,
          endAt: response.data.endAt,
          shopId: response.data.shopId,
          checkoutLimit: response.data.checkoutLimit,
      });
        setSubmitted(true);
        console.log(response.data);
      })
      .catch((e : Error )=> {
        console.log(e);
      });
  }

  const newPromotion = () => {
    setPromotion(initialPromotionState);
    setSubmitted(false);
  }

  return (
    <div className="submit-form">
      {submitted ? (
        <div>
          <h4>You submitted successfully!</h4>
          <button className="btn btn-success" onClick={newPromotion}>
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
              type="text"
              className="form-control"
              id="startAt"
              required
              value={promotion.startAt}
              onChange={handleInputChange}
              name="startAt"
            />
          </div>
          <div className="form-group">
            <label htmlFor="endAt">End At</label>
            <input
              type="text"
              className="form-control"
              id="endAt"
              required
              value={promotion.endAt}
              onChange={handleInputChange}
              name="endAt"
            />
          </div>
          <div className="form-group">
            <label htmlFor="shop">Shop</label>
            <input
              type="text"
              className="form-control"
              id="shop"
              required
              value={promotion.shop}
              onChange={handleInputChange}
              name="shop"
            />
          </div>
          <div className="form-group">
            <label htmlFor="card">Card</label>
            <input
              type="text"
              className="form-control"
              id="card"
              required
              value={promotion.card}
              onChange={handleInputChange}
              name="card"
            />
          </div>
          <button onClick={savePromotion} className="btn btn-success">
            Submit
          </button>
        </div>
      )}
    </div>
  );
}

export default PromotionForm;
