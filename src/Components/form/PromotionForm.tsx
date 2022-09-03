import Select from "react-select";
import axios from "axios";
import { toast } from "react-toastify";
import { useForm, SubmitHandler } from "react-hook-form";
import { PromotionService } from "../../Services";
import { Promotions } from "../../Types";

import { ChangeEvent, useEffect, useState } from "react";

const PromotionForm: React.FC = () => {
  const InitialPromotionsState = {
    libelle: "",
    description: "",
    type: "",
    startAt: "",
    endAt: "",
  };
  const [promotions, setPromotions] = useState<Promotions>(
    InitialPromotionsState
  );
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setPromotions({ ...promotions, [name]: value });
  };

  const createPromotion = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("libelle", promotions.libelle);
    formData.append("description", promotions.description);
    formData.append("type", promotions.type);
    try {
      const response = await PromotionService.createPromotion(formData);
      if (response.status === 201) {
        toast.success("Promotion created");
        setPromotions(InitialPromotionsState);
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-4">
      <form onSubmit={createPromotion} className="">
        <div className="relative z-0 mb-6 w-full group">
          <input
            type="text"
            className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            id="name"
            placeholder=" "
            value={promotions.libelle}
            onChange={handleChange}
            required
          />
          <label htmlFor="name" className="label">
            Name
          </label>
        </div>
        <div className="relative mb-6 w-full group">
          <label
            htmlFor="type"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            Type
          </label>
          <Select />
        </div>
        <div className="flex space-x-4">
          <div className="relative z-0 mb-6 w-full group">
            <input
              type="date"
              className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              id="startAt"
              placeholder=" "
              value={promotions.startAt}
              onChange={handleChange}
              required
            />
            <label htmlFor="startAt" className="label">
              Start At
            </label>
          </div>
          <div className="relative z-0 mb-6 w-full group">
            <input
              type="date"
              className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              id="endAt"
              placeholder=" "
              value={promotions.endAt}
              onChange={handleChange}
              required
            />
            <label htmlFor="endAt" className="label">
              End At
            </label>
          </div>

          <div className="relative z-0 mb-6 w-full group">
            <input
              type="text"
              className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              id="description"
              placeholder=" "
              value={promotions.description}
              onChange={handleChange}
              required
            />
            <label htmlFor="description" className="label">
              Description
            </label>
          </div>
        </div>
        <button type="submit" className="btn">
          Submit
        </button>
      </form>
    </div>
  );
};

export default PromotionForm;
