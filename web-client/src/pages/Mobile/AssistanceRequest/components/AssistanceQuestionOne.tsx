import { useAppDispatch } from "../../../../store/hooks";
import {
  setAssistanceCategory,
  setAssistanceQuestionOne,
  setDisplayedAssistancePage,
} from "../../../../store/slices/assistanceReqSlice";

const AssistanceQuestionOne = () => {
  const dispatch = useAppDispatch();

  const handleOnClick = (category: string, asnwer: string) => {
    dispatch(setAssistanceCategory(category));
    dispatch(setAssistanceQuestionOne(asnwer));
    dispatch(setDisplayedAssistancePage("questionTwo"));
  };

  return (
    <>
      <div className="flex flex-col h-screen px-5 gap-2 py-5">
        <div className="font-bold text-2xl text-secondary-500 mb-4">
          What’s the emergency ?
        </div>

        <div className="text-xl font-semibold">Trapped</div>
        <div
          className="flex items-center gap-5 bg-gray-200 rounded-xl px-10 py-4 cursor-pointer"
          onClick={() => handleOnClick("Trapped", "Trapped inside a building")}
        >
          Trapped inside a building
        </div>

        <div
          className="flex items-center gap-5 bg-gray-200 rounded-xl px-10 py-4 cursor-pointer"
          onClick={() => handleOnClick("Trapped", "Trapped inside a vehicle")}
        >
          Trapped inside a vehicle
        </div>

        <div
          className="flex items-center gap-5 bg-gray-200 rounded-xl px-10 py-4 cursor-pointer"
          onClick={() => handleOnClick("Trapped", "Trapped inside a debris")}
        >
          Trapped inside a debris
        </div>

        <div className="text-xl font-semibold mt-5">Fire</div>
        <div
          className="flex items-center gap-5 bg-gray-200 rounded-xl px-10 py-4 cursor-pointer"
          onClick={() => handleOnClick("Fire", "There is a house fire")}
        >
          There is a house fire
        </div>
        <div
          className="flex items-center gap-5 bg-gray-200 rounded-xl px-10 py-4 cursor-pointer"
          onClick={() => handleOnClick("Fire", "There is a house fire")}
        >
          There is a car fire
        </div>
        <div className="text-xl font-semibold mt-5">Injury / Sickness</div>
        <div
          className="flex items-center gap-5 bg-gray-200 rounded-xl px-10 py-4 cursor-pointer"
          onClick={() => handleOnClick("Injury / Sickness", "Heart Attack")}
        >
          Heart Attack
        </div>
        <div
          className="flex items-center gap-5 bg-gray-200 rounded-xl px-10 py-4 cursor-pointer"
          onClick={() => handleOnClick("Injury / Sickness", "Stroke")}
        >
          Stroke
        </div>
        <div
          className="flex items-center gap-5 bg-gray-200 rounded-xl px-10 py-4 cursor-pointer"
          onClick={() => handleOnClick("Injury / Sickness", "Stroke")}
        >
          Stroke
        </div>
        <div
          className="flex items-center gap-5 bg-gray-200 rounded-xl px-10 py-4 cursor-pointer"
          onClick={() =>
            handleOnClick("Injury / Sickness", "Allergic Reaction")
          }
        >
          Allergic Reaction
        </div>
        <div
          className="flex items-center gap-5 bg-gray-200 rounded-xl px-10 py-4 cursor-pointer"
          onClick={() => handleOnClick("Injury / Sickness", "Seizure")}
        >
          Seizure
        </div>
        <div
          className="flex items-center gap-5 bg-gray-200 rounded-xl px-10 py-4 cursor-pointer"
          onClick={() => handleOnClick("Injury / Sickness", "Trauma")}
        >
          Trauma
        </div>
      </div>
    </>
  );
};

export default AssistanceQuestionOne;
