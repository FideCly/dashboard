import React, { useState, ChangeEvent } from "react";
import { toast } from "react-toastify";
import { CardService } from "../../Services";
import { Card } from "../../Types";
const CardForm: React.FC = () => {
  const InitialCardState = {
    name: "",
    // image: new File([], ""),
    startAt: "",
    endAt: "",
  };
  const [card, setCard] = useState<Card>(InitialCardState);
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setCard((current) => ({ ...current, [name]: value }));
  };
  const createCard = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("name", card.name);
    formData.append("startAt", card.startAt);
    formData.append("endAt", card.endAt);
    try {
      const response = await CardService.createCard(formData);
      if (response.status === 201) {
        toast.success("Card created");
        setCard(InitialCardState);
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };
  return (
    <div className="max-w-2xl mx-auto mt-4">
      <form onSubmit={createCard}>
        <div className="flex space-x-4">
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="text"
              className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              id="name"
              placeholder=" "
              value={card.name}
              onChange={handleChange}
              required
            />
            <label htmlFor="name" className="label">
              Name
            </label>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="date"
              className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              id="startAt"
              placeholder=" "
              value={card.startAt}
              onChange={handleChange}
              required
            />
            <label htmlFor="startAt" className="label">
              Start At
            </label>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="date"
              className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              id="endAt"
              placeholder=" "
              value={card.endAt}
              onChange={handleChange}
              required
            />
            <label htmlFor="endAt" className="label">
              End At
            </label>
          </div>
        </div>
        <div className="relative z-0 w-full mb-6 group">
          <input type="submit" value="Submit" className="btn btn-primary" />
        </div>
      </form>
    </div>
  );
};

export default CardForm;
