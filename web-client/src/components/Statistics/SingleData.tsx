import { ReactNode } from "react";
import { useNavigate } from "react-router-dom";

type TProps = {
  title: string;
  value: number | undefined;
  icon: ReactNode;
  isPrimary: boolean;
  isThisMonth: boolean;
  /*  isToday: boolean; */
  navigateTo: string;
  style: string;
};

const SingleData = ({
  title,
  value,
  icon,
  isPrimary,
  isThisMonth,
  /* isToday */
  navigateTo,
  style,
}: TProps) => {
  const navigate = useNavigate();
  return (
    <div
      className={
        isPrimary
          ? `grid grid-cols-2 h-full border-2 rounded-xl p-5 border-indigo-300 bg-indigo-300 text-gray-800 ${
              navigateTo !== "/" && "cursor-pointer"
            } ${
              style === "dashboard"
                ? "w-full"
                : "min-w-44" /* "min-w-[180px]" */
            }`
          : `grid grid-cols-2 h-full border-2 rounded-xl p-5  border-gray-200 bg-gray-200 text-gray-800 ${
              navigateTo !== "/" && "cursor-pointer"
            } ${
              style === "dashboard"
                ? "w-full"
                : "min-w-44" /* "min-w-[180px]" */
            }`
      }
      onClick={() => {
        if (navigateTo !== "/") navigate(navigateTo);
      }}
    >
      <div className="col-span-2">
        {/* toLocaleString adds comma to numbers */}
        <span className="font-bold text-3xl ">{value?.toLocaleString()}</span>
        <h2>{title}</h2>
        {isThisMonth && <span className="text-sm italic ">This month</span>}
        {/*  {isToday && <span className="text-sm italic ">today</span>} */}
      </div>
      <div className="col-span-2 mt-auto text-3xl">{icon}</div>
    </div>
  );
};

export default SingleData;
