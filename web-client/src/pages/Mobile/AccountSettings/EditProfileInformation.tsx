import { LuArrowLeft } from "react-icons/lu";
import MobileHeder from "../../../components/MobileHeader/MobileHeader";
import { useNavigate } from "react-router-dom";
import AddressField from "../../../components/AddressSelector/AddressField";
import {
  useGetUserByTokenQuery,
  useUpdateProfileMutation,
} from "../../../services/accountQuery";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import moment from "moment";
import { useEffect } from "react";
import { toast } from "react-toastify";

const EditProfileInformationPage = () => {
  const navigate = useNavigate();

  // TODO: PROBABLY USE LOADER HERE
  const { data: userData, isLoading } = useGetUserByTokenQuery();

  const {
    register,
    setValue,
    getValues,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm<FieldValues>();

  const [
    updateProfile,
    // {
    //   isError: updateIsError,
    //   isLoading: updateIsLoading,
    //   isSuccess: updateIsSuccess,
    // },
  ] = useUpdateProfileMutation();

  useEffect(() => {
    if (userData) {
      setValue("firstname", userData.firstname);
      setValue("middlename", userData.middlename);
      setValue("lastname", userData.lastname);
      setValue("gender", userData.gender);
      setValue("birthdate", moment(userData?.birthdate).format("YYYY-MM-DD"));
      setValue("street", userData.street);
    }
  }, [userData, setValue]);

  const onUpdateProfileHandler: SubmitHandler<FieldValues> = async (data) => {
    if (!isDirty) return;
    console.log(data);

    const body = new FormData();
    body.append("firstname", data.firstname);
    body.append("middlename", data.middlename);
    body.append("lastname", data.lastname);
    body.append("gender", data.gender);
    body.append("birthdate", data.birthdate);
    body.append("street", data.street);
    body.append("region", data.region);
    body.append("province", data.province);
    body.append("municipality", data.municipality);
    body.append("barangay", data.barangay);

    await toast.promise(
      updateProfile({ body, id: userData?._id }).unwrap,
      {
        pending: "Updating Profile...",
        success: "Profile Updated!",
        error: "Something went wrong",
      },
      {
        position: "top-center",
        draggable: true,
      }
    );
  };

  if (isLoading) {
    return <p>Loading user data...</p>;
  }

  return (
    <div className="min-h-screen w-full pb-28">
      <MobileHeder>
        <div className="flex items-center gap-3">
          <button
            className="p-1.5 bg-white text-gray-500 rounded-md"
            onClick={() => navigate(-1)}
          >
            <LuArrowLeft />
          </button>
          <h1 className="font-semibold">Profile Settings</h1>
        </div>
      </MobileHeder>
      <form
        onSubmit={handleSubmit(onUpdateProfileHandler)}
        className="p-5 text-sm flex flex-col gap-3"
      >
        <div className="flex flex-col gap-3">
          <div className="form-group">
            <label htmlFor="firstname" className="form-label">
              First Name
            </label>
            <input
              type="text"
              id="firstname"
              className="form-input shadow-none"
              {...register("firstname", { required: true })}
            />
          </div>
          <div className="form-group">
            <label htmlFor="middlename" className="form-label">
              Middle Name
            </label>
            <input
              type="text"
              id="middlename"
              className="form-input shadow-none"
              {...register("middlename", { required: true })}
            />
          </div>
          <div className="form-group">
            <label htmlFor="lastname" className="form-label">
              Last Name
            </label>
            <input
              type="text"
              id="lastname"
              className="form-input shadow-none"
              {...register("lastname", { required: true })}
            />
          </div>
        </div>
        <div className="form-group">
          <p className="form-label">Gender</p>
          <div className="mt-1 flex flex-col gap-2">
            <label htmlFor="male" className="mr-3">
              <input
                type="radio"
                className="mr-1"
                id="male"
                value="Male"
                {...register("gender", { required: true })}
              />
              Male
            </label>
            <label htmlFor="female" className="">
              <input
                type="radio"
                className="mr-1"
                id="female"
                value="Female"
                {...register("gender", { required: true })}
              />
              Female
            </label>
          </div>
        </div>
        <div className="form-group">
          <AddressField
            inMalolos={false}
            style="account"
            {...{
              register,
              errors,
              userData,
              setValue,
              getValues,
            }}
          />
        </div>
        <button type="submit" className="btn-primary mt-5">
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default EditProfileInformationPage;
