import Select from "react-select";
import axios from "axios";
import { toast } from "react-toastify";
import { useForm, SubmitHandler } from "react-hook-form";
import { IPromotionCreatePayload } from "../../interfaces";
export default function Promotionform() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IPromotionCreatePayload>();
  const onSubmit: SubmitHandler<IPromotionCreatePayload> = async (data) => {
    data.userId = 1;
    data.shopId = 1;
    //make type, limitPassage and limitAmout   a number
    data.type = Number(data.type);
    data.limitPassage = Number(data.limitPassage);
    data.limitAmout = Number(data.limitAmout);
    JSON.stringify(data);
    try {
      const response = await axios.post(
        import.meta.env.VITE_API_URL + "promotions",
        data
      );
      toast.success("Promotion created successfully");
    } catch (error) {
      toast.error("Error creating promotion" + error);
      console.log(error);
      console.log(data);
    }
  };

  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">Create Promotion</h3>
      </div>
      <div className="card-body">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <label htmlFor="name">name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              placeholder="Enter name"
              {...register("name", { required: true })}
            />
            {errors.name && (
              <span className="text-danger">This field is required</span>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="description">description</label>
            <input
              type="text"
              className="form-control"
              id="description"
              placeholder="Enter description"
              {...register("description", { required: true })}
            />
            {errors.description && (
              <span className="text-danger">This field is required</span>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="type">type</label>
            <select
              className="form-control"
              id="type"
              {...register("type", { valueAsNumber: true })}
            >
              <option value="1">percentage</option>
              <option value="2">amount</option>
            </select>
            {errors.type && (
              <span className="text-danger">This field is required</span>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="startAt">startAt</label>
            <input
              type="date"
              className="form-control"
              id="startAt"
              placeholder="Enter startAt"
              {...register("startAt", { required: true })}
            />
            {errors.startAt && (
              <span className="text-danger">This field is required</span>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="endAt">endAt</label>
            <input
              type="date"
              className="form-control"
              id="endAt"
              placeholder="Enter endAt"
              {...register("endAt", { required: true })}
            />
            {errors.endAt && (
              <span className="text-danger">This field is required</span>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="valimitPassagelue">limitPassage</label>
            <input
              type="number"
              className="form-control"
              id="limitPassage"
              placeholder="Enter limitPassage"
              {...register("limitPassage", { valueAsNumber: true })}
            />
            {errors.limitPassage && (
              <span className="text-danger">This field is required</span>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="limitAmout">limitAmout</label>
            <input
              type="number"
              className="form-control"
              id="limitAmout"
              placeholder="Enter limitAmout"
              {...register("limitAmout", { valueAsNumber: true })}
            />
            {errors.limitAmout && (
              <span className="text-danger">This field is required</span>
            )}
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}
