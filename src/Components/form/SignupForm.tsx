import axios from "axios";
import { toast } from "react-toastify";
import { useForm, SubmitHandler } from "react-hook-form";
import { IUserCreatePayload } from "../../interfaces";

export default function SignupForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IUserCreatePayload>();
  const onSubmit: SubmitHandler<IUserCreatePayload> = async (data) => {
    JSON.stringify(data);
    try {
      const response = await axios.post(
        import.meta.env.VITE_API_URL + "users",
        data
      );
      toast.success("User created successfully");
    } catch (error) {
      toast.error("Error creating user" + error);
      console.log(error);
      console.log(data);
    }
  };
  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">Create User</h3>
      </div>
      <div className="card-body">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <label htmlFor="username">username</label>
            <input
              type="text"
              className="form-control"
              id="username"
              placeholder="username"
              {...register("username", { required: true })}
            />
            {errors.username && (
              <div className="mt-2 alert alert-danger">
                password is required
              </div>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="email"
              {...register("email", { required: true })}
            />
            {errors.email && (
              <div className="mt-2 alert alert-danger">email is required</div>
            )}
          </div>
          <button type="submit" className="btn btn-primary">
            Signup
          </button>
        </form>
      </div>
    </div>
  );
}
