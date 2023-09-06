import moment from "moment";
import { useGetUserNotificationQuery } from "../../services/notificationQuery";
import NotificationItem from "./NotificationItem";
import { useState } from "react";

const NotificationPanel = () => {
  const [filterUnread, setFilterUnread] = useState(false);

  const { data, isError, isLoading, isSuccess, error } =
    useGetUserNotificationQuery();

  const [page, setPage] = useState(1);

  const per_page = 7;

  /**
   * Copy the data to prevent
   * TypeError: Cannot assign to read only property '0' of object '[object Array]' in typescript
   * when sorting the data
   */
  const copyData = data && [...data];

  const sortedData = copyData
    ?.filter((notification) => {
      if (filterUnread) return !notification.isRead;
      return notification;
    })
    .sort((a, b) => {
      const dateA = moment(a.createdAt).valueOf();
      const dateB = moment(b.createdAt).valueOf();
      return dateB - dateA; // Sort in descending order (latest first)
    });

  const end = page * per_page;

  const entries = sortedData?.slice(0, end);

  if (isError) console.log("Error loading notifications: ", error);

  let templateList;

  if (isLoading) {
    templateList = <p className="text-center my-5">Loading...</p>;
  } else if (isSuccess && entries?.length === 0) {
    templateList = <p className="text-center my-5">No new notifications.</p>;
  } else if (isSuccess && entries && entries?.length > 0) {
    templateList = entries?.map((notification) => (
      <NotificationItem key={notification._id} notification={notification} />
    ));
  }

  return (
    <div className="notification-panel absolute z-[5] left-[300px] w-[350px] p-5 h-screen bg-gray-50 shadow overflow-y-auto">
      <div className="mb-5">
        <h3 className="font-semibold text-lg text-primary-500">
          Notifications
        </h3>
      </div>
      <div className="flex flex-row gap-2 p-1 bg-gray-100 w-max mb-2 rounded">
        <button
          className={`py-1 px-3 rounded ${!filterUnread ? "bg-blue-200" : ""}`}
          onClick={() => setFilterUnread(false)}
        >
          All
        </button>
        <button
          className={`py-1 px-3 rounded ${filterUnread ? "bg-blue-200" : ""}`}
          onClick={() => setFilterUnread(true)}
        >
          Unread
        </button>
      </div>
      <div className="notification-container flex flex-col gap-2">
        {templateList}
      </div>
    </div>
  );
};

export default NotificationPanel;
