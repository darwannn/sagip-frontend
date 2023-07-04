import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

type TProps = {
  onSubmit: SubmitHandler<FieldValues>;
  lat: number;
  lng: number;
};

const MapForm = ({ lat, lng, onSubmit }: TProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: { latitude: lat, longitude: lng },
  });
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-2">
          <label htmlFor="image">Image</label>
          <input
            type="file"
            id="image"
            {...register("image", { required: true })}
          />
          <label htmlFor="name">Name</label>
          <input
            className="border p-1"
            type="text"
            id="name"
            {...register("name", { required: true })}
          />
          {errors.name && <span>This field is required</span>}
          <label htmlFor="">Longitude and Latitude</label>
          <input
            className="border p-1"
            type="text"
            id="lng"
            {...register("longitude", { required: true })}
            disabled
          />
          <input
            className="border p-1"
            type="text"
            id="lat"
            {...register("latitude", { required: true })}
            disabled
          />
          <label htmlFor="contact">Contact Number</label>
          <input
            className="border p-1"
            type="text"
            id="contact"
            {...register("contact", { required: true })}
          />
          {errors.contact && <span>This field is required</span>}
          <label htmlFor="category">Category</label>
          <select
            className="border p-1"
            id="category"
            {...register("category", { required: true })}
          >
            <option value="Hospital">Hospital</option>
            <option value="Police Station">Police Station</option>
            <option value="Fire Station">Fire Station</option>
            <option value="Evacuation Center">Evacuation Center</option>
          </select>
          {errors.category && <span>This field is required</span>}
          <label htmlFor="status">Status</label>
          <select
            className="border p-1"
            id="status"
            {...register("status", { required: true })}
          >
            <option value="Operational">Operational</option>
            <option value="Non-operational">Non Operational</option>
          </select>
          <button className="bg-green-500 p-2 rounded" type="submit">
            {" "}
            Submit{" "}
          </button>
        </div>
      </form>
    </div>
  );
};

export default MapForm;
