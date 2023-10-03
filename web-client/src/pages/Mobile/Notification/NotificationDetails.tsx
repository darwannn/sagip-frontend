import { useAppSelector } from "../../../store/hooks";
import { formatDate } from "../../../util/date";

import {
  PiWarningLight,
  PiCheckCircleLight,
  PiWarningOctagon,
  PiInfoLight,
} from "react-icons/pi";

const NotificationDetails: React.FC = () => {
  const notification = useAppSelector(
    (state) => state.userManage.selectedNotification
  );

  const date = formatDate(notification?.createdAt);
  const notificaitonColor =
    notification?.type === "info"
      ? "primary-500"
      : notification?.type === "warning"
      ? "[#FFD400]"
      : notification?.type === "error"
      ? "secondary-500"
      : "green-500";
  return (
    <div className="px-5 pb-10">
      <div className="flex gap-3">
        <div className={`p-2 m-auto  bg-${notificaitonColor} rounded-full`}>
          {notification?.type === "error" && (
            <PiWarningLight className="text-3xl text-white" />
          )}
          {notification?.type === "warning" && (
            <PiWarningOctagon className="text-3xl text-white" />
          )}
          {notification?.type === "info" && (
            <PiInfoLight className="text-3xl text-white" />
          )}
          {notification?.type === "success" && (
            <PiCheckCircleLight className="text-3xl text-white" />
          )}
        </div>
        <div
          className={` border-2 h-6 m-auto  border-${notificaitonColor}`}
        ></div>
        <div className="flex-col flex-1">
          <div className="text-xs text-right">{date}</div>
          <div className="font-semibold">{notification?.title}</div>
        </div>
      </div>
      <hr className="my-4 bg-gray-500" />
      <div className="text-justify">{notification?.message}</div>
    </div>
  );
};

export default NotificationDetails;
