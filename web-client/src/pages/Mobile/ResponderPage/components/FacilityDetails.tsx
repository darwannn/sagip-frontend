import { BASE_IMAGE_URL } from "../../../../api.config";
import { useAppSelector } from "../../../../store/hooks";

import { selectionFacility } from "../../../../store/slices/facilitySlice";

import { FaPaperPlane } from "react-icons/fa";

import { BsFillTelephoneFill } from "react-icons/bs";

const AssistanceDetails = () => {
  const facility = useAppSelector(selectionFacility);

  return (
    <div className="px-5">
      <div className="flex text-md text-gray-500">
        <div className="flex-1">{facility?.category}</div>
        {/*  <div>250m away</div> */}
      </div>

      <div className="text-2xl text-[#293B95] font-bold">{facility?.name}</div>
      <div className="flex my-3 gap-2">
        <button className=" flex gap-2 items-center border bg-[#8695DD] text-white px-3 rounded-md hover:bg-[#293B95] ">
          {/* <IoNavigate/> */}
          <FaPaperPlane />
          Navigate
        </button>
        <a
          href={`tel:${facility?.contactNumber}`}
          className="  flex gap-2 items-center border border-[#D7DCF4] text-[#293B95] py-1 px-3 rounded-md hover:bg-[#D7DCF4]"
        >
          <BsFillTelephoneFill /> Call
        </a>
      </div>
      <div className="rounded-xl h-[200px] ">
        <img
          src={`${BASE_IMAGE_URL}/emergency-facility/${facility?.image}`}
          className="w-full h-full object-cover  rounded-xl"
        />
      </div>
    </div>
  );
};

export default AssistanceDetails;
