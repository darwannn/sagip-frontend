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
      className="flex gap-5 p-5 bg-gray-200 rounded-2xl"
      onClick={() => dispatch(setSelectedAssistanceRequest(assistanceReq))}
    >
      <svg
        className=""
        width="42"
        height="42"
        viewBox="0 0 42 42"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clip-path="url(#clip0_224_3732)">
          <path
            d="M15.6614 24.6021L24.5938 15.6697L26.3346 17.4105L17.4022 26.3429L15.6614 24.6021Z"
            fill="#C92A2A"
          />
          <path
            d="M14.7131 39.4748L39.4722 14.7169C42.8294 11.3597 42.8294 5.89491 39.4722 2.53654C36.1138 -0.819455 30.6502 -0.821834 27.2919 2.53654L2.53397 27.2957C-0.834085 30.6611 -0.831788 36.109 2.53397 39.4749C5.90062 42.8414 11.3486 42.8418 14.7131 39.4748ZM34.1696 9.5791C34.6501 9.09858 35.4292 9.09858 35.9098 9.5791C36.3904 10.0596 36.3904 10.8386 35.9098 11.3191C35.4292 11.7997 34.6501 11.7997 34.1696 11.3191C33.6891 10.8386 33.6892 10.0596 34.1696 9.5791ZM14.7958 32.4331C14.3153 32.9136 13.5362 32.9136 13.0557 32.4331C12.5752 31.9526 12.5752 31.1736 13.0557 30.6931C13.5362 30.2126 14.3153 30.2126 14.7958 30.6931C15.2764 31.1735 15.2764 31.9526 14.7958 32.4331ZM30.6896 6.09891C31.1701 5.6184 31.9491 5.6184 32.4296 6.09891C32.9102 6.57943 32.9102 7.35845 32.4296 7.83896C31.9491 8.31956 31.1701 8.31956 30.6896 7.83896C30.2091 7.35845 30.2091 6.57943 30.6896 6.09891ZM30.6896 13.0592C31.1701 12.5787 31.9491 12.5787 32.4296 13.0592C32.9102 13.5397 32.9102 14.3187 32.4296 14.7992C31.9491 15.2798 31.1701 15.2798 30.6896 14.7992C30.2091 14.3187 30.2091 13.5396 30.6896 13.0592ZM27.2093 9.5791C27.6899 9.09858 28.4689 9.09858 28.9495 9.5791C29.4301 10.0596 29.4301 10.8386 28.9495 11.3191C28.4689 11.7997 27.6899 11.7997 27.2093 11.3191C26.7288 10.8386 26.7289 10.0596 27.2093 9.5791ZM13.0552 23.7326L23.7288 13.059C24.2094 12.5784 24.9881 12.5784 25.4687 13.059L28.9497 16.54C29.4303 17.0206 29.4303 17.7993 28.9497 18.2799L18.2761 28.9535C17.7955 29.4341 17.0168 29.4341 16.5362 28.9535L13.0552 25.4725C12.5746 24.9919 12.5746 24.2133 13.0552 23.7326ZM9.57562 27.2129C10.0561 26.7324 10.8352 26.7324 11.3157 27.2129C11.7962 27.6935 11.7962 28.4724 11.3157 28.9531C10.8352 29.4336 10.0561 29.4336 9.57562 28.9531C9.09502 28.4724 9.09502 27.6935 9.57562 27.2129ZM9.57562 34.1731C10.0561 33.6926 10.8352 33.6926 11.3157 34.1731C11.7962 34.6537 11.7962 35.4326 11.3157 35.9133C10.8352 36.3938 10.0561 36.3938 9.57562 35.9133C9.09502 35.4327 9.09502 34.6538 9.57562 34.1731ZM6.09544 30.6931C6.57596 30.2126 7.35497 30.2126 7.83549 30.6931C8.31609 31.1736 8.31609 31.9526 7.83549 32.4331C7.35497 32.9136 6.57596 32.9136 6.09544 32.4331C5.61492 31.9526 5.61492 31.1735 6.09544 30.6931ZM39.4722 27.2957L34.9226 22.746L22.742 34.9259L27.2919 39.4749C30.6565 42.842 36.1054 42.8417 39.4722 39.4749C42.8307 36.1176 42.8307 30.6528 39.4722 27.2957ZM2.53585 2.51792C-0.83064 5.88425 -0.831542 11.3333 2.53585 14.6983L7.0824 19.2662L19.2626 7.08603L14.715 2.51792C11.3578 -0.839306 5.89308 -0.839306 2.53585 2.51792Z"
            fill="#C92A2A"
          />
        </g>
        <defs>
          <clipPath id="clip0_224_3732">
            <rect width="42" height="42" fill="white" />
          </clipPath>
        </defs>
      </svg>
      <div>
        <Link to="/responder/map">
          <div className="text-xl font-semibold text-[#C92A2A]">
            {assistanceReq?.category}
          </div>
          <div className="text-gray-600">
            <div className="">
              {moment(assistanceReq?.createdAt).format("hh:MM A")}
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
