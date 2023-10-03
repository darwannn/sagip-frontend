import { BASE_IMAGE_URL } from "../../../../api.config";
import { useAppSelector } from "../../../../store/hooks";

import { selectionFacility } from "../../../../store/slices/facilitySlice";

import { FaDirections } from "react-icons/fa";

import { BsFillTelephoneFill } from "react-icons/bs";

import Lightbox from "../../../../components/Lightbox/Lightbox";

const AssistanceDetails = () => {
  const facility = useAppSelector(selectionFacility);

  return (
    <div className="px-5 pb-5">
      <div className="flex text-md text-gray-500">
        <div className="flex-1">{facility?.category}</div>
        {/*  <div>250m away</div> */}
      </div>

      <div className="text-2xl text-primary-600 font-bold">
        {facility?.name}
      </div>
      <div className="flex my-3 gap-2">
        <button
          className=" flex gap-2 items-center border bg-primary-300 text-white px-3 rounded-md hover:bg-primary-600"
          onClick={() => {
            window.AndroidInterface?.routeTo(
              facility?.latitude || 0,
              facility?.longitude || 0
            );
          }}
        >
          {/* <IoNavigate/> */}
          <FaDirections />
          Navigate
        </button>
        <a
          href={`tel:${facility?.contactNumber}`}
          className="  flex gap-2 items-center border border-primary-100 text-primary-600 py-1 px-3 rounded-md hover:bg-primary-100"
        >
          <BsFillTelephoneFill /> Call
        </a>
      </div>

      <Lightbox
        mediaURL={`${BASE_IMAGE_URL}/emergency-facility/${facility?.image}`}
        isImage={true}
      >
        <div className="rounded-xl h-[200px] ">
          <img
            src={`${BASE_IMAGE_URL}/emergency-facility/${facility?.image}`}
            className="w-full h-full object-cover  rounded-xl"
          />
        </div>
      </Lightbox>
    </div>
  );
};

export default AssistanceDetails;
