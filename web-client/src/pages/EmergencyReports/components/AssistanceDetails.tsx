import { useSearchParams } from "react-router-dom";
import { useGetAssistanceRequestByIdQuery } from "../../../services/assistanceRequestQuery";

const AssistanceDetails = () => {
  const [searchParams] = useSearchParams();
  const emergencyId = searchParams.get("emergencyId");
  const { data, isError, isLoading, isSuccess, error } =
    useGetAssistanceRequestByIdQuery(emergencyId || "");

  if (!emergencyId) {
    console.log("No assistance id found");
  }

  if (isLoading) console.log("Loading");
  if (isError) console.log(error);
  if (isSuccess) console.log(data);

  return (
    <div className="border rounded-md shadow-sm p-2 mx-2  bg-white z-10 fixed right-0 top-[50%] translate-y-[-50%] min-w-[500px]">
      Hello World
    </div>
  );
};

export default AssistanceDetails;
