import axios from "axios";
import { toast } from "react-toastify";
import { useForm, SubmitHandler } from "react-hook-form";
import { IShopCreatePayload } from "../../interfaces";
import { json } from "@remix-run/node";

export default function ShopForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IShopCreatePayload>();
  const onSubmit: SubmitHandler<IShopCreatePayload> = async (data) => {
    // data.userId = 1;
    JSON.stringify(data);
    try {
      const response = await axios.post(
        import.meta.env.VITE_API_URL + "shops",
        data
      );
      toast.success("Shop created successfully");
    } catch (error) {
      toast.error("Error creating shop" + error);
    }
  };
  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">Create Shop</h3>
      </div>
      <div className="card-body">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <label htmlFor="companyName">Name</label>
            <input
              type="text"
              className="form-control"
              id="companyName"
              placeholder="Enter company name"
              {...register('companyName', { required: true })}
            />
            {errors.companyName && <span className="text-danger">This field is required</span>}
          </div>
          <div className="form-group">
            <label htmlFor="siren">SIREN</label>
            <input
              type="text"
              className="form-control"
              id="siren"
              placeholder="Enter SIREN"
              {...register('siren', { required: true })}
            />
            {errors.siren && <span className="text-danger">This field is required</span>}
          </div>
          <div className="form-group">
            <label htmlFor="siret">SIRET</label>
            <input
              type="text"
              className="form-control"
              id="siret"
              placeholder="Enter SIRET"
              {...register('siret', { required: true })}
            />
            {errors.siret && <span className="text-danger">This field is required</span>}
          </div>
          <div className="form-group">
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="text"
                className="form-control"
                id="email"
                placeholder="Enter email"
                {...register('email', { required: true })}
              />
              {errors.email && <span className="text-danger">This field is required</span>}
            </div>
            <div className="form-group">
              <label htmlFor="zipCode">Zip code</label>
              <input
                type="text"
                className="form-control"
                id="zipCode"
                placeholder="Enter zip code"
                {...register('zipCode', { required: true })}
              />
              {errors.zipCode && <span className="text-danger">This field is required</span>}
            </div>
            <div className="form-group">
              <label htmlFor="geoloc">Geolocation</label>
              <input
                type="text"
                className="form-control"
                id="geoloc"
                placeholder="Enter geolocation"
                {...register('geoloc', { required: true })}
              />
              {errors.geoloc && <span className="text-danger">This field is required</span>}
            </div>
            <div className="form-group">
              <label htmlFor="phone">Phone number</label>
              <input
                type="text"
                className="form-control"
                id="phone"
                placeholder="Enter phone number"
                {...register('phone', { required: true })}
              />
              {errors.phone && <span className="text-danger">This field is required</span>}
            </div>
            <label htmlFor="address">Address</label>
            <input
              type="text"
              className="form-control"
              id="address"
              placeholder="Enter address"
              {...register('address', { required: true })}
            />
            {errors.address && <span className="text-danger">This field is required</span>}
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}
