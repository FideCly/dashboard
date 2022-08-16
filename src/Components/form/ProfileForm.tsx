import React, { useState } from "react";

export default function ProfileForm() {
  const [profile, setProfile] = useState({
    Raison_sociale: "",
    adresse: "",
    phone: "",
    email: "",
    postalCode: "",
    city: "",
    country: "",
    website: "",
  });
  const onChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    console.log(profile);
  };
  return (
    <div className="max-w-2xl mx-auto">
      <form onSubmit={onSubmit}>
        <div className="relative z-0 mb-6 w-full group">
          <input
            type="text"
            className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            id="Raison_sociale"
            name="Raison_sociale"
            onChange={onChange}
            value={profile.Raison_sociale}
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
            name="email"
            onChange={onChange}
            value={profile.email}
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
            name="phone"
            onChange={onChange}
            value={profile.phone}
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
            name="adresse"
            onChange={onChange}
            value={profile.adresse}
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
              name="postalCode"
              onChange={onChange}
              value={profile.postalCode}
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
              name="city"
              onChange={onChange}
              value={profile.city}
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
              name="country"
              onChange={onChange}
              value={profile.country}
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
            name="website"
            onChange={onChange}
            value={profile.website}
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
