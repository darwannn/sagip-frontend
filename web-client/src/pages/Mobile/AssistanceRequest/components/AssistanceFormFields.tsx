import {
  UseFormRegister,
  FieldValues,
  FieldErrors,
  SubmitHandler,
  UseFormHandleSubmit,
  Control,
  DeepPartialSkipArrayKey,
} from "react-hook-form";

import { useCallback, useState } from "react";

import { useAppDispatch, useAppSelector } from "../../../../store/hooks";

import { BASE_IMAGE_URL, BASE_VIDEO_URL } from "../../../../api.config";
import { TAssistanceRequest } from "../../../../types/assistanceRequest";
import {
  selectAddMode,
  setAddMode,
} from "../../../../store/slices/facilitySlice";

import MobileHeader from "../../../../components/MobileHeader/MobileHeader";
/* import MapComponent from "./MapComponent"; */
import MapComponent from "../../../Admin/FacilityManagement/components/MapComponent";
import CurrentLocation from "../../HazardMap/components/CurrentLocation";

import { AiOutlineCamera } from "react-icons/ai";
import { BsCameraVideo } from "react-icons/bs";
import { IoLocationOutline } from "react-icons/io5";
import { MdChevronLeft } from "react-icons/md";
import { setDisplayedAssistancePage } from "../../../../store/slices/assistanceReqSlice";
/* import { MdChevronLeft } from "react-icons/md"; */

type TProps = {
  assistanceData: TAssistanceRequest | null;
  isFieldRequired: boolean;
  setIsFieldRequired: React.Dispatch<React.SetStateAction<boolean>>;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors<FieldValues>;
  serverRes: TAssistanceRequest | undefined;
  handleSubmit: UseFormHandleSubmit<FieldValues, undefined>;
  onSubmit: (param: string) => SubmitHandler<FieldValues>;
  useWatch: <TFieldValues extends FieldValues>(props: {
    control: Control<TFieldValues>;
    name: string;
  }) => DeepPartialSkipArrayKey<TFieldValues>;
  control: Control<FieldValues, string>;
  setEditProof: (value: boolean) => void;
  updateIsLoading: boolean;
  addIsLoading: boolean;
  proofType: string;
  setProofType: (value: string) => void;
  setIsVideoRequired: (value: boolean) => void;
  setIsImageRequired: (value: boolean) => void;
  isVideoRequired: boolean;
  isImageRequired: boolean;
  setIsUsingCurrentLocation: (value: boolean) => void;
};

