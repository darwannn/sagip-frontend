import { Outlet } from "react-router-dom";
import AdminSidebar from "../../components/Navigation/AdminSidebar";
import NotificationPanel from "../../components/Notification/NotificationPanel";
import { useState } from "react";
import { useReadUserNotificationMutation } from "../../services/notificationQuery";

const AdminRootLayout = () => {
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [readNotification, { isError: readError, error: readErrorData }] =
    useReadUserNotificationMutation();

  const toggleNotification = () => {
    setIsNotificationOpen(!isNotificationOpen);
    if (isNotificationOpen) {
      readNotification();
    }
  };

  if (readError) console.log("Error reading notification: ", readErrorData);

  return (
    <div className="relative root flex flex-row h-screen w-screen">
      <AdminSidebar toggleNotificationHandler={toggleNotification} />
      {isNotificationOpen && <NotificationPanel />}
      <div className="outlet grow overflow-y-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminRootLayout;
