import moment from "moment";
import { useGetActiveAlertQuery } from "../../../services/alertQuery";
import { useAppDispatch } from "../../../store/hooks";

import { setActiveAlert } from "../../../store/slices/alertSlice";
import { useEffect } from "react";

const AlertActive = () => {
  const { data: alertsData, isLoading, error } = useGetActiveAlertQuery();

  const dispatch = useAppDispatch();
  useEffect(() => {
    if (alertsData) {
      dispatch(setActiveAlert(alertsData));
    }
  }, [alertsData, dispatch]);

  if (isLoading) {
    return <p>Loading active alert...</p>;
  }

  if (error) {
    return <p>Something went wrong...</p>;
  }

  return (
    <div className="my-8">
      {alertsData?._id && (
        <>
          <div className="">Active Survey: </div>
          <div className="flex flex-wrap xl:justify-between lg:justify-between md:justify-between gap-5 p-7 bg-yellow-200 rounded-xl">
            <div className="">
              <div className="text-sm text-gray-500">Survey ID</div>
              <div className="">{alertsData?.title}</div>
            </div>
            <div className="">
              <div className="text-sm text-gray-500">Date Published</div>
              <div className="">
                {moment(alertsData?.startDate).format("MMM DD, YYYY")} to{" "}
                {moment(alertsData?.endDate).format("MMM DD, YYYY")}
              </div>
            </div>
            <div className=" ">
              <div className="text-sm text-gray-500">Responses</div>
              <div className="">
                {alertsData?.affected.length + alertsData?.unaffected.length}
              </div>
            </div>
            <div className=" ">
              <div className="text-sm text-gray-500">Affected</div>
              <div className="">{alertsData?.affected.length}</div>
            </div>
            <div className="">
              <div className="text-sm text-gray-500">Unaffected</div>
              <div className="">{alertsData?.unaffected.length}</div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AlertActive;
