import { Outlet } from "react-router-dom";
import AdminSidebar from "../../components/Navigation/AdminSidebar";
import NotificationPanel from "../../components/Notification/NotificationPanel";

const AdminRootLayout = () => {
  return (
    <div className="relative root flex flex-row h-screen w-screen">
      <AdminSidebar />
      <NotificationPanel />
      <div className="outlet grow overflow-y-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminRootLayout;
