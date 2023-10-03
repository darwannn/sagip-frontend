import moment from "moment";
import { IoMdWarning } from "react-icons/io";
import { BASE_IMAGE_URL, BASE_VIDEO_URL } from "../../../../api.config";
import { useAppSelector } from "../../../../store/hooks";
import { selectHazardReport } from "../../../../store/slices/hazardReportSlice";
import Lightbox from "../../../../components/Lightbox/Lightbox";

const AssistanceDetails = () => {
  const hazardReport = useAppSelector(selectHazardReport);

  const extensions = ["jpeg", "jpg", "png"];
  const isImage = extensions.some(
    (extension) => hazardReport?.proof.includes(extension)
  );
  const mediaURL = isImage
    ? `${BASE_IMAGE_URL}/hazard-report/${hazardReport?.proof}`
    : `${BASE_VIDEO_URL}/hazard-report/${hazardReport?.proof}`;
  /* const mediaType = isImage ? "image" : "video"; */

  return (
    <div className="flex flex-col gap-2 px-5 pb-5">
      <div className="flex gap-2">
        <IoMdWarning className="text-6xl text-[#FFD400]" />
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

      <Lightbox mediaURL={mediaURL} isImage={isImage}>
        <div className="rounded-xl h-[200px]">
          {isImage ? (
            <img
              src={mediaURL}
              className="w-full h-full object-cover rounded-xl"
            />
          ) : (
            <video
              src={mediaURL}
              className="w-full h-full object-cover rounded-xl"
              controls
            />
          )}
        </div>
      </Lightbox>
    </div>
  );
};

export default AssistanceDetails;