const AssistanceFormFields = ({
  assistanceData,
  isFieldRequired,
  setIsFieldRequired,
  register,
  handleSubmit,
  errors,
  serverRes,
  onSubmit,
  useWatch,
  control,
  setEditProof,
  proofType,
  setProofType,
  updateIsLoading,
  addIsLoading,
  setIsVideoRequired,
  setIsImageRequired,
  isVideoRequired,
  isImageRequired,
  setIsUsingCurrentLocation,
}: TProps) => {
  const dispatch = useAppDispatch();
  /* const navigate = useNavigate(); */

  const [map, setMap] = useState<google.maps.Map | null>(null);
  const addMode = useAppSelector(selectAddMode);

  const uploadedImage = useWatch({ control, name: "image" });
  const uploadedVideo = useWatch({ control, name: "video" });

  const onMapLoad = useCallback((map: google.maps.Map) => {
    setMap(map);
  }, []);

  return (
    <>
      <div className="bg-white flex flex-col min-h-screen pb-5">
        <MobileHeader
          component={
            <>
              <div className="flex items-center  text-2xl text-white font-bold gap-2">
                <div>
                  <MdChevronLeft
                    className="text-4xl"
                    onClick={() => {
                      dispatch(setDisplayedAssistancePage("questionThree"));
                    }}
                  />
                </div>
                <div>Emergency Request </div>
              </div>
            </>
          }
        />

        <div className="flex flex-col flex-1 px-5 py-5  rounded-lg gap-5">
          {addMode && (
            <button
              className="bg-secondary-400 text-white gap-2 py-2 text-center rounded-md"
              onClick={() => {
                dispatch(setAddMode(!addMode));
                setIsUsingCurrentLocation(true);
              }}
            >
              Use Current Location
            </button>
          )}
          {/* map container */}
          <div className=" h-[300px] relative">
            {!addMode && (
              <div
                className="flex items-center justify-center w-full h-full absolute top-0 right-0 z-10"
                style={{ backgroundColor: "rgba(0,0,0,0.3)" }}
              >
                <button
                  className="w-1/2 flex items-center justify-center bg-secondary-400 text-white gap-2 py-2 rounded-md "
                  onClick={() => {
                    dispatch(setAddMode(!addMode));
                  }}
                >
                  <IoLocationOutline className="text-2xl" />
                  Mark the location
                </button>
              </div>
            )}

            <MapComponent
              onSetMapHandler={onMapLoad}
              containerStyle={{
                width: "100%",
                height: "300px",
              }}
            >
              <div className="absolute top-5 right-5">
                <CurrentLocation map={map} />
              </div>
            </MapComponent>
          </div>
          {(errors.longitude || !serverRes?.success) && (
            <span className="text-red-500 -mt-5">
              {" "}
              {errors.longitude
                ? "Please mark the location"
                : serverRes?.longitude}
            </span>
          )}

          {/* hidden coordinates field */}
          <div className="hidden">
            <input
              type="text"
              id="lng"
              {...register("longitude", { required: isFieldRequired })}
              disabled
            />

            <input
              type="text"
              id="lat"
              {...register("latitude", { required: isFieldRequired })}
              disabled
            />
          </div>

          {/* additional info */}
          <div className="flex flex-col">
            <label htmlFor="description" className=" mb-2">
              Please provide additional information:
            </label>
            <textarea
              className="bg-gray-100 p-3 rounded-md"
              id="description"
              placeholder="What is happening?"
              rows={5}
              {...register("description", { required: isFieldRequired })}
            />
            {errors.description && (
              <span className="text-red-500">This field is required</span>
            )}
          </div>
          {/* capture */}
          <div>
            <div className=" mb-2">
              {assistanceData ? "Recapture" : "Capture"} what is going on around
              you:
            </div>
            <div className="w-full flex gap-5">
              <div className="w-1/2 ">
                <label
                  htmlFor="imageProof"
                  className=" flex items-center justify-center bg-primary-300 text-white gap-2 py-2 rounded-md"
                  onClick={() => {
                    window.AndroidInterface?.setMediaChooser("camera");
                  }}
                >
                  <BsCameraVideo className="text-2xl" /> Photo
                </label>
                <input
                  id="imageProof"
                  className="hidden"
                  type="file"
                  accept="image/*;capture=camera"
                  {...register("image", {
                    required: isImageRequired && isFieldRequired,
                  })}
                  onInput={() => {
                    setProofType("image");
                    setEditProof(true);
                    setIsVideoRequired(false);
                  }}
                />
              </div>
              <div className="w-1/2 ">
                <label
                  htmlFor="videoProof"
                  className="flex items-center justify-center bg-primary-300 text-white gap-2 py-2 rounded-md"
                  onClick={() => {
                    window.AndroidInterface?.setMediaChooser("camcorder");
                  }}
                >
                  <AiOutlineCamera className="text-2xl" /> Video
                </label>
                <input
                  id="videoProof"
                  className="hidden"
                  type="file"
                  accept="video/*;capture=camcorder"
                  {...register("video", {
                    required: isVideoRequired && isFieldRequired,
                  })}
                  onInput={() => {
                    setProofType("video");
                    setEditProof(true);
                    setIsImageRequired(false);
                  }}
                />
              </div>
            </div>
            {(errors.video || errors.image) && (
              <span className="text-red-500">Please provide a proof</span>
            )}
          </div>
          <div>
            {uploadedImage && proofType === "image" && proofType === "image" ? (
              <img
                src={URL.createObjectURL(uploadedImage[0])}
                className="w-94 mx-auto my-5 rounded"
              />
            ) : (
              proofType === "image" && (
                <img
                  src={`${BASE_IMAGE_URL}/assistance-request/${assistanceData?.proof}`}
                  className="w-94 mx-auto my-5 rounded"
                />
              )
            )}

            {uploadedVideo && proofType === "video" ? (
              <video
                src={URL.createObjectURL(uploadedVideo[0])}
                controls
              ></video>
            ) : (
              proofType === "video" && (
                <video
                  src={`${BASE_IMAGE_URL}/assistance-request/${assistanceData?.proof}`}
                  controls
                ></video>
              )
            )}
          </div>
        </div>
        <div className=" px-5">
          <button
            className="w-full flex items-center justify-center bg-primary-600 text-white gap-2 py-3 px-5 rounded-md"
            onClick={() => {
              console.log("click");
              setIsFieldRequired(true);
              handleSubmit(onSubmit("add"))();
            }}
            disabled={addIsLoading || updateIsLoading}
          >
            Submit Report
          </button>
        </div>
      </div>
    </>
  );
};

export default AssistanceFormFields;
