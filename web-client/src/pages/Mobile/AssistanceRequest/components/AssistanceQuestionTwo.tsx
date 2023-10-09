import { MdChevronLeft } from "react-icons/md";
import { useAppDispatch } from "../../../../store/hooks";
import { setDisplayedAssistancePage } from "../../../../store/slices/assistanceReqSlice";
import { FieldValues, UseFormRegister } from "react-hook-form";

import "../styles/style.css";
type TProps = {
  register: UseFormRegister<FieldValues>;
  isFieldRequired: boolean;
};

const AssistanceQuestionTwo = ({ register, isFieldRequired }: TProps) => {
  const dispatch = useAppDispatch();

  return (
    <>
      <div className="flex flex-col h-screen px-5 gap-2 py-5 pt-16">
        <div className="flex items-center mb-4 text-2xl text-secondary-500 font-bold">
          <div>
            <div>
              <MdChevronLeft
                className="text-4xl"
                onClick={() => {
                  dispatch(setDisplayedAssistancePage("questionOne"));
                }}
              />
            </div>
          </div>
          <div> Is anyone injured or in need of medical attention?</div>
        </div>

        <div id="questionTwo">
          <input
            type="radio"
            id="questionTwo_1"
            value="Yes, there are injuries and/or medical emergencies"
            className="mr-2 hidden"
            {...register("questionTwo", { required: isFieldRequired })}
            onInput={() =>
              dispatch(setDisplayedAssistancePage("questionThree"))
            }
          />
          <label
            htmlFor="questionTwo_1"
            className="flex mb-2 font-semibold bg-gray-200 rounded-xl px-10 py-4 cursor-pointer checked:bg-secondary-600"
          >
            Yes, there are injuries and/or medical emergencies
          </label>
          <input
            type="radio"
            id="questionTwo_2"
            value="No, there are no injuries or medical emergencies"
            className="mr-2 hidden"
            {...register("questionTwo", { required: isFieldRequired })}
            onInput={() =>
              dispatch(setDisplayedAssistancePage("questionThree"))
            }
          />
          <label
            htmlFor="questionTwo_2"
            className="flex  mb-2 font-semibold bg-gray-200 rounded-xl px-10 py-4 cursor-pointer checked:bg-secondary-600"
          >
            No, there are no injuries or medical emergencies
          </label>
        </div>
      </div>
    </>
  );
};

export default AssistanceQuestionTwo;
