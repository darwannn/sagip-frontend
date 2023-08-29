import { Outlet } from "react-router-dom";
import AdminSidebar from "../../components/Navigation/AdminSidebar";

const AdminRootLayout = () => {
  return (
    <div className="fixed root flex flex-row h-screen w-screen">
      <AdminSidebar />
      <div className="outlet grow overflow-y-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminRootLayout;
