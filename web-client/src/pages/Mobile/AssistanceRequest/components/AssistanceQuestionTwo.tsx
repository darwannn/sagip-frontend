import { useAppDispatch } from "../../../../store/hooks";
import {
  setAssistanceQuestionTwo,
  setDisplayedAssistancePage,
} from "../../../../store/slices/assistanceReqSlice";

const AssistanceQuestionTwo = () => {
  const dispatch = useAppDispatch();

  const handleOnClick = (asnwer: string) => {
    dispatch(setAssistanceQuestionTwo(asnwer));
    dispatch(setDisplayedAssistancePage("questionThree"));
  };

  return (
    <>
      <div className="flex flex-col h-screen px-5 gap-2 py-5 pt-16">
        <div className="font-bold text-2xl text-secondary-500 mb-4">
          Is anyone injured or in need of medical attention?
        </div>

        <div
          className=" font-semibold bg-gray-200 rounded-xl px-10 py-4 cursor-pointer"
          onClick={() => {
            handleOnClick("Yes, there are injuries and/or medical emergencies");
          }}
        >
          <span className="text-secondary-500">Yes</span>, there are injuries
          and/or medical emergencies
        </div>
        <div
          className=" font-semibold bg-gray-200 rounded-xl px-10 py-4 cursor-pointer"
          onClick={() => {
            handleOnClick("No, there are no injuries or medical emergencies");
          }}
        >
          <span className="text-secondary-500">No</span>, there are no injuries
          or medical emergencies
        </div>
      </div>
    </>
  );
};

export default AssistanceQuestionTwo;
