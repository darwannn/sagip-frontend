import { useAppSelector } from "../../../store/hooks";
import { selectAssistanceReq } from "../../../store/slices/assistanceReqSlice";

const AssistanceDetails = () => {
  const selectedAssistanceReq = useAppSelector(selectAssistanceReq);

  console.log(selectedAssistanceReq);

  return (
    <div className="border rounded-md shadow-sm p-2 mx-2  bg-white z-10 fixed right-0 top-[50%] translate-y-[-50%] min-w-[500px]">
      Hello World
    </div>
  );
};

export default AssistanceDetails;
