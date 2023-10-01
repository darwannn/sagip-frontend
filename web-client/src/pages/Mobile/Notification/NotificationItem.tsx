import { setSelectedNotification } from "../../../store/slices/userManageSlice";
import { useAppDispatch } from "../../../store/hooks";
import { TUserNotification } from "../../../types/notification";
import { formatDate } from "../../../util/date";

import {
  PiWarningLight,
  PiCheckCircleLight,
  PiWarningOctagon,
  PiInfoLight,
} from "react-icons/pi";

interface NotificationItemProps {
  notification?: TUserNotification;
  setShowBottomSheet: (show: boolean) => void;
}

const NotificationItem: React.FC<NotificationItemProps> = ({
  notification,
  setShowBottomSheet,
}) => {
  const dispatch = useAppDispatch();
  const date = formatDate(notification?.createdAt);
  const notificaitonColor =
    notification?.type === "error"
      ? "[#C92A2A]"
      : notification?.type === "info"
      ? "[#364FC7]"
      : notification?.type === "warning"
      ? "[#FFD400]"
      : "green-500";
  return (
    <div
      className={`bg-white text-sm p-3 rounded-xl relative ${
        notification?.isRead === false && `border-2 border-${notificaitonColor}`
      }`}
      onClick={() => {
        setShowBottomSheet(true);
        if (notification) dispatch(setSelectedNotification(notification));
      }}
    >
      <div
        className={`bg-${notificaitonColor} w-1 h-10 rounded-r-full absolute left-0 top-1/2 transform -translate-y-1/2 `}
      ></div>

      <div className="flex gap-2">
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

        <div className="flex-col flex-1">
          <div className="text-xs text-right">{date}</div>
          <div className="font-semibold">{notification?.title}</div>

          <div
            style={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "-webkit-box",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: 2,
            }}
          >
            {notification?.message}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationItem;
