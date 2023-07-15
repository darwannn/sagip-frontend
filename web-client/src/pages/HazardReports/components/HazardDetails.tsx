import type { THazardReport } from "../types/hazardReport";

type TProps = {
  reportData: THazardReport;
};

const HazardDetails = ({ reportData }: TProps) => {
  console.log(reportData);
  return (
    <div className="border rounded-md shadow-sm p-2 mx-2  bg-white z-10 fixed right-0 top-[50%] translate-y-[-50%] min-w-[500px]">
      <span className="text-gray-400 text-sm">Hazard ID: {reportData._id}</span>
      {/* USER INFO */}
      <div className="flex flex-row items-center gap-2">
        <div className="img-container">
          <img
            src="https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png"
            alt="user"
            className="rounded-full object-cover w-16 h-16"
          />
        </div>
        <div className="info-container">
          <span className="text-sm">Reported by:</span>
          <p>{`${reportData.userId.firstname} ${reportData.userId.lastname}`}</p>
          <span className="text-sm">Address:</span>
          <p>{reportData.userId.barangay}</p>
        </div>
      </div>
      {/* REPORT INFO */}
      {/* REPORT ACTION */}
    </div>
  );
};

export default HazardDetails;
