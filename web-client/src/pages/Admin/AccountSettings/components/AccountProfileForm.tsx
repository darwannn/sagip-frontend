import { useState, useRef } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

import { TUserResData } from "../../../../types/user";

import {
  useGetUserByTokenQuery,
  useUpdateProfileMutation,
} from "../../../../services/accountQuery";

import "cropperjs/dist/cropper.css";
import moment from "moment";

import AccountProfilePicture from "./AccountProfilePicture";
import AddressField from "../../../../components/AddressSelector/AddressField";

const AccountProfileForm = () => {
  const successMessageRef = useRef<HTMLDivElement | null>(null);
  const { data: userData } = useGetUserByTokenQuery();
  const [hasBeenCropped, setHasBeenCropped] = useState<boolean>(false);
  const [serverRes, setServerRes] = useState<TUserResData>();

  const [
    updateProfile,
    {
      isError: updateIsError,
      isLoading: updateIsLoading,
      isSuccess: updateIsSuccess,
    },
  ] = useUpdateProfileMutation();

  const {
    register,
    setValue,
    getValues,
    handleSubmit,
    formState: { isDirty, errors },
  } = useForm<FieldValues>({
    defaultValues: {
      status: userData?.status,
      isBanned: userData?.isBanned,
      userType: userData?.userType,
      firstname: userData?.firstname,
      middlename: userData?.middlename,
      lastname: userData?.lastname,
      birthdate: moment(userData?.birthdate).format("YYYY-MM-DD"),
      street: userData?.street,
      gender: userData?.gender,
      region: userData?.region,
      province: userData?.province,
      municipality: userData?.municipality,
      barangay: userData?.barangay,
    },
  });

  const SubmitProfileData = async (data: FieldValues) => {
    if (!isDirty) {
      console.log("No changes made");
      return;
    }
    const body = new FormData();
    body.append("firstname", data.firstname);
    body.append("middlename", data.middlename);
    body.append("lastname", data.lastname);
    body.append("birthdate", data.birthdate);
    body.append("region", data.region);
    body.append("province", data.province);
    body.append("municipality", data.municipality);
    body.append("barangay", data.barangay);
    body.append("street", data.street);
    body.append("gender", data.gender);

    if (userData) {
      const res = await updateProfile({
        body,
        id: userData._id,
      });

      if (res && "data" in res) {
        setHasBeenCropped(false);
        console.log(res);

        if (res.data.success) {
          setServerRes(res.data);
          successMessageRef.current?.scrollIntoView({
            behavior: "smooth",
          });
        }
      } else {
        if ("error" in res && "data" in res.error) {
          const errData = res.error.data as TUserResData;
          setServerRes(errData);
        }
      }
    }
  };

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    SubmitProfileData(data);
  };

  if (updateIsLoading) console.log("Updating...");
  if (updateIsError) console.log("Error updating");
  if (updateIsSuccess) console.log("Updated successfully");

  return (
    <div className="relative" ref={successMessageRef}>
      <form>
        {serverRes?.success && (
          <div className="w-full bg-green-500 text-white p-2 my-3 rounded-md text-center">
            {serverRes?.message}
          </div>
        )}

        <section className="mb-10">
          <div className="mb-5 text-sm">
            <h3 className="text-lg font-semibold">Personal Information</h3>
            <p>
              This information will be displayed publicly so be careful what you
              put
            </p>
          </div>
          <hr />
          <div className="text-sm mt-5 grid gap-5 md:grid-cols-3">
            <div className="form-group col-span-3">
              <span className="form-label">Profile Picture</span>
              <AccountProfilePicture userData={userData} />
            </div>
            <div className="form-group">
              <label htmlFor="firstname" className="form-label">
                First Name
              </label>
              <input
                type="text"
                id="firstname"
                className="border p-2 rounded w-full"
                placeholder="First Name"
                {...register("firstname", { required: true })}
              />
              {errors.firstname && (
                <span className="text-red-500">First Name is required</span>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="middlename" className="form-label">
                Middle Name
              </label>
              <input
                type="text"
                id="middlename"
                className="border p-2 rounded w-full"
                placeholder="Middle Name"
                {...register("middlename", { required: true })}
              />
              {errors.middlename && (
                <span className="text-red-500">Middle Name is required</span>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="lastname" className="form-label">
                Last Name
              </label>
              <input
                type="text"
                id="lastname"
                className="border p-2 w-full rounded"
                placeholder="Last Name"
                {...register("lastname", { required: true })}
              />
              {errors.lastname && (
                <span className="text-red-500">Last Name is required</span>
              )}
            </div>
            <div className="form-group col-span-3">
              <label htmlFor="birthdate" className="form-label">
                Birthdate
              </label>
              <input
                type="date"
                id="birthdate"
                className="border p-2 rounded md:w-[250px] w-full"
                placeholder="Birthdate"
                {...register("birthdate", { required: true })}
              />
              {errors.birthdate && (
                <span className="text-red-500">Birthdate is required</span>
              )}
            </div>
            <div className="form-group">
              <span className="form-label">Gender</span>
              <div className="mt-2 flex flex-col gap-2">
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
              {errors.gender && (
                <span className="text-red-500">Gender is required</span>
              )}
            </div>
          </div>
        </section>

        <section>
          <div className="mb-5 text-sm">
            <h3 className="text-lg font-semibold">Address</h3>
          </div>
          <hr />
          <div className="grid grid-cols-3 gap-5 mt-5 text-sm">
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
        </section>

        <div className="w-full mt-10 ">
          <button
            className="btn-primary"
            onClick={handleSubmit(onSubmit)}
            disabled={(updateIsLoading && !hasBeenCropped) || !isDirty}
          >
            Update Profile
          </button>
        </div>
      </form>
    </div>
  );
};

export default AccountProfileForm;
