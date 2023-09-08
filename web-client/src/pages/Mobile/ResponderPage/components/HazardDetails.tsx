import { BASE_IMAGE_URL } from "../../../../api.config";

import { useAppSelector } from "../../../../store/hooks";

import { selectHazardReport } from "../../../../store/slices/hazardReportSlice";

import moment from "moment";

const AssistanceDetails = () => {
  const hazardReport = useAppSelector(selectHazardReport);

  return (
    <div className="flex flex-col gap-2 px-5">
      <div className="flex gap-2">
        <svg
          width="53"
          height="48"
          viewBox="0 0 53 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M33.3625 4.10641L51.3472 35.2568C52.8259 37.818 52.8259 40.9087 51.3472 43.4698C49.8686 46.0308 47.192 47.5762 44.2347 47.5762H8.26527C5.308 47.5762 2.63136 46.0308 1.15278 43.4698C-0.32591 40.9088 -0.32591 37.818 1.15278 35.2568L19.1375 4.10641C20.6161 1.54541 23.2927 0 26.25 0C29.2073 0 31.8839 1.54541 33.3625 4.10641ZM26.25 34.5411C24.7287 34.5411 23.4956 35.7743 23.4956 37.2955C23.4956 38.8166 24.7288 40.0499 26.25 40.0499C27.7712 40.0499 29.0044 38.8167 29.0044 37.2955C29.0044 35.7743 27.7712 34.5411 26.25 34.5411ZM26.2501 29.6242C27.4071 29.6242 28.357 28.708 28.3987 27.5518L28.9421 12.5014C28.9539 12.2124 28.907 11.9239 28.8042 11.6536C28.7014 11.3832 28.5449 11.1364 28.3441 10.9282C28.1432 10.72 27.9023 10.5547 27.6358 10.4422C27.3693 10.3297 27.0828 10.2724 26.7935 10.2737H25.7065C25.4173 10.2724 25.1307 10.3297 24.8642 10.4422C24.5977 10.5547 24.3568 10.72 24.1559 10.9282C23.9551 11.1364 23.7986 11.3831 23.6958 11.6535C23.593 11.9239 23.5461 12.2123 23.5578 12.5014L24.1013 27.5518C24.143 28.708 25.0931 29.6242 26.2501 29.6242Z"
            fill="#FFD400"
          />
        </svg>

        <div className="text-2xl">
          {hazardReport?.category} on{" "}
          <span className="font-bold">{hazardReport?.street} Street</span>
        </div>
      </div>
      <div className="text-gray-500">
        <div>
          Reported on{" "}
          {moment(hazardReport?.createdAt).format(" MMM DD, YYYY | hh:mm A")}
        </div>
        <div>
          Reported by {hazardReport?.userId?.firstname}{" "}
          {hazardReport?.userId?.lastname}
        </div>
      </div>

      <div className="rounded-xl h-[200px] ">
        <img
          src={`${BASE_IMAGE_URL}/hazard-report/${hazardReport?.proof}`}
          className="w-full h-full object-cover  rounded-xl"
        />
      </div>
    </div>
  );
};

export default AssistanceDetails;
