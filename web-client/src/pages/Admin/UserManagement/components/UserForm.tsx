import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

import { useNavigate } from "react-router-dom";
// Types
import { User, TUserResData } from "../../../../types/user";
//Services
import { useAddUserMutation } from "../../../../services/usersQuery";
import { BiCheckCircle } from "react-icons/bi";
// import { toast } from "react-toastify";

const UserForm = () => {
  const [serverRes, setServerRes] = useState<TUserResData>();
  const [
    addUser,
    {
      isError: addIsError,
      isLoading: addIsLoading,
      isSuccess: addIsSuccess,
      error: addErr,
    },
  ] = useAddUserMutation();

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { isDirty, errors },
  } = useForm<FieldValues>();

  const SubmitUserData = async (data: FieldValues) => {
    if (!isDirty) {
      console.log("No changes made");
      return;
    }
    const body: Partial<User> = {
      contactNumber: data.contactNumber,
      email: data.email,
      status: data.status,
      userType: data.userType,
      firstname: data.firstname,
      middlename: data.middlename,
      lastname: data.lastname,
    };

    // const res = await toast.promise(addUser(body).unwrap, {
    //   pending: "Loading...",
    //   success: "User has been added",
    //   error: "Something went wrong",
    // });

    // if(res && res.success) {
    //   reset();
    // }

    const res = await addUser(body);

    if ("data" in res) {
      setServerRes(res.data);
      if (res.data.success) {
        navigate(`/admin/users`);
      }
      reset();
    } else {
      if ("error" in res && "data" in res.error) {
        const errData = res.error.data as TUserResData;
        setServerRes(errData);
      }
    }
  };

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    SubmitUserData(data);
  };

  // if (addIsLoading) console.log("Loading...");
  if (addIsError) {
    if (addErr && "status" in addErr) {
      "data" in addErr ? (addErr.data as TUserResData) : null;
    }
  }

  return (
    <form className="flex flex-col gap-3 mt-2">
      {addIsSuccess && (
        <div className="flex flex-row items-center bg-green-100 border-l-2 border-l-green-500 p-2 text-sm">
          <BiCheckCircle className="text-green-500 mr-2" />
          <p className="text-green-500">User added successfully</p>
        </div>
      )}

      <div className="form-group text-sm">
        <label htmlFor="firstname" className="form-label text-sm">
          First Name
        </label>
        <input
          type="text"
          id="firstname"
          className="form-input"
          placeholder="First Name"
          {...register("firstname", { required: true })}
        />
        {errors.firstname && (
          <span className="text-red-500">First Name is required</span>
        )}
      </div>

      <div className="form-group text-sm">
        <label htmlFor="middlename" className="form-label text-sm">
          Middle Name
        </label>
        <input
          type="text"
          id="middlename"
          className="form-input"
          placeholder="Middle Name"
          disabled={addIsLoading}
          {...register("middlename", { required: true })}
        />
        {errors.middlename && (
          <span className="text-red-500">Middle Name is required</span>
        )}
      </div>

      <div className="form-group text-sm">
        <label htmlFor="lastname" className="form-label">
          Last Name
        </label>
        <input
          type="text"
          id="lastname"
          className="form-input"
          placeholder="Last Name"
          disabled={addIsLoading}
          {...register("lastname", { required: true })}
        />
        {errors.lastname && (
          <span className="text-red-500">Last Name is required</span>
        )}
      </div>

      {/* {!userData && (
     <> */}
      <div className="form-group text-sm">
        <label htmlFor="email" className="form-label">
          Email
        </label>
        <input
          type="email"
          id="email"
          className="form-input"
          placeholder="Email"
          disabled={addIsLoading}
          {...register("email", { required: true })}
        />

        {(errors.email || !serverRes?.success) && (
          <span className="text-red-500">
            {errors.email ? "Email Number is required" : serverRes?.email}
          </span>
        )}
      </div>

      <div className="form-group text-sm">
        <label htmlFor="contactNumber" className="form-label">
          Contact Number
        </label>
        <input
          type="text"
          id="contactNumber"
          className="form-input"
          placeholder="Contact Number"
          maxLength={11}
          disabled={addIsLoading}
          {...register("contactNumber", { required: true })}
        />
        {(errors.contactNumber || !serverRes?.success) && (
          <span className="text-red-500">
            {errors.contactNumber
              ? "Contact Number is required"
              : serverRes?.contactNumber}
          </span>
        )}
      </div>

      {/* {!(userData?.userType === "resident") && ( */}
      <div className="form-group text-sm">
        <label htmlFor="userType" className="form-label">
          Role
        </label>
        <select
          id="userType"
          className="border p-2 rounded"
          disabled={addIsLoading}
          {...register("userType", { required: true })}
        >
          <option value="resident">Resident</option>
          <option value="dispatcher">Dispatcher</option>
          <option value="responder">Responder</option>
          <option value="admin">Admin</option>
          <option value="super-admin">Super-admin</option>
        </select>
      </div>
      {/* )} */}

      {/* uncomment if needed */}
      {/* <div className="flex flex-col mt-5 p-2 w-full sm:w-1/2 md:w-1/3">
        <label htmlFor="status">Account Status</label>
        <select id="status" {...register("status")}>
          <option value="unverified">Unverified</option>
          <option value="semi-verified">Semi-verified</option>
          <option value="verified">Verified</option>
        </select>
      </div> */}

      <div className="w-full mt-5">
        <button
          className="btn-primary float-right"
          onClick={handleSubmit(onSubmit)}
          disabled={addIsLoading}
        >
          {"Add User"}
        </button>
      </div>
    </form>
  );
};

export default UserForm;
