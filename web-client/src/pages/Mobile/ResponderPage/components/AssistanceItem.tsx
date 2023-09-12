import { Link } from "react-router-dom";

import type { TAssistanceRequest } from "../../../../types/assistanceRequest";
import { setSelectedAssistanceRequest } from "../../../../store/slices/assistanceReqSlice";

import { useDispatch } from "react-redux";
import moment from "moment";

type TProps = {
  assistanceReq: TAssistanceRequest;
};

const AssistanceItem = ({ assistanceReq }: TProps) => {
  const dispatch = useDispatch();
  return (
    <div
      className="flex gap-3 p-5 bg-gray-200 rounded-2xl"
      onClick={() => dispatch(setSelectedAssistanceRequest(assistanceReq))}
    >
      <div className="icon w-16 h-16  bg-secondary-500 rounded-full"></div>
      <div>
        <Link to="/responder/emergency-reports">
          <div className="text-xl font-bold text-secondary-500">
            {assistanceReq?.category}
          </div>
          <div className="text-gray-600">
            <div className="">
              <span className="mr-3">
                {" "}
                {moment(assistanceReq?.createdAt).format("hh:MM A")}
              </span>
              {/*  <span> 3KM Away</span> */}
            </div>
            <div className="">
              {assistanceReq?.street}{" "}
              {assistanceReq?.street !== " " &&
                assistanceReq?.street !== "" &&
                "Street,"}{" "}
              {assistanceReq?.municipality}
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default AssistanceItem;
