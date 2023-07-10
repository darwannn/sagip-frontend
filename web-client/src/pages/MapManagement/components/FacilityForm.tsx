import {
  Controller,
  FieldValues,
  SubmitHandler,
  useForm,
  useWatch,
} from "react-hook-form";
import { TFacility } from "../types/emergencyFacility";
import { useEffect, useState } from "react";
import {
  useAddFacilityMutation,
  useUpdateFacilityMutation,
} from "../../../services/facilityQuery";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import {
  selectTempMarkerPos,
  setAddMode,
} from "../../../store/slices/facilitySlice";
import FileDropzone from "../../../components/Form/FileDropzone";
import { BASE_IMAGE_URL } from "../../../api.config";

type TProps = {
  facility?: TFacility;
};

const FacilityForm = ({ facility }: TProps) => {
  const dispatch = useAppDispatch();
  const tempMarkerPos = useAppSelector(selectTempMarkerPos);
  const {
    register,
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FieldValues>();

  const [editImage, setEditImage] = useState(false);
  const imageState = useWatch({ control, name: "coverImage" });

  useEffect(() => {
    setEditImage(false);
    if (facility) {
      setValue("name", facility.name);
      setValue("latitude", facility.latitude);
      setValue("longitude", facility.longitude);
      setValue("contact", facility.contactNumber);
      setValue("category", facility.category);
      setValue("status", facility.status);
    } else if (tempMarkerPos) {
      setValue("latitude", tempMarkerPos.lat);
      setValue("longitude", tempMarkerPos.lng);
    }
  }, [facility, imageState, setValue, tempMarkerPos]);

  const [
    addFacility,
    {
      isError: isAddFacilityError,
      isLoading: isAddFacilityLoading,
      error: addFacilityError,
    },
  ] = useAddFacilityMutation();
  const [updateFacility, updateFacilityState] = useUpdateFacilityMutation();

  // Adding facility error handling
  if (isAddFacilityLoading) console.log("Loading...");
  if (isAddFacilityError) console.log(addFacilityError);

  // Updating facility error handling
  if (updateFacilityState.isLoading) console.log("Loading...");
  if (updateFacilityState.isError) console.log(updateFacilityState.error);

  const onSubmitMapHandler: SubmitHandler<FieldValues> = async (data) => {
    console.log(data);
    const body = new FormData();
    body.append("image", data.coverImage);
    body.append("name", data.name);
    body.append("latitude", data.latitude);
    body.append("longitude", data.longitude);
    body.append("contactNumber", data.contact);
    body.append("category", data.category);
    body.append("status", data.status);
    body.append("hasChanged", "false");

    if (facility) {
      console.log("updating");
      updateFacility({ body, id: facility._id });
      return;
    }
    addFacility({ body });
    dispatch(setAddMode(false));
  };

  return (
    <div className="bg-gray-50 mx-2 p-3 w-[400px] fixed right-0 top-[50%] translate-y-[-50%] z-10 rounded-md shadow-md">
      {facility && (
        <div className="py-3">
          {/* <span>
            <FacilityIcon facilityType={facility.category} />
          </span> */}
          <span className="text-2xl font-bold">Facility Details</span>
        </div>
      )}
      <form onSubmit={handleSubmit(onSubmitMapHandler)}>
        <div className="flex flex-col gap-2">
          {facility && !editImage ? (
            <div className="group relative w-full h-52 border rounded-md">
              <img
                className="w-full h-full rounded object-cover"
                src={`${BASE_IMAGE_URL}/emergency-facility/${facility.image}`}
                alt={facility.name}
              />
              <div
                className="absolute top-0 z-10 w-full h-full rounded bg-black bg-opacity-70 flex flex-col justify-center items-center cursor-pointer invisible transition-all group-hover:visible"
                onClick={() => setEditImage(true)}
              >
                <span className="text-white"> Click to change image </span>
              </div>
            </div>
          ) : (
            <Controller
              name="coverImage"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <>
                  {errors.coverImage && (
                    <span className="text-red-500">
                      Cover Image is required
                    </span>
                  )}
                  {imageState && (
                    <div>
                      <img src={URL.createObjectURL(imageState)} alt="cover" />
                    </div>
                  )}
                  <FileDropzone onChange={field.onChange} />
                </>
              )}
            />
          )}
          {/* <label htmlFor="image">Image</label>
          <input
            type="file"
            id="image"
            {...register("image", { required: facility ? false : true })}
          /> */}
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
