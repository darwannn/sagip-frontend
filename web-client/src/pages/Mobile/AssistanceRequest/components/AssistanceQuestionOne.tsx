import { useNavigate } from "react-router-dom";
import { FieldValues, UseFormRegister } from "react-hook-form";
import { useAppDispatch } from "../../../../store/hooks";
import {
  setAssistanceCategory,
  setDisplayedAssistancePage,
} from "../../../../store/slices/assistanceReqSlice";
import { TAssistanceRequest } from "../../../../types/assistanceRequest";

import { MdChevronLeft } from "react-icons/md";
import "../styles/style.css";
type TProps = {
  register: UseFormRegister<FieldValues>;
  isFieldRequired: boolean;
  assistanceData: TAssistanceRequest;
};

const AssistancequestionOne = ({
  register,
  isFieldRequired,
  assistanceData,
}: TProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleDispatch = (category: string) => {
    dispatch(setAssistanceCategory(category));
    dispatch(setDisplayedAssistancePage("questionTwo"));
  };
  return (
    <>
      <div className="flex flex-col min-h-screen px-5 gap-2 py-5 pt-16">
        <div className="flex items-center mb-4 text-2xl text-secondary-500 font-bold">
          <MdChevronLeft
            className="text-4xl"
            onClick={() => {
              if (assistanceData?._id) {
                dispatch(setDisplayedAssistancePage("details"));
              } else {
                navigate("/emergency-reports");
              }
            }}
          />
          <div>What’s the emergency ?</div>
        </div>
        <div id="questionOne">
          <>
            <div className="text-xl font-semibold mb-3">Trapped</div>
            <input
              type="radio"
              id="questionOne_1"
              value="Trapped inside a building"
              className="mr-2 hidden"
              {...register("questionOne", { required: isFieldRequired })}
              onInput={() => handleDispatch("Trapped")}
            />
            <label
              htmlFor="questionOne_1"
              className="flex items-center mb-2 font-semibold bg-gray-200 rounded-xl px-10 py-4 cursor-pointer checked:bg-secondary-600"
            >
              Trapped inside a building
            </label>
            <input
              type="radio"
              id="questionOne_2"
              value="Trapped inside a vehicle"
              className="mr-2 hidden"
              {...register("questionOne", { required: isFieldRequired })}
              onInput={() => handleDispatch("Trapped")}
            />
            <label
              htmlFor="questionOne_2"
              className="flex items-center mb-2 font-semibold bg-gray-200 rounded-xl px-10 py-4 cursor-pointer checked:bg-secondary-600"
            >
              Trapped inside a vehicle
            </label>
            <input
              type="radio"
              id="questionOne_3"
              value="Trapped inside a debris"
              className="mr-2 hidden"
              {...register("questionOne", { required: isFieldRequired })}
              onInput={() => handleDispatch("Trapped")}
            />
            <label
              htmlFor="questionOne_3"
              className="flex items-center mb-2 font-semibold bg-gray-200 rounded-xl px-10 py-4 cursor-pointer checked:bg-secondary-600"
            >
              Trapped inside a debris
            </label>
          </>
          <>
            <div className="text-xl font-semibold mt-8 mb-3">Fire</div>
            <input
              type="radio"
              id="questionOne_4"
              value="There is a house fire"
              className="mr-2 hidden"
              {...register("questionOne", { required: isFieldRequired })}
              onInput={() => handleDispatch("Fire")}
            />
            <label
              htmlFor="questionOne_4"
              className="flex items-center mb-2 font-semibold bg-gray-200 rounded-xl px-10 py-4 cursor-pointer checked:bg-secondary-600"
            >
              There is a house fire
            </label>
            <input
              type="radio"
              id="questionOne_5"
              value="Trapped inside a vehicle"
              className="mr-2 hidden"
              {...register("questionOne", { required: isFieldRequired })}
              onInput={() => handleDispatch("Fire")}
            />
            <label
              htmlFor="questionOne_5"
              className="flex items-center mb-2 font-semibold bg-gray-200 rounded-xl px-10 py-4 cursor-pointer checked:bg-secondary-600"
            >
              There is a car fire
            </label>
          </>
          <>
            <div className="text-xl font-semibold mt-8 mb-3">
              Injury / Sickness
            </div>
            <input
              type="radio"
              id="questionOne_6"
              value="Heart Attack"
              className="mr-2 hidden"
              {...register("questionOne", { required: isFieldRequired })}
              onInput={() => handleDispatch("Injury / Sickness")}
            />
            <label
              htmlFor="questionOne_6"
              className="flex items-center mb-2 font-semibold bg-gray-200 rounded-xl px-10 py-4 cursor-pointer checked:bg-secondary-600"
            >
              Heart Attack
            </label>
            <input
              type="radio"
              id="questionOne_7"
              value="Stroke"
              className="mr-2 hidden"
              {...register("questionOne", { required: isFieldRequired })}
              onInput={() => handleDispatch("Injury / Sickness")}
            />
            <label
              htmlFor="questionOne_7"
              className="flex items-center mb-2 font-semibold bg-gray-200 rounded-xl px-10 py-4 cursor-pointer checked:bg-secondary-600"
            >
              Stroke
            </label>
            <input
              type="radio"
              id="questionOne_8"
              value="Allergic Reaction"
              className="mr-2 hidden"
              {...register("questionOne", { required: isFieldRequired })}
              onInput={() => handleDispatch("Injury / Sickness")}
            />
            <label
              htmlFor="questionOne_8"
              className="flex items-center mb-2 font-semibold bg-gray-200 rounded-xl px-10 py-4 cursor-pointer checked:bg-secondary-600"
            >
              Allergic Reaction
            </label>
            <input
              type="radio"
              id="questionOne_9"
              value="Seizure"
              className="mr-2 hidden"
              {...register("questionOne", { required: isFieldRequired })}
              onInput={() => handleDispatch("Injury / Sickness")}
            />
            <label
              htmlFor="questionOne_9"
              className="flex items-center mb-2 font-semibold bg-gray-200 rounded-xl px-10 py-4 cursor-pointer checked:bg-secondary-600"
            >
              Seizure
            </label>
            <input
              type="radio"
              id="questionOne_10"
              value="Trauma"
              className="mr-2 hidden"
              {...register("questionOne", { required: isFieldRequired })}
              onInput={() => handleDispatch("Injury / Sickness")}
            />
            <label
              htmlFor="questionOne_10"
              className="flex items-center mb-2 font-semibold bg-gray-200 rounded-xl px-10 py-4 cursor-pointer checked:bg-secondary-600"
            >
              Trauma
            </label>
          </>
        </div>
      </div>
    </>
  );
};

export default AssistancequestionOne;
