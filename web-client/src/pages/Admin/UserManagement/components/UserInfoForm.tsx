import { FieldValues, useForm } from "react-hook-form";
import moment from "moment";
import AddressField from "../../../../components/AddressSelector/AddressField";
import { useParams } from "react-router-dom";
import {
  useGetUserByIdQuery,
  useUpdateUserMutation,
} from "../../../../services/usersQuery";
import { User } from "../../../../types/user";
import { toast } from "react-toastify";

const UserInfoForm = () => {
  const { userId } = useParams<{ userId: string }>();
  const { data: userData, isLoading, isError } = useGetUserByIdQuery(userId);
  const [
    updateUser,
    {
      isLoading: updateIsLoading,
      // isSuccess: updateIsSuccess,
    },
  ] = useUpdateUserMutation();

  const {
    register,
    setValue,
    getValues,
    handleSubmit,
    formState: { isDirty, errors },
  } = useForm<FieldValues>({
    defaultValues: {
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

  const submitUserData = async (data: FieldValues) => {
    const body: Partial<User> = {
      userType: data.userType,
      firstname: data.firstname,
      middlename: data.middlename,
      email: userData?.email,
      lastname: data.lastname,
      birthdate: data.birthdate,
      street: data.street,
      gender: data.gender,
      region: data.region,
      province: data.province,
      municipality: data.municipality,
      barangay: data.barangay,
    };

    const res = await toast.promise(
      updateUser({ body, id: userId || "" }).unwrap,
      {
        pending: "Updating User Information...",
        success: "User Information Updated!",
        error: "Error Updating User Information",
      }
    );

    if (res) {
      if (res.success) {
        console.log("success");
      }
    }
  };

  if (isLoading) {
    return <p className="text-center">Loading User Information ...</p>;
  }

  if (isError) {
    return <p className="text-center">Failed to fetch user information</p>;
  }

  return (
    <div>
      <form className="">
        <section className="">
          <div className="text-sm">
            <h3 className="text-lg font-semibold">Personal Information</h3>
          </div>
          <hr className="my-5" />
          {/* name section */}
          <div className="grid grid-cols-3 gap-x-3 gap-y-5 mb-5">
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
        <section className="mt-5">
          <button
            type="submit"
            onClick={handleSubmit(submitUserData)}
            className="btn-primary"
            disabled={!isDirty || updateIsLoading}
          >
            Edit User Information
          </button>
        </section>
      </form>
    </div>
  );
};

export default UserInfoForm;
