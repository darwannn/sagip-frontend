import { useAppDispatch } from "../../../../store/hooks";
import {
  setAssistanceQuestionThree,
  setDisplayedAssistancePage,
} from "../../../../store/slices/assistanceReqSlice";

const AssistanceQuestionThree = () => {
  const dispatch = useAppDispatch();

  const handleOnClick = (asnwer: string) => {
    dispatch(setAssistanceQuestionThree(asnwer));
    dispatch(setDisplayedAssistancePage("form"));
  };

  return (
    <>
      <div className="flex flex-col h-screen px-5 gap-2 py-5 pt-16">
        <div className="font-bold text-2xl text-secondary-500 mb-4">
          How many people are affected by the emergency?
        </div>

        <div
          className=" font-semibold bg-gray-200 rounded-xl px-10 py-4 cursor-pointer"
          onClick={() => {
            handleOnClick("1-5 people");
          }}
        >
          1-5 people
        </div>
        <div
          className=" font-semibold bg-gray-200 rounded-xl px-10 py-4 cursor-pointer"
          onClick={() => {
            handleOnClick("6-10 people");
          }}
        >
          6-10 people
        </div>
        <div
          className=" font-semibold bg-gray-200 rounded-xl px-10 py-4 cursor-pointer"
          onClick={() => {
            handleOnClick("More than 10 people");
          }}
        >
          More than 10 people
        </div>
      </div>
    </>
  );
};

export default AssistanceQuestionThree;
