import { Link } from "react-router-dom";
import {
  useGetAlertsQuery,
  useGetAlertByIdQuery,
} from "../../services/alertQuery";
import AlertTable from "./components/AlertTable";
import SMSAlertForm from "./components/AlertSMSForm";

import AlertActive from "./components/AlertActive";

const ManageAlertsPage = () => {
  const { data: alerts, isLoading, error } = useGetAlertsQuery(undefined);

  if (error) {
    return <p>Something went wrong...</p>;
  }
  const tableComponent = alerts ? (
    <AlertTable alertData={alerts} />
  ) : (
    <p>No survey found</p>
  );

  return (
    <div className="flex lg:flex-row flex-col">
      <div className=" lg:w-1/4 w-full m-5">
        <h1 className=" font-bold">Send Alerts</h1>
        <SMSAlertForm />
      </div>

      <div className=" lg:w-3/4 w-full m-5">
        <h1 className=" font-bold">Wellness Check Survey</h1>
        <div className="mx-5"></div>

        <Link
          className="bg-indigo-500 px-2 py-1 rounded text-white hover:bg-indigo-600 float-right"
          to={"create"}
        >
          New Survey
        </Link>
        <AlertActive />
        {isLoading ? <p>Getting survey....</p> : tableComponent}
        {/* <AlertForm/> */}
      </div>
    </div>
  );
};

export default ManageAlertsPage;
