import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { TFacility } from "../types/emergencyFacility";
import { useEffect } from "react";

type TProps = {
  onSubmit: SubmitHandler<FieldValues>;
  lat: number;
  lng: number;
  facility?: TFacility;
};

const FacilityForm = ({ lat, lng, onSubmit, facility }: TProps) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      latitude: lat,
      longitude: lng,
    },
  });

  useEffect(() => {
    if (facility) {
      setValue("name", facility.name);
      setValue("latitude", facility.latitude);
      setValue("longitude", facility.longitude);
      setValue("contact", facility.contactNumber);
      setValue("category", facility.category);
      setValue("status", facility.status);
    }
  }, [facility, setValue]);

  return (
    <div className="bg-white">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-2">
          <label htmlFor="image">Image</label>
          <input
            type="file"
            id="image"
            {...register("image", { required: facility ? false : true })}
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
            <option value="operational">Operational</option>
            <option value="non-operational">Non-Operational</option>
            <option value="non-operational">Full</option>
          </select>
          <button
            className={`${
              facility ? "bg-indigo-500" : "bg-green-500"
            } p-2 rounded text-white`}
            type="submit"
          >
            {facility ? "Update" : "Add"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default FacilityForm;
