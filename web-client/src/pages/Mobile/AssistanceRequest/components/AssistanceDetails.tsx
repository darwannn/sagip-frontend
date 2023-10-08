import { useState } from "react";
import { BsFillChatRightDotsFill } from "react-icons/bs";
import MobileHeader from "../../../../components/MobileHeader/MobileHeader";

import AssistanceMap from "./AssistanceMap";
import { BASE_IMAGE_URL, BASE_VIDEO_URL } from "../../../../api.config";
import Lightbox from "../../../../components/Lightbox/Lightbox";
import {
  selectAssistanceReq,
  setDisplayedAssistancePage,
} from "../../../../store/slices/assistanceReqSlice";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import DetailsActionButton from "./DetailsActionButton";

const AssistanceDetails = () => {
  const dispatch = useAppDispatch();
  const [view, setView] = useState<string>("info");
  const assistanceData = useAppSelector(selectAssistanceReq);
  let isImage = true;
  if (assistanceData?._id) {
    const extensions = ["jpeg", "jpg", "png"];
    isImage = extensions.some(
      (extension) => assistanceData?.proof.includes(extension)
    );
  }
  const mediaURL = isImage
    ? `${BASE_IMAGE_URL}/assistance-request/${assistanceData?.proof}`
    : `${BASE_VIDEO_URL}/assistance-request/${assistanceData?.proof}`;

  return (
    <>
      <div className="flex flex-col min-h-screen pb-5">
        <MobileHeader
          isAbsolute={true}
          component={
            <>
              {/*  <Link to="/hazard-reports">
                <MdChevronLeft className="text-4xl" />
              </Link> */}
              <div className="flex flex-col w-full gap-4">
                <div className="text-2xl font-bold">Emergency Request </div>
                <div className="flex bg-white rounded-xl py-2 ">
                  <button
                    className="w-1/2 font-semibold text-secondary-500 text-center"
                    onClick={() => setView("info")}
                  >
                    <span
                      className={`${
                        view === "info" && "border-b-2 border-secondary-500"
                      }`}
                    >
                      INFO
                    </span>
                  </button>
                  <button
                    className="w-1/2 font-semibold text-secondary-500 text-center disabled:text-gray-500"
                    onClick={() => setView("map")}
                    /*  disabled={!assistanceData?.isBeingResponded} */
                  >
                    <span
                      className={`${
                        view === "map" && "border-b-2 border-secondary-500"
                      }`}
                    >
                      MAP
                    </span>
                  </button>
                </div>
              </div>
            </>
          }
        />

        {view === "info" ? (
          <div className="flex flex-col p-5 gap-3 h-full mt-36">
            <div>Request Status</div>
            {assistanceData?.assignedTeam && (
              <div className="flex  items-center gap-4 bg-gray-200 rounded-lg px-5 py-4">
                <svg
                  width="38"
                  height="38"
                  viewBox="0 0 38 38"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clipPath="url(#clip0_224_3013)">
                    <path
                      d="M29.732 28.4604H8.26794C7.65312 28.4604 7.15466 27.962 7.15466 27.3471V19C7.15466 12.4684 12.4684 7.15466 19 7.15466C25.5315 7.15466 30.8453 12.4684 30.8453 19V27.3471C30.8453 27.962 30.3468 28.4604 29.732 28.4604Z"
                      fill="#F0142D"
                    />
                    <path
                      d="M30.8453 27.3471V19C30.8453 12.4684 25.5315 7.15466 19 7.15466V28.4604H29.732C30.3469 28.4604 30.8453 27.962 30.8453 27.3471Z"
                      fill="#B40000"
                    />
                    <path
                      d="M22.5773 28.4604H15.4227C14.8078 28.4604 14.3094 27.962 14.3094 27.3472V19C14.3094 16.3804 16.4408 14.3094 19 14.3094C21.5494 14.3094 23.6906 16.3701 23.6906 19V27.3472C23.6906 27.962 23.1922 28.4604 22.5773 28.4604ZM3.49823 20.1133H1.11328C0.498453 20.1133 0 19.6148 0 19C0 18.3852 0.498453 17.8867 1.11328 17.8867H3.49823C4.11305 17.8867 4.61151 18.3852 4.61151 19C4.61151 19.6148 4.11305 20.1133 3.49823 20.1133ZM36.8867 20.1133H34.5018C33.8869 20.1133 33.3885 19.6148 33.3885 19C33.3885 18.3852 33.8869 17.8867 34.5018 17.8867H36.8867C37.5015 17.8867 38 18.3852 38 19C38 19.6148 37.5015 20.1133 36.8867 20.1133ZM19 4.61143C18.3852 4.61143 17.8867 4.11298 17.8867 3.49815V1.11328C17.8867 0.498453 18.3852 0 19 0C19.6148 0 20.1133 0.498453 20.1133 1.11328V3.49815C20.1133 4.11298 19.6148 4.61143 19 4.61143ZM5.01585 12.2129L2.95294 11.0204C2.42064 10.7127 2.23851 10.0318 2.5463 9.49948C2.85401 8.96711 3.53489 8.78505 4.06726 9.09284L6.13017 10.2853C6.66247 10.593 6.8446 11.274 6.53682 11.8063C6.26889 12.2698 5.61138 12.5572 5.01585 12.2129ZM31.4632 11.8063C31.1555 11.274 31.3376 10.593 31.8698 10.2853L33.9327 9.09284C34.465 8.78512 35.1461 8.96718 35.4537 9.49948C35.7614 10.0318 35.5793 10.7127 35.0471 11.0204L32.9841 12.2129C32.375 12.565 31.7244 12.2581 31.4632 11.8063ZM10.2849 6.13143L9.09254 4.06615C8.78505 3.5337 8.96748 2.85282 9.5 2.54541C10.0325 2.23799 10.7133 2.42035 11.0207 2.95287L12.2131 5.01815C12.5206 5.5506 12.3382 6.23148 11.8057 6.53889C11.1975 6.8901 10.5465 6.58446 10.2849 6.13143ZM26.1943 6.53897C25.6618 6.23155 25.4794 5.55067 25.7869 5.01823L26.9793 2.95294C27.2867 2.42042 27.9675 2.23792 28.5 2.54548C29.0325 2.85289 29.2149 3.53378 28.9075 4.06622L27.7151 6.13151C27.4467 6.59627 26.789 6.88238 26.1943 6.53897Z"
                      fill="#FF6400"
                    />
                    <path
                      d="M23.6906 27.3471V19C23.6906 16.3699 21.5494 14.3093 19 14.3093V28.4604H22.5773C23.1922 28.4604 23.6906 27.9619 23.6906 27.3471Z"
                      fill="#F0142D"
                    />
                    <path
                      d="M33.3094 33.2302H4.69061C4.07578 33.2302 3.57733 32.7317 3.57733 32.1169C3.57733 31.5021 4.07578 31.0036 4.69061 31.0036C5.39176 31.0036 5.9622 30.4332 5.9622 29.732V27.3472C5.9622 26.7323 6.46066 26.2339 7.07548 26.2339H30.9245C31.5393 26.2339 32.0378 26.7323 32.0378 27.3472V29.732C32.0378 30.4332 32.6082 31.0036 33.3094 31.0036C33.9242 31.0036 34.4226 31.5021 34.4226 32.1169C34.4226 32.7317 33.9242 33.2302 33.3094 33.2302Z"
                      fill="#3C3C37"
                    />
                    <path
                      d="M34.4227 32.1169C34.4227 31.5021 33.9242 31.0036 33.3094 31.0036C32.6082 31.0036 32.0378 30.4332 32.0378 29.732V27.3472C32.0378 26.7323 31.5393 26.2339 30.9245 26.2339H19V33.2303H33.3094C33.9242 33.2302 34.4227 32.7318 34.4227 32.1169Z"
                      fill="#141E14"
                    />
                    <path
                      d="M34.5018 38H3.49823C2.8834 38 2.38495 37.5016 2.38495 36.8868V32.1169C2.38495 31.5021 2.8834 31.0037 3.49823 31.0037H34.5018C35.1166 31.0037 35.6151 31.5021 35.6151 32.1169V36.8868C35.6151 37.5016 35.1166 38 34.5018 38Z"
                      fill="#64645A"
                    />
                    <path
                      d="M35.6151 36.8868V32.1169C35.6151 31.5021 35.1166 31.0037 34.5018 31.0037H19V38H34.5018C35.1166 38 35.6151 37.5016 35.6151 36.8868Z"
                      fill="#3C3C37"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_224_3013">
                      <rect width="38" height="38" fill="white" />
                    </clipPath>
                  </defs>
                </svg>

                <span className="font-semibold">
                  {assistanceData?.assignedTeam?.name} is on the way.
                </span>
              </div>
            )}
            <div className="flex flex-col  bg-primary-100 rounded-lg px-4 py-6 gap-5 relative">
              {/*  {assistanceData.proof !== "" && (
                <> */}
              {/* {assistanceData && ( */}
              <DetailsActionButton assistanceData={assistanceData} />
              {/*  )} */}
              <div className="flex gap-2">
                <BsFillChatRightDotsFill className="text-primary-600" />
                <span className="text-gray-700 text-sm">
                  Additional Details:
                </span>
              </div>
              <div className="px-6 py-2 text-justify">
                {assistanceData?.description === ""
                  ? "No details have been provided"
                  : assistanceData?.description}
              </div>
              <div className="flex-1">
                {assistanceData?.proof === "" ? (
                  "Kindly provide a photo or video to help us in assisting you."
                ) : (
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
                )}
              </div>
              {/* </>
              )} */}
              {/* <Link
                to={`/emergency-reports/edit/${assistanceData?._id}`}
                className="bg-primary-600 rounded-xl py-3 text-white text-center"
              > */}
              <button
                className="bg-primary-600 rounded-xl py-3 text-white text-center"
                onClick={() => {
                  dispatch(setDisplayedAssistancePage("edit-form"));
                }}
              >
                Update Information
              </button>
              {/*  </Link> */}
            </div>
          </div>
        ) : (
          assistanceData && (
            <AssistanceMap /* assistanceData={assistanceData} */ />
          )
        )}
      </div>
    </>
  );
};

export default AssistanceDetails;
