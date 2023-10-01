import { /* useEffect, */ useState } from "react";
import {
  useGetUserNotificationQuery,
  /* useReadUserNotificationMutation, */
} from "../../../services/notificationQuery";

import NotificationItem from "./NotificationItem";

import BottomSheet from "../../../components/BottomSheet/BottomSheet";
import NotificationDetails from "./NotificationDetails";

import moment from "moment";
const NotificationPage = () => {
  const [filterUnread, setFilterUnread] = useState(false);

  const { data, isError, isLoading, isSuccess, error } =
    useGetUserNotificationQuery();
  /*  const [readNotification] = useReadUserNotificationMutation(); */
  const [showBottomSheet, setShowBottomSheet] = useState<boolean>(false);
  const [page, setPage] = useState(1);

  /*  useEffect(() => {

      readNotification()
     
    
  }, []); */

  const per_page = 7;

  const copyData = data && [...data];

  const sortedData = copyData
    ?.filter((notification) => {
      if (filterUnread) return !notification.isRead;
      return notification;
    })
    .sort((a, b) => {
      const dateA = moment(a.createdAt).valueOf();
      const dateB = moment(b.createdAt).valueOf();
      return dateB - dateA;
    });

  const end = page * per_page;

  const entries = sortedData?.slice(0, end);

  if (isError) console.log("Error loading notifications: ", error);

  const maxPage = sortedData ? Math.ceil(sortedData?.length / per_page) : 0;
  let notificationList;
  let notificationLoadMore;

  if (isLoading) {
    notificationList = <p className="text-center my-5">Loading...</p>;
  } else if (isSuccess && entries?.length === 0) {
    notificationList = (
      <p className="text-center my-5">No new notifications.</p>
    );
  } else if (isSuccess && entries && entries?.length > 0) {
    notificationList = entries?.map((notification) => (
      <NotificationItem
        key={notification._id}
        notification={notification}
        setShowBottomSheet={setShowBottomSheet}
      />
    ));
  }

  if (page < maxPage) {
    notificationLoadMore = (
      <button
        className="py-1 px-3 w-full mt-3"
        onClick={() => setPage(page + 1)}
      >
        Load more
      </button>
    );
  }

  return (
    <>
      <div className="notification-panel w-full min-h-screen bg-gray-200 px-5 py-5">
        <div className="mb-5">
          <h3 className="text-primary-600 text-2xl font-bold">Notification:</h3>
        </div>
        <div className="flex flex-row gap-2 p-1 bg-gray-100 w-max mb-4 rounded ">
          <button
            className={`py-1 px-3 rounded ${
              !filterUnread ? "bg-primary-500 text-white" : ""
            }`}
            onClick={() => setFilterUnread(false)}
          >
            All
          </button>
          <button
            className={`py-1 px-3 rounded ${
              filterUnread ? "bg-primary-500 text-white" : ""
            }`}
            onClick={() => setFilterUnread(true)}
          >
            Unread
          </button>
        </div>
        <div className="notification-container flex flex-col gap-2">
          {notificationList}
        </div>
        {notificationLoadMore}
      </div>

      <BottomSheet
        showBottomSheet={showBottomSheet}
        setShowBottomSheet={setShowBottomSheet}
        snapPoints={[1000]}
        headerStyle={"bg-white rounded-t-3xl"}
        contentStyle={"bg-white"}
        component={
          <>
            <NotificationDetails />
          </>
        }
        isBackdropShown={true}
      />
    </>
  );
};

export default NotificationPage;
