import { useCallback, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import { FieldValues, SubmitHandler, useForm, useWatch } from "react-hook-form";

import { BASE_IMAGE_URL, BASE_VIDEO_URL } from "../../../../api.config";
import {
  /* THazardReport, */
  THazardReportResData,
} from "../../../../types/hazardReport";
import {
  selectAddMode,
  selectTempMarkerPos,
  setTempMarkerPos,
  setAddMode,
} from "../../../../store/slices/facilitySlice";
import { selectHazardReport } from "../../../../store/slices/hazardReportSlice";
import {
  useAddHazardReportMutation,
  useUpdateHazardReportMutation,
} from "../../../../services/hazardReportsQuery";

import MobileHeader from "../../../../components/MobileHeader/MobileHeader";
/* import MapComponent from "./MapComponent"; */
import MapComponent from "../../../Admin/FacilityManagement/components/MapComponent";

import { AiOutlineCamera } from "react-icons/ai";
import { BsCameraVideo } from "react-icons/bs";
import { IoLocationOutline } from "react-icons/io5";
import { MdChevronLeft } from "react-icons/md";
import CurrentLocation from "../../HazardMap/components/CurrentLocation";

const ToggleMarkers = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [editProof, setEditProof] = useState<boolean>(false);
  const [isImageRequired, setIsImageRequired] = useState<boolean>(true);
  const [isVideoRequired, setIsVideoRequired] = useState<boolean>(true);
  const [proofType, setProofType] = useState<string>("");
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [serverRes, setServerRes] = useState<THazardReportResData>();

  const hazardData = useAppSelector(selectHazardReport);
  const tempMarkerPos = useAppSelector(selectTempMarkerPos);
  const addMode = useAppSelector(selectAddMode);
  const selectedHazardCategory = useAppSelector(
    (state) => state.hazardReports.selectedHazardCategory
  );

  const [
    addHazardReport,
    { isError: addIsError, isLoading: addIsLoading /* , error: addErr */ },
  ] = useAddHazardReportMutation();

  const [
    updateHazardReport,
    {
      isError: updateIsError,
      isLoading: updateIsLoading,
      isSuccess: updateIsSuccess,
    },
  ] = useUpdateHazardReportMutation();

  const onMapLoad = useCallback((map: google.maps.Map) => {
    setMap(map);
  }, []);

  const {
    register,
    control,
    handleSubmit,
    setValue,
    formState: { /* isDirty,  */ errors },
  } = useForm<FieldValues>();

  const uploadedImage = useWatch({ control, name: "image" });
  const uploadedVideo = useWatch({ control, name: "video" });

  useEffect(() => {
    if (!hazardData)
      if (selectedHazardCategory === null) {
        navigate("/hazard-reports");
      }
  }, [hazardData, selectedHazardCategory, navigate]);

  useEffect(() => {
    if (tempMarkerPos) {
      setValue("latitude", tempMarkerPos.lat);
      setValue("longitude", tempMarkerPos.lng);
    }
  }, [tempMarkerPos, setValue]);

  useEffect(() => {
    if (hazardData) {
      setIsImageRequired(false);
      setIsVideoRequired(false);
      dispatch(setAddMode(true));
      setEditProof(false);
      setValue("category", hazardData.category);
      setValue("latitude", hazardData.latitude);
      setValue("longitude", hazardData.longitude);
      setValue("description", hazardData.description);
      setValue("category", hazardData.category);
      setValue("status", hazardData.status);
      dispatch(
        setTempMarkerPos({
          lat: hazardData.latitude,
          lng: hazardData.longitude,
        })
      );

      if (
        ["jpeg", "jpg", "png"].some(
          (extension) => hazardData?.proof.includes(extension)
        )
      ) {
        setProofType("image");
      } else {
        setProofType("video");
      }
    }
  }, [hazardData, dispatch, setValue]);

  const SubmitHazardReportData = async (data: FieldValues) => {
    /* if (!isDirty) {
      console.log("No changes made");
      return;
    } */

    const body = new FormData();

    body.append("description", data.description);
    body.append("latitude", data.latitude);
    body.append("longitude", data.longitude);

    if (hazardData) {
      body.append("category", data.category);
    } else {
      body.append("category", selectedHazardCategory || "");
    }

    body.append("hasChanged", editProof ? "true" : "false");

    if (hazardData) {
      body.append(
        "proof",
        proofType === "image" ? data.image[0] : data.video[0]
      );
    } else {
      body.append(
        "proof",
        proofType === "image" ? data.image[0] : data.video[0]
      );
    }

    let res;
    if (hazardData) {
      res = await updateHazardReport({
        body,
        id: hazardData._id,
      });
    } else {
      res = "";
      res = await addHazardReport(body);
    }
    console.log(res);
    if (res && "data" in res) {
      if (res.data.success) {
        navigate(`/hazard-reports`);
      }
    } else {
      if ("error" in res && "data" in res.error) {
        const errData = res.error.data as THazardReportResData;
        setServerRes(errData);
      }
    }
  };

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    SubmitHazardReportData(data);
  };

  if (addIsLoading) console.log("Loading...");
  if (addIsError) console.log("Error Adding");

  if (updateIsLoading) console.log("Updating...");
  if (updateIsError) console.log("Error updating");
  if (updateIsSuccess) console.log("Updated successfully");

  return (
    <div className="bg-white flex flex-col min-h-screen pb-5">
      <MobileHeader
        component={
          <>
            <Link to="/hazard-reports">
              <MdChevronLeft className="text-4xl" />
            </Link>
            <div className="text-2xl font-bold">Submit Hazard Report</div>
          </>
        }
      />

      <div className="flex flex-col flex-1 px-5 py-5  rounded-lg gap-5">
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
            {...register("longitude", { required: true })}
            disabled
          />

          <input
            type="text"
            id="lat"
            {...register("latitude", { required: true })}
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
            {...register("description", { required: true })}
          />
          {errors.description && (
            <span className="text-red-500">This field is required</span>
          )}
        </div>
        {/* capture */}
        <div>
          <div className=" mb-2">
            {hazardData ? "Recapture" : "Capture"} what is going on around you:
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
                {...register("image", { required: isImageRequired })}
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
                {...register("video", { required: isVideoRequired })}
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
          {uploadedImage && proofType === "image" ? (
            <img
              src={URL.createObjectURL(uploadedImage[0])}
              className="w-94 mx-auto my-5 rounded"
            />
          ) : (
            proofType === "image" && (
              <img
                src={`${BASE_IMAGE_URL}/hazard-report/${hazardData?.proof}`}
                className="w-94 mx-auto my-5 rounded"
              />
            )
          )}

          {uploadedVideo && proofType === "video" ? (
            <video src={URL.createObjectURL(uploadedVideo[0])} controls></video>
          ) : (
            proofType === "video" && (
              <video
                src={`${BASE_VIDEO_URL}/hazard-report/${hazardData?.proof}`}
                controls
              ></video>
            )
          )}
        </div>
      </div>
      <div className=" px-5">
        <button
          className="w-full flex items-center justify-center bg-primary-600 text-white gap-2 py-3 px-5 rounded-md"
          onClick={handleSubmit(onSubmit)}
          disabled={addIsLoading || updateIsLoading}
        >
          Submit Report
        </button>
      </div>
    </div>
  );
};

export default ToggleMarkers;
