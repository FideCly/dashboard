import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";
import axios from "axios";
type Email = {
  name: string;
  adresse: string;
  phone: string;
  email: string;
  postalCode: string;
  city: string;
  country: string;
  website: string;
};
export default function ProfileForm() {
  const { register, handleSubmit } = useForm<Email>();
  const onSubmit: SubmitHandler<Email> = (data) => {
    console.log(data);
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("adresse", data.adresse);
    formData.append("phone", data.phone);
    formData.append("email", data.email);
    formData.append("postalCode", data.postalCode);
    formData.append("city", data.city);
    formData.append("country", data.country);
    formData.append("website", data.website);
    axios
      .post(process.env.REACT_APP_API_URL + "/api/profile", formData)
      .then(() => {
        toast.success("Profile created successfully");
      })
      .catch((err) => {
        toast.error("Error creating profile : " + err.message);
      });
  };

  return (
    <div className="max-w-2xl mx-auto">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="relative z-0 mb-6 w-full group">
          <input
            type="text"
            className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            id="Raison_sociale"
            placeholder=" "
            required
            {...register("name")}
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
            {...register("email")}
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
            {...register("phone")}
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
            {...register("adresse")}
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
              {...register("postalCode")}
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
              {...register("city")}
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
              {...register("country")}
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
            {...register("website")}
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
