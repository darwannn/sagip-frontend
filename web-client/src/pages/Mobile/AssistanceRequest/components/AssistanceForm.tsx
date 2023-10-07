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
  selectAssistanceReq,
  setAssistanceQuestionThree,
  setAssistanceQuestionTwo,
} from "../../../../store/slices/assistanceReqSlice";
import {
  setAssistanceCategory,
  setAssistanceQuestionOne,
} from "../../../../store/slices/assistanceReqSlice";

import {
  useAddAssistanceRequestMutation,
  useUpdateAssistanceRequestMutation,
} from "../../../../services/assistanceRequestQuery";

import AssistanceFormFields from "./AssistanceFormFields";
import Modal from "../../../../components/Modal/Modal";
import AssistanceQuestionOne from "./AssistanceQuestionOne";
import AssistanceQuestionTwo from "./AssistanceQuestionTwo";
import AssistanceQuestionThree from "./AssistanceQuestionThree";
import UnfinishedReport from "./UnfinishedReport";
import { getLocation } from "../../../../util/getLocation";
import AssistanceDetails from "./AssistanceDetails";

const AssistanceForm = () => {
  const dispatch = useAppDispatch();
  /* const navigate = useNavigate(); */

  const displayedAssistancePage = useAppSelector(
    (state) => state.assistanceReq.displayedAssistancePage
  );
  const assistanceCategory = useAppSelector(
    (state) => state.assistanceReq.assistanceCategory
  );
  const assistanceQuestionOne = useAppSelector(
    (state) => state.assistanceReq.assistanceQuestionOne
  );
  const assistanceQuestionTwo = useAppSelector(
    (state) => state.assistanceReq.assistanceQuestionTwo
  );
  const assistanceQuestionThree = useAppSelector(
    (state) => state.assistanceReq.assistanceQuestionThree
  );

  const timeBeforeAutoSubmit = 60;
  const [timer, setTimer] = useState<number>(timeBeforeAutoSubmit);

  const [editProof, setEditProof] = useState<boolean>(false);
  const [proofType, setProofType] = useState<string>("");
  const [serverRes, setServerRes] = useState<TAssistanceRequest>();
  const assistanceData = useAppSelector(selectAssistanceReq);
  const tempMarkerPos = useAppSelector(selectTempMarkerPos);
  const [isFieldRequired, setIsFieldRequired] = useState<boolean>(false);

  const [isImageRequired, setIsImageRequired] = useState<boolean>(true);
  const [isVideoRequired, setIsVideoRequired] = useState<boolean>(true);

  const [isUsingCurrentLocation, setIsUsingCurrentLocation] =
    useState<boolean>(true);
  const [myLatitude, setMyLatitude] = useState<number>(0);
  const [myLongitude, setMyLongitude] = useState<number>(0);

  useEffect(() => {
    const getCurrentLocation = async () => {
      const { latitude, longitude } = await getLocation();
      /* console.log(latitude, longitude); */
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

      dispatch(setAssistanceCategory(assistanceData.category));
      dispatch(setAssistanceQuestionOne(assistanceData.answers[0]));
      dispatch(setAssistanceQuestionTwo(assistanceData.answers[1]));
      dispatch(setAssistanceQuestionThree(assistanceData.answers[2]));
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
        console.log("image");
        setProofType("image");
      } else {
        console.log("video");
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
      console.log("action");
      console.log(action);
      body.append("description", data.description);
      console.log(isUsingCurrentLocation);
      if (isUsingCurrentLocation) {
        body.append("latitude", myLatitude.toString());
        body.append("longitude", myLongitude.toString());
      } else {
        body.append("latitude", data.latitude);
        body.append("longitude", data.longitude);
      }
      body.append("category", assistanceCategory || "");

      const answers = [
        assistanceQuestionOne || [],
        assistanceQuestionTwo || [],
        assistanceQuestionThree || [],
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
      console.log(action);
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
        if (res.data.success) {
          //navigate(`/hazard-reports`);
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
      assistanceQuestionOne,
      assistanceQuestionThree,
      assistanceQuestionTwo,
      editProof,
      isUsingCurrentLocation,
      myLatitude,
      myLongitude,
    ]
  );

  const onSubmit = (action: string): SubmitHandler<FieldValues> => {
    return async (data) => {
      console.log("submit");
      console.log(action);

      SubmitHazardReportData(data, action);
    };
  };

  /* timer */
  useEffect(() => {
    let timerInterval: ReturnType<typeof setInterval> | null = null;
    if (assistanceData?.success === false) {
      timerInterval = setInterval(() => {
        setTimer((prevCountdown) => prevCountdown - 1);
        console.log(timer);
      }, 1000);
    }

    if (!assistanceData?.success && timer === 0) {
      handleSubmit(onSubmit("auto-add"))();
      window.AndroidInterface?.playSOS();
      setShowModal(true);
      if (timerInterval) {
        clearInterval(timerInterval);
      }
    }
    return () => {
      if (timerInterval) {
        clearInterval(timerInterval);
      }
    };
  }, [timer, assistanceData, handleSubmit]);
  /* adding onsubmit as dependency causes loop */

  const watchVideo = useWatch({ control, name: "video" });
  const watchImage = useWatch({ control, name: "image" });
  const watchLatitude = useWatch({ control, name: "latitude" });
  const watchLongitude = useWatch({ control, name: "longitude" });
  const watchDescription = useWatch({ control, name: "description" });

  useEffect(() => {
    setTimer(timeBeforeAutoSubmit);
  }, [
    watchVideo,
    watchImage,
    watchLatitude,
    watchLongitude,
    watchDescription,
    assistanceQuestionOne,
    assistanceQuestionTwo,
    assistanceQuestionThree,
  ]);
  /*  console.log(assistanceData); */
  if (addIsLoading) console.log("Loading...");
  if (addIsError) console.log("Error Adding");

  if (updateIsLoading) console.log("Updating...");
  if (updateIsError) console.log("Error updating");
  if (updateIsSuccess) console.log("Updated successfully");
  const [showModal, setShowModal] = useState<boolean>(false);

  return (
    <>
      {displayedAssistancePage === "questionOne" && <AssistanceQuestionOne />}
      {displayedAssistancePage === "questionTwo" && <AssistanceQuestionTwo />}
      {displayedAssistancePage === "questionThree" && (
        <AssistanceQuestionThree />
      )}
      {(displayedAssistancePage === "form" ||
        displayedAssistancePage === "edit-form") && (
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
      {assistanceData && displayedAssistancePage !== "edit-form" && (
        <AssistanceDetails />
      )}
      <Modal
        isMobile={true}
        modalTitle={""}
        modalShow={showModal}
        modalClose={() => setShowModal(false)}
      >
        <UnfinishedReport setShowModal={setShowModal} />
      </Modal>
    </>
  );
};

export default AssistanceForm;
