import { useNavigate } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";

import { FieldValues, SubmitHandler, useForm, useWatch } from "react-hook-form";

import { useAppDispatch, useAppSelector } from "../../../../store/hooks";

import { TAssistanceRequest } from "../../../../types/assistanceRequest";
import {
  selectTempMarkerPos,
  setTempMarkerPos,
  setAddMode,
} from "../../../../store/slices/facilitySlice";

import {
  useAddAssistanceRequestMutation,
  useGetMyAssistanceRequestQuery,
  useUpdateAssistanceRequestMutation,
} from "../../../../services/assistanceRequestQuery";

import AssistanceFormFields from "./AssistanceFormFields";

import AssistanceQuestionOne from "./AssistanceQuestionOne";
import AssistanceQuestionTwo from "./AssistanceQuestionTwo";
import AssistanceQuestionThree from "./AssistanceQuestionThree";

import { getLocation } from "../../../../util/getLocation";

import TimerToast from "./TimerToast";

type TProps = {
  /*  assistanceData: TAssistanceRequest | null; */
  /*  showModal: boolean; */
  setShowModal: (value: boolean) => void;
};

const AssistanceForm = ({
  /* assistanceData */ /* showModal, */ setShowModal,
}: TProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const displayedAssistancePage = useAppSelector(
    (state) => state.assistanceReq.displayedAssistancePage
  );
  const assistanceCategory = useAppSelector(
    (state) => state.assistanceReq.assistanceCategory
  );

  /* 60 seconds */
  const timeBeforeAutoSubmit = 60;
  const [timer, setTimer] = useState<number>(timeBeforeAutoSubmit);

  const [editProof, setEditProof] = useState<boolean>(false);
  const [proofType, setProofType] = useState<string>("");
  const [serverRes, setServerRes] = useState<TAssistanceRequest>();
  /* const assistanceData = useAppSelector(selectAssistanceReq); */
  const tempMarkerPos = useAppSelector(selectTempMarkerPos);
  const [isFieldRequired, setIsFieldRequired] = useState<boolean>(false);

  const [isImageRequired, setIsImageRequired] = useState<boolean>(true);
  const [isVideoRequired, setIsVideoRequired] = useState<boolean>(true);

  const [isUsingCurrentLocation, setIsUsingCurrentLocation] =
    useState<boolean>(true);
  const [myLatitude, setMyLatitude] = useState<number>(0);
  const [myLongitude, setMyLongitude] = useState<number>(0);

  const {
    data: assistanceData,
    isError: assistanceIsError,
    isLoading: assistanceIsLoading,
    /*  refetch: refetchAssistanceData, */
  } = useGetMyAssistanceRequestQuery();

  useEffect(() => {
    const getCurrentLocation = async () => {
      const { latitude, longitude } = await getLocation();
      setMyLatitude(latitude);
      setMyLongitude(longitude);
    };
    getCurrentLocation();
  }, []);

  const [
    addAssistanceRequest,
    { isError: addIsError, isLoading: addIsLoading },
  ] = useAddAssistanceRequestMutation();

  const [
    updateAssistanceRequest,
    {
      isError: updateIsError,
      isLoading: updateIsLoading,
      isSuccess: updateIsSuccess,
    },
  ] = useUpdateAssistanceRequestMutation();

  const {
    register,
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FieldValues>();

  useEffect(() => {
    if (tempMarkerPos) {
      setValue("latitude", tempMarkerPos.lat);
      setValue("longitude", tempMarkerPos.lng);
    }
  }, [tempMarkerPos, setValue]);

  useEffect(() => {
    if (assistanceData?._id) {
      setIsImageRequired(false);
      setIsVideoRequired(false);
      setIsUsingCurrentLocation(false);
      dispatch(setAddMode(true));
      setEditProof(false);

      setValue("questionOne", assistanceData.answers[0]);
      setValue("questionTwo", assistanceData.answers[1]);
      setValue("questionThree", assistanceData.answers[2]);
      setValue("category", assistanceData.category);
      setValue("latitude", assistanceData.latitude);
      setValue("longitude", assistanceData.longitude);
      setValue("description", assistanceData.description);
      setValue("category", assistanceData.category);
      setValue("status", assistanceData.status);
      dispatch(
        setTempMarkerPos({
          lat: assistanceData.latitude,
          lng: assistanceData.longitude,
        })
      );

      if (
        ["jpeg", "jpg", "png"].some(
          (extension) => assistanceData?.proof.includes(extension)
        )
      ) {
        setProofType("image");
      } else {
        setProofType("video");
      }
    }
  }, [assistanceData, dispatch, setValue]);

  const SubmitHazardReportData = useCallback(
    async (data: FieldValues, action: string) => {
      /* if (!isDirty) {
      console.log("No changes made");
      return;
    } */

      const body = new FormData();

      body.append("description", data.description);

      if (isUsingCurrentLocation) {
        body.append("latitude", myLatitude.toString());
        body.append("longitude", myLongitude.toString());
      } else {
        body.append("latitude", data.latitude);
        body.append("longitude", data.longitude);
      }
      body.append("category", assistanceCategory || "");

      const answers = [
        data.questionOne || [],
        data.questionTwo || [],
        data.questionThree || [],
      ];

      const flattenedAnswers = answers.flat();

      flattenedAnswers.forEach((value) => {
        body.append("answers[]", value);
      });

      body.append("hasChanged", editProof ? "true" : "false");

      if (assistanceData?._id) {
        body.append(
          "proof",
          proofType === "image"
            ? data.image && data.image[0]
            : data.video && data.video[0]
        );
      } else {
        body.append(
          "proof",
          proofType === "image"
            ? data.image && data.image[0]
            : data.video && data.video[0]
        );
      }

      let res;
      if (assistanceData?._id) {
        res = await updateAssistanceRequest({
          body,
          id: assistanceData._id,
        });
      } else {
        res = "";
        res = await addAssistanceRequest({ body, action });
      }
      console.log(res);
      if (res && "data" in res) {
        if (action === "add" || assistanceData?._id) {
          navigate(`/emergency-reports/request`);
        }
      } else {
        if ("error" in res && "data" in res.error) {
          const errData = res.error.data as TAssistanceRequest;
          setServerRes(errData);
        }
      }
    },
    [
      addAssistanceRequest,
      assistanceData,
      proofType,
      updateAssistanceRequest,
      assistanceCategory,

      editProof,
      isUsingCurrentLocation,
      myLatitude,
      myLongitude,
      navigate,
    ]
  );

  const onSubmit = (action: string): SubmitHandler<FieldValues> => {
    return async (data) => {
      console.log("submit");

      SubmitHazardReportData(data, action);
    };
  };

  /* timer */
  useEffect(() => {
    let timerInterval: ReturnType<typeof setInterval> | null = null;
    if (assistanceData?.success === false) {
      timerInterval = setInterval(() => {
        setTimer((prevCountdown) => prevCountdown - 1);
      }, 1000);
    }

    if (!assistanceData?.success && timer === 0) {
      handleSubmit(onSubmit("auto-add"))();
      window.AndroidInterface?.playSOS();
      setShowModal(true);
    }
    if (timerInterval && timer === -1) {
      clearInterval(timerInterval);
    }
    return () => {
      if (timerInterval) {
        clearInterval(timerInterval);
      }
    };
  }, [timer, assistanceData, handleSubmit, setShowModal]);
  /* adding onsubmit as dependency causes loop */

  const watchVideo = useWatch({ control, name: "video" });
  const watchImage = useWatch({ control, name: "image" });
  const watchLatitude = useWatch({ control, name: "latitude" });
  const watchLongitude = useWatch({ control, name: "longitude" });
  const watchDescription = useWatch({ control, name: "description" });
  const watchQuestionOne = useWatch({ control, name: "questionOne" });
  const watchQuestionTwo = useWatch({ control, name: "questionTwo" });
  const watchQuestionThree = useWatch({ control, name: "questionThree" });

  useEffect(() => {
    setTimer(timeBeforeAutoSubmit);
  }, [
    watchVideo,
    watchImage,
    watchLatitude,
    watchLongitude,
    watchDescription,
    watchQuestionOne,
    watchQuestionTwo,
    watchQuestionThree,
  ]);

  if (addIsLoading) console.log("Loading...");
  if (addIsError) console.log("Error Adding");

  if (updateIsLoading) console.log("Updating...");
  if (updateIsError) console.log("Error updating");
  if (updateIsSuccess) console.log("Updated successfully");

  if (assistanceIsLoading) return <div>Loading...</div>;
  if (assistanceIsError) console.log("Error");

  return (
    <>
      {timer < 11 && timer > 0 && (
        <div className="fixed  z-20 top-16 left-1/2 -translate-x-1/2">
          <TimerToast
            timer={timer}
            setTimer={setTimer}
            timeBeforeAutoSubmit={timeBeforeAutoSubmit}
          />
        </div>
      )}

      {assistanceData && displayedAssistancePage === "questionOne" && (
        <AssistanceQuestionOne
          assistanceData={assistanceData}
          register={register}
          isFieldRequired={isFieldRequired}
        />
      )}
      {displayedAssistancePage === "questionTwo" && (
        <AssistanceQuestionTwo
          register={register}
          isFieldRequired={isFieldRequired}
        />
      )}
      {displayedAssistancePage === "questionThree" && (
        <AssistanceQuestionThree
          register={register}
          isFieldRequired={isFieldRequired}
        />
      )}
      {displayedAssistancePage === "form" && assistanceData && (
        <AssistanceFormFields
          assistanceData={assistanceData}
          isFieldRequired={isFieldRequired}
          setIsFieldRequired={setIsFieldRequired}
          handleSubmit={handleSubmit}
          errors={errors}
          serverRes={serverRes}
          onSubmit={onSubmit}
          useWatch={useWatch}
          control={control}
          setEditProof={setEditProof}
          register={register}
          updateIsLoading={updateIsLoading}
          addIsLoading={addIsLoading}
          proofType={proofType}
          setProofType={setProofType}
          setIsVideoRequired={setIsVideoRequired}
          setIsImageRequired={setIsImageRequired}
          isVideoRequired={isVideoRequired}
          isImageRequired={isImageRequired}
          setIsUsingCurrentLocation={setIsUsingCurrentLocation}
        />
      )}
    </>
  );
};

export default AssistanceForm;
