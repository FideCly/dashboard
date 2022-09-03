import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";
import axios from "axios";
import { ProfileService } from "../../Services";
import { Profile } from "../../Types";

export default function ProfileForm() {
  return (
    <div className="max-w-2xl mx-auto">
      <form>
        <div className="relative z-0 mb-6 w-full group">
          <input
            type="text"
            className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            id="Raison_sociale"
            placeholder=" "
            required
          />
          <label htmlFor="Raison_sociale" className="label">
            Raison sociale
          </label>
        </div>
        <div className="relative z-0 mb-6 w-full group">
          <input
            type="email"
            className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            id="email"
            placeholder=" "
            required
          />
          <label htmlFor="email" className="label">
            Email
          </label>
        </div>
        <div className="relative z-0 mb-6 w-full group">
          <input
            type="tel"
            className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            id="phone"
            placeholder=" "
            required
          />
          <label htmlFor="phone" className="label">
            Phone
          </label>
        </div>
        <div className="relative z-0 mb-6 w-full group">
          <input
            type="text"
            className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            id="adresse"
            placeholder=" "
            required
          />
          <label htmlFor="adresse" className="label">
            Adresse
          </label>
        </div>
        <div className="flex space-x-4">
          <div className="relative z-0 mb-6 w-full group">
            <input
              type="text"
              className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              id="postalCode"
              placeholder=" "
              required
            />
            <label htmlFor="postalCode" className="label">
              Postal Code
            </label>
          </div>
          <div className="relative z-0 mb-6 w-full group">
            <input
              type="text"
              className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              id="city"
              placeholder=" "
              required
            />
            <label htmlFor="city" className="label">
              City
            </label>
          </div>
          <div className="relative z-0 mb-6 w-full group">
            <input
              type="text"
              className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              id="country"
              placeholder=" "
              required
            />
            <label htmlFor="country" className="label">
              Country
            </label>
          </div>
        </div>
        <div className="relative z-0 mb-6 w-full group">
          <input
            type="url"
            className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            id="website"
            placeholder=" "
            required
          />
          <label htmlFor="website" className="label">
            Website
          </label>
        </div>
        <button type="submit" className="btn">
          Submit
        </button>
      </form>
    </div>
  );
}
