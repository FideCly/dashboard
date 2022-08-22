import Select from "react-select";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";
import axios from "axios";
type Email = {
  name: string;
  typecampagne: string;
  cible: string;
  startAt: Date;
  endAt: Date;
  template: string;
};
export default function Emailform() {
  const { register, handleSubmit } = useForm<Email>();
  const onSubmit: SubmitHandler<Email> = (data) => {
    console.log(data);
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("typecampagne", data.typecampagne);
    formData.append("cible", data.cible);
    formData.append("startAt", new Date(data.startAt).toISOString());
    formData.append("endAt", new Date(data.endAt).toISOString());
    formData.append("template", data.template);
    axios
      .post(import.meta.env.VITE_API_URL + "api/email", formData)
      .then(() => {
        toast.success("Email created successfully");
      })
      .catch((err) => {
        toast.error("Error creating email : " + err.message);
      });
  };
  return (
    <div className="max-w-2xl mx-auto mt-4">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="relative z-0 mb-6 w-full group">
          <input
            type="text"
            className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            id="name"
            placeholder=" "
            required
            {...register("name")}
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
        <div className="relative z-0 mb-6 w-full group">
          <input
            type="text"
            className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            id="cible"
            placeholder=" "
            required
            {...register("cible")}
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
              required
              {...register("startAt")}
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
              required
              {...register("endAt")}
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
            placeholder=" "
            required
            {...register("template")}
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
