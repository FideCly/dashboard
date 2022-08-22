import axios from "axios";
import { toast } from "react-toastify";
import { useForm, SubmitHandler } from "react-hook-form";
type CardValues = {
  name: string;
  image: File;
  startAt: Date;
  endAt: Date;
};
export default function Cardform() {
  const { register, handleSubmit } = useForm<CardValues>();
  const onSubmit: SubmitHandler<CardValues> = (data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("image", data.image);
    formData.append("startAt", new Date(data.startAt).toISOString());
    formData.append("endAt", new Date(data.endAt).toISOString());
    axios
      .post(process.env.REACT_APP_API_URL + "api/card", formData)
      .then(() => {
        toast.success("Card created successfully");
      })
      .catch((err) => {
        toast.error("Error creating card : " + err.message);
      });
  };

  return (
    <div className="max-w-2xl mx-auto mt-4">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex space-x-4">
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

        <div className="flex justify-center items-center w-full">
          <label
            htmlFor="dropzone-file"
            className="flex flex-col justify-center items-center w-full h-64 bg-gray-50 rounded-lg border-2 border-gray-300 border-dashed cursor-pointer dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
          >
            <div className="flex flex-col justify-center items-center pt-5 pb-6">
              <svg
                aria-hidden="true"
                className="mb-3 w-10 h-10 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                ></path>
              </svg>
              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                <span className="font-semibold">Click to upload</span> or drag
                and drop
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                SVG, PNG, JPG or GIF (MAX. 800x400px)
              </p>
            </div>
            <input
              id="dropzone-file"
              type="file"
              className="hidden"
              accept="image/*"
              {...register("image")}
            />
          </label>
        </div>
        <div className="relative z-0 mb-6 w-full group">
          <input type="submit" value="Submit" className="btn btn-primary" />
        </div>
      </form>
    </div>
  );
}
