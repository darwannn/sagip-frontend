import { useState, useEffect } from "react";
import { useAppDispatch } from "../../../store/hooks";

import { useNavigate } from "react-router-dom";
import "./styles/style.css";
import { useGetMyAssistanceRequestQuery } from "../../../services/assistanceRequestQuery";

const HelpButtonPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [clickCount, setClickCount] = useState<number>(3);
  const {
    data: assistanceData,
    isError: assistanceIsError,
    isLoading: assistanceIsLoading,
    isSuccess,
  } = useGetMyAssistanceRequestQuery();

  useEffect(() => {
    setClickCount(3);
  }, []);

  useEffect(() => {
    if (clickCount === 0) {
      navigate("/emergency-reports/request");
    }
  }, [clickCount, dispatch, navigate]);

  useEffect(() => {
    if (isSuccess && assistanceData?._id) {
      navigate("/emergency-reports/request");
    }
    console.log(assistanceData);
  }, [dispatch, assistanceData, assistanceIsLoading, navigate, isSuccess]);
  if (assistanceIsLoading) return <div>Loading...</div>;
  if (assistanceIsError) console.log("Error");

  return (
    <div className="flex flex-col min-h-screen px-5 gap-3 pt-16">
      <div className="font-bold text-2xl text-secondary-500">
        Are you in an emergency?
      </div>

      <div>
        Tap the button below
        <span className="font-bold text-secondary-500">
          {" "}
          {clickCount} {clickCount > 1 ? "times" : "time"}{" "}
        </span>
        to request help, and assistance will reach you soon.
      </div>
      <div
        className="mx-auto my-11 "
        style={{ WebkitTapHighlightColor: "transparent" }}
      >
        <button
          className="font-bold text-3xl bg-secondary-500 text-white rounded-full cursor-pointer h-60 w-60"
          id="helpMeButton"
          onClick={() => {
            setClickCount((prevCount) => prevCount - 1);
            window.AndroidInterface?.vibrateOnHold();
          }}
        >
          HELP ME!
        </button>
      </div>

      <div className="text-sm text-gray-500">
        Using the emergency button for prank or fake reports is a criminal
        offense and punishable by law. Any misuse of this feature will be taken
        seriously and may result in legal action.
      </div>
    </div>
  );
};

export default HelpButtonPage;
