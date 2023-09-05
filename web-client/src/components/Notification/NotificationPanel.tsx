import moment from 'moment'
import { useGetUserNotificationQuery } from "../../services/notificationQuery";
import NotificationItem from "./NotificationItem";

const NotificationPanel = () => {

  const { data, isSuccess, isError, error, isLoading } = useGetUserNotificationQuery();

  const page = 1;
  const per_page = 8;

  const copyData = data && [...data];

  const sortedData = copyData?.sort((a, b) => {
    const dateA = moment(a.createdAt).valueOf();
    const dateB = moment(b.createdAt).valueOf();
    return dateB - dateA; // Sort in descending order (latest first)
  });
  console.log("Sorted data: ", sortedData)

  const end = page * per_page;

  const entries = sortedData?.slice(0, end);
  console.log("Entries: ", entries)

  if (isLoading) console.log("Loading notifications...")
  if (isError) console.log("Error loading notifications: ", error)
  if (isSuccess) console.log("Notifications: ", data.length)

  return (
    <div className="notification-panel absolute z-[5] left-[300px] w-[350px] p-5 h-screen bg-gray-50 shadow overflow-y-auto">
      <div className="mb-5">
        <h3 className="font-semibold text-lg">Notifications</h3>
      </div>
      <div className="notification-container flex flex-col gap-2">
        {entries?.map((notification) => (
          <NotificationItem key={notification._id} notification={notification} />
        ))}
      </div>
    </div>
  );
}

export default NotificationPanel;