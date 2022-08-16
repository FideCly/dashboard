import React, { useState } from "react";
import Select from "react-select";

export default function Emailform() {
  const [email, setEmail] = useState({
    name: "",
    typecampagne: [
      { value: "chocolate", label: "Chocolate" },
      { value: "strawberry", label: "Strawberry" },
      { value: "vanilla", label: "Vanilla" },
    ],
    cible: "",
    startAt: "",
    endAt: "",
    template: "",
  });

  const onChange = (e) => {
    setEmail({
      ...email,
      [e.target.name]: e.target.value,
    });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    console.log(email);
  };
  return (
    <div className="max-w-2xl mx-auto mt-4">
      <form onSubmit={onSubmit}>
        <div className="relative z-0 mb-6 w-full group">
          <input
            type="text"
            className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            id="name"
            name="name"
            onChange={onChange}
            value={email.name}
            placeholder=" "
            required
          />
          <label htmlFor="name" className="label">
            Name
          </label>
        </div>
        <div className="relative mb-6 w-full group">
          <label
            htmlFor="typecampagne"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            Type de campagne
          </label>
          <Select options={email.typecampagne} onChange={onChange} />
        </div>
        <div className="relative z-0 mb-6 w-full group">
          <input
            type="text"
            className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            id="cible"
            name="cible"
            onChange={onChange}
            value={email.cible}
            placeholder=" "
            required
          />
          <label htmlFor="cible" className="label">
            Cible
          </label>
        </div>
        <div className="flex space-x-4">
          <div className="relative z-0 mb-6 w-full group">
            <input
              type="date"
              className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              id="startAt"
              name="startAt"
              onChange={onChange}
              value={email.startAt}
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
              value={email.endAt}
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
            id="template"
            name="template"
            onChange={onChange}
            value={email.template}
            placeholder=" "
            required
          />
          <label htmlFor="template" className="label">
            Template
          </label>
        </div>
        <button type="submit" className="btn">
          Submit
        </button>
      </form>
    </div>
  );
}
