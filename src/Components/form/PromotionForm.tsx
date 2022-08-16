import React, { useState } from "react";
import Select from "react-select";
export default function Promotionform() {
  const [promotion, setPromotion] = useState({
    name: "",
    type: [
      { value: "chocolate", label: "Chocolate" },
      { value: "strawberry", label: "Strawberry" },
      { value: "vanilla", label: "Vanilla" },
    ],
    startAt: "",
    endAt: "",
    description: "",
    Image: "",
  });
  const onChange = (e) => {
    setPromotion({
      ...promotion,
      [e.target.name]: e.target.value,
    });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    console.log(promotion);
  };

  return (
    <div className="max-w-2xl mx-auto mt-4">
      <form onSubmit={onSubmit} className="">
        <div className="relative z-0 mb-6 w-full group">
          <input
            type="text"
            className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            id="name"
            name="name"
            onChange={onChange}
            value={promotion.name}
            placeholder=" "
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
          <Select options={promotion.type} onChange={onChange} />
        </div>
        <div className="flex space-x-4">
          <div className="relative z-0 mb-6 w-full group">
            <input
              type="date"
              className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              id="startAt"
              name="startAt"
              onChange={onChange}
              value={promotion.startAt}
              placeholder=" "
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
              name="endAt"
              onChange={onChange}
              value={promotion.endAt}
              placeholder=" "
              required
            />
            <label htmlFor="endAt" className="label">
              End At
            </label>
          </div>
        </div>

        <div className="relative z-0 mb-6 w-full group">
          <input
            type="text"
            className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            id="description"
            name="description"
            onChange={onChange}
            value={promotion.description}
            placeholder=" "
            required
          />
          <label htmlFor="description" className="label">
            Description
          </label>
        </div>
        <div className="relative z-0 mb-6 w-full group">
          <label
            htmlFor="Image"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            Image
          </label>
          <input
            type="file"
            className="block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
            id="Image"
            name="Image"
            onChange={onChange}
            value={promotion.Image}
            placeholder=" "
            required
          />
        </div>
        <button type="submit" className="btn">
          Submit
        </button>
      </form>
    </div>
  );
}
