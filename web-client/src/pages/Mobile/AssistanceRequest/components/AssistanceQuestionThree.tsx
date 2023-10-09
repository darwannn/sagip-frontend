import { MdChevronLeft } from "react-icons/md";
import { useAppDispatch } from "../../../../store/hooks";
import { setDisplayedAssistancePage } from "../../../../store/slices/assistanceReqSlice";
import { FieldValues, UseFormRegister } from "react-hook-form";

import "../styles/style.css";
type TProps = {
  register: UseFormRegister<FieldValues>;
  isFieldRequired: boolean;
};

const AssistanceQuestionThree = ({ register, isFieldRequired }: TProps) => {
  const dispatch = useAppDispatch();

  return (
    <>
      <div className="flex flex-col h-screen px-5 gap-2 py-5 pt-16">
        <div className="flex items-center mb-4 text-2xl text-secondary-500 font-bold ">
          <div>
            <MdChevronLeft
              className="text-4xl"
              onClick={() => {
                dispatch(setDisplayedAssistancePage("questionTwo"));
              }}
            />
          </div>
          <div> How many people are affected by the emergency?</div>
        </div>

        <div id="questionThree">
          <input
            type="radio"
            id="questionThree_1"
            value="1-5 people"
            className="mr-2 hidden"
            {...register("questionThree", { required: isFieldRequired })}
            onInput={() => dispatch(setDisplayedAssistancePage("form"))}
          />
          <label
            htmlFor="questionThree_1"
            className="flex items-center mb-2 font-semibold bg-gray-200 rounded-xl px-10 py-4 cursor-pointer checked:bg-secondary-600"
          >
            1-5 people
          </label>
          <input
            type="radio"
            id="questionThree_2"
            value="6-10 people"
            className="mr-2 hidden"
            {...register("questionThree", { required: isFieldRequired })}
            onInput={() => dispatch(setDisplayedAssistancePage("form"))}
          />
          <label
            htmlFor="questionThree_2"
            className="flex items-center mb-2 font-semibold bg-gray-200 rounded-xl px-10 py-4 cursor-pointer checked:bg-secondary-600"
          >
            6-10 people
          </label>
          <input
            type="radio"
            id="questionThree_3"
            value="More than 10 people"
            className="mr-2 hidden"
            {...register("questionThree", { required: isFieldRequired })}
            onInput={() => dispatch(setDisplayedAssistancePage("form"))}
          />
          <label
            htmlFor="questionThree_3"
            className="flex items-center mb-2 font-semibold bg-gray-200 rounded-xl px-10 py-4 cursor-pointer checked:bg-secondary-600"
          >
            More than 10 people
          </label>
        </div>
      </div>
    </>
  );
};

export default AssistanceQuestionThree;
