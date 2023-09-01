import { useParams, Link } from "react-router-dom";
import AlertForm from "./components/AlertForm";
import { useGetAlertByIdQuery } from "../../../services/alertQuery";

const ViewAlertPage = () => {

  const { alertId } = useParams();
  const {
    data: alertData,
    isLoading,
    error,
  } = useGetAlertByIdQuery(alertId);

  if (isLoading) {
    return <p>Loading...</p>;
  }
  if (error) {
    console.log(alertId);
    console.log(error);

    return <p>Something went wrong</p>;
  }

  return (
    <div className="m-5">
      <Link
        className="px-2 py-1 bg-red-200 rounded hover:bg-red-400"
        to={"/disaster-alerts"}
      >
        Cancel
      </Link>
      <AlertForm alertData={alertData} />
    </div>
  );
};

export default ViewAlertPage;
