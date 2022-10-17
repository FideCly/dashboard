import axios from "axios";
import { toast } from "react-toastify";
import { useForm, SubmitHandler } from "react-hook-form";
import { ICardCreatePayload } from "../../interfaces";
export default function Cardform() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ICardCreatePayload>();
  const onSubmit: SubmitHandler<ICardCreatePayload> = async (data) => {
    data.shopId = 1;
    data.userId = 1;
    try {
      const response = await axios.post(
        import.meta.env.VITE_API_URL + "wallet",
        {
          data,
        }
      );
      toast.success("Card created successfully");
    } catch (error) {
      toast.error("Error creating card" + error);
    }
  };
  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">Create Card</h3>
      </div>
      <div className="card-body">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <label htmlFor="url">Url</label>
            <input
              type="text"
              className="form-control"
              id="url"
              placeholder="url"
              {...register('url', { required: true })}
            />
            {errors.url && <div className="mt-2 alert alert-danger">url is required</div>}
          </div>
          <div className="form-group">
            <label htmlFor="startAt">Start date</label>
            <input
              type="Date"
              className="form-control"
              id="startAt"
              placeholder="startAt"
              {...register('startAt', { required: true })}
            />
            {errors.startAt && (
              <div className="mt-2 alert alert-danger">Start date is required is required</div>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="endAt">End date</label>
            <input
              type="date"
              className="form-control"
              id="endAt"
              placeholder="endAt"
              {...register('endAt', { required: true })}
            />
            {errors.endAt && <div className="mt-2 alert alert-danger">End date is required</div>}
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
