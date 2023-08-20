import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

import { User } from "../../../types/user";

import { useUpdateProfileMutation } from "../../../services/accountQuery";

import { BASE_IMAGE_URL } from "../../../api.config";

import { MdClose } from "react-icons/md";

import "cropperjs/dist/cropper.css";
import moment from "moment";

import AddressField from "../../../components/AddressSelector/AddressField";
import ImageCropper from "../../../components/ImageCropper/ImageCropper";

type TProps = {
  userData?: User;
};

const AccountProfileForm = ({ userData }: TProps) => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [image, setImage] = useState<string>("");
  const [hasBeenCropped, setHasBeenCropped] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<string | undefined>(`
  ${BASE_IMAGE_URL}/user/${userData?.profilePicture}
  `);
  const [serverRes, setServerRes] = useState<any>();

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
    handleSubmit,
    formState: { isDirty, errors },
    reset,
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
      /* region: "",
      province: "",
      municipality: "",
      barangay: "", */
    },
  });

  /* trigger the query when the image has been cropped */
  useEffect(() => {
    if (hasBeenCropped) {
      handleSubmit(onCrop)();
    }
  }, [hasBeenCropped]);

  const SubmitProfileData = async (data: FieldValues, action: string) => {
    if (action === "info") {
      const isImageChanged = !!data.profilePicture[0];

      if (!isDirty && !isImageChanged) {
        console.log("No changes made");
        return;
      }
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
    if (action === "picture") {
      body.append(
        "hasChanged",
        `${userData && data.profilePicture[0] != null ? true : false}`
      );

      if (selectedImage) {
        const imageBlob = await fetch(selectedImage).then((res) => res.blob());
        body.append("image", imageBlob, "profilePicture.png");
      }
    }

    if (userData) {
      const res = await updateProfile({
        body,
        id: userData._id,
      });

      if (res && "data" in res) {
        setHasBeenCropped(false);
        console.log(res);

        if (res.data.success) {
          if (action === "info") {
            setServerRes(res.data);
          }
        }
      } else {
        setServerRes(res.error);
      }
    }
  };

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    SubmitProfileData(data, "info");
  };
  const onCrop: SubmitHandler<FieldValues> = async (data) => {
    SubmitProfileData(data, "picture");
  };

  const handleImageChange = (e: any) => {
    const file = e.target.files?.[0];
    if (file) {
      setShowModal(true);
      e.preventDefault();
      let files;
      if (e.dataTransfer) {
        files = e.dataTransfer.files;
      } else if (e.target) {
        files = e.target.files;
      }
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result as any);
        console.log(reader.result as any);
      };
      reader.readAsDataURL(files[0]);
    }
  };

  if (updateIsLoading) console.log("Updating...");
  if (updateIsError) console.log("Error updating");
  if (updateIsSuccess) console.log("Updated successfully");

  return (
    <div className=" bg-white p-8 rounded-xl relative">
      <button
        className="absolute top-4 right-4 hover:bg-gray-300 rounded  text-gray-500 cursor-pointer"
        onClick={() => {
          navigate("/account-settings");
        }}
      >
        <MdClose />
      </button>
      <div className="text-3xl font-bold ">Update Profile</div>
      <form>
        {serverRes?.success && (
          <div className="w-full bg-green-500 text-white p-2 my-3 rounded-md text-center">
            {serverRes?.message}
          </div>
        )}
        <div className="w-full flex flex-col items-center justify-center mb-10 mt-5">
          <div className="relative w-40 h-40 rounded-full overflow-hidden border">
            {!image && (
              <>
                <div className="w-full px-6 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-sm text-white text-center leading-4 z-20">
                  Tap to update profile picture
                </div>
                <div className="w-full h-full absolute bg-black opacity-50 z-10"></div>
              </>
            )}

            <input
              type="file"
              id="profilePicture"
              accept="image/*"
              title=" "
              className="opacity-0 absolute w-full h-full top-0 left-0 cursor-pointer z-30"
              {...register("profilePicture")}
              onChange={handleImageChange}
            />
            <img className="" id="profilePictureImg" src={selectedImage} />
          </div>
          {(errors.profilePicture || !serverRes?.success) && (
            <span className="text-red-500">
              {errors.profilePicture
                ? "Picture is required"
                : serverRes?.profilePicture}
            </span>
          )}
        </div>
        <ImageCropper
          image={image}
          setCroppedImage={setSelectedImage}
          showModal={showModal}
          setShowModal={setShowModal}
          setHasBeenCropped={setHasBeenCropped}
        />

        <h2 className="font-bold">Personal Information</h2>
        <div className="flex flex-wrap ">
          <div className="flex flex-col mt-5 p-2 w-full lg:w-1/2 xl:w-1/3">
            <label htmlFor="firstname">First Name</label>
            <input
              type="text"
              id="firstname"
              className="border p-1 w-full"
              placeholder="First Name"
              {...register("firstname", { required: true })}
            />
            {errors.firstname && (
              <span className="text-red-500">First Name is required</span>
            )}
          </div>

          <div className="flex flex-col mt-5 p-2 w-full lg:w-1/2 xl:w-1/3">
            <label htmlFor="middlename">Middle Name</label>
            <input
              type="text"
              id="middlename"
              className="border p-1 w-full"
              placeholder="Middle Name"
              {...register("middlename", { required: true })}
            />
            {errors.middlename && (
              <span className="text-red-500">Middle Name is required</span>
            )}
          </div>

          <div className="flex flex-col mt-5 p-2 w-full lg:w-1/2 xl:w-1/3">
            <label htmlFor="lastname">Last Name</label>
            <input
              type="text"
              id="lastname"
              className="border p-1 w-full"
              placeholder="Last Name"
              {...register("lastname", { required: true })}
            />
            {errors.lastname && (
              <span className="text-red-500">Last Name is required</span>
            )}
          </div>

          <div className="flex flex-col mt-5 p-2 w-full lg:w-1/2 xl:w-1/3">
            <label htmlFor="birthdate">Birthdate</label>
            <input
              type="date"
              id="birthdate"
              className="border p-1 w-full"
              placeholder="Birthdate"
              {...register("birthdate", { required: true })}
            />
            {errors.birthdate && (
              <span className="text-red-500">Birthdate is required</span>
            )}
          </div>

          <div className="flex flex-col mt-5 p-2 w-full lg:w-1/2 xl:w-1/3">
            <label>Gender</label>
            <div>
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
              <label htmlFor="female">
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

        <h2 className="font-bold mt-10">Address</h2>
        <div className="flex flex-wrap">
          <AddressField
            inMalolos={false}
            style="account"
            {...{
              register,
              errors,
              userData,
              setValue,
            }}
          />
        </div>

        <div className="w-full mt-5">
          <button
            className="w-full lg:w-auto bg-indigo-500 text-white px-5 py-1 my-2 rounded disabled:bg-indigo-300"
            onClick={handleSubmit(onSubmit)}
            disabled={updateIsLoading && !hasBeenCropped}
          >
            Update
          </button>
        </div>
      </form>
    </div>
  );
};

export default AccountProfileForm;
