import { TUserNotification } from "../../types/notification";
import { formatDate } from "../../util/date";

interface NotificationItemProps {
  notification?: TUserNotification;
}

const NotificationItem: React.FC<NotificationItemProps> = ({
  notification,
}) => {
  const date = formatDate(notification?.createdAt);

  return (
    <div
      className={`text-sm p-3 rounded ${
        notification?.isRead ? "bg-gray-100" : "bg-primary-100"
      }`}
    >
      <div>
        <p className="font-semibold">{notification?.title}</p>
      </div>
      <div>
        <p>{notification?.message}</p>
        <span className="text-xs">{date}</span>
      </div>
    </div>
  );
};

export default NotificationItem;
