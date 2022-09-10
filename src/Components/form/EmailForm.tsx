import Select from "react-select";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";
import axios from "axios";
import { EmailService } from "../../Services";
import { Email } from "../../Types";
import { ChangeEvent, useState } from "react";
const EmailForm: React.FC = () => {
  const InitialEmailState = {
    libelle: "",
    types: "",
    startAt: "",
    endAt: "",
    template: "",
  };
  const [email, setEmail] = useState<Email>(InitialEmailState);
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setEmail({ ...email, [name]: value });
  };
  const createEmail = async (event: React.FormEvent<HTMLFormElement>) => {
    try {
      const response = await EmailService.createEmail(email);
      if (response) {
        toast.success("Email created");
        setEmail(InitialEmailState);
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };
  return (
    <div className="max-w-2xl mx-auto mt-4">
      <form onSubmit={createEmail}>
        <div className="relative z-0 mb-6 w-full group">
          <input
            type="text"
            className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            id="name"
            placeholder=" "
            value={email.libelle}
            onChange={handleChange}
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
          <Select />
        </div>
        <div className="relative mb-6 w-full group">
          <label
            htmlFor="template"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
          >
            Your message
          </label>
          <textarea
            id="template"
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Your template..."
            value={email.template}
            required
          />
        </div>
        <div className="relative z-0 mb-6 w-full group">
          <input
            type="text"
            className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            id="cible"
            placeholder=" "
            value={email.types}
            onChange={handleChange}
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
              placeholder=" "
              value={email.startAt}
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
              value={email.endAt}
              onChange={handleChange}
              required
            />
            <label htmlFor="endAt" className="label">
              End At
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

export default EmailForm;
