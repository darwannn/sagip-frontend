import { NavLink, Outlet } from "react-router-dom";

const AdminRootLayout = () => {
  return (
    <div className="fixed root flex flex-row h-screen w-screen">
      <div className="sidebar flex flex-col w-60">
        <nav>
          <ul>
            <li>
              <NavLink to={"/"}>Home</NavLink>
            </li>
            <li>
              <NavLink to={"/users"}>Users</NavLink>
            </li>
            <li>
              <NavLink to={"/teams"}>Teams</NavLink>
            </li>
            <li>
              <NavLink to={"/emergency-reports"}>Emergency Reports</NavLink>
            </li>
            <li>
              <NavLink to={"/hazard-reports"}>Hazard Reports</NavLink>
            </li>
            <li>
              <NavLink to={"/facility-map"}>Facility Map</NavLink>
            </li>
            <li>
              <NavLink to={"/disaster-alerts"}>Disaster Alerts</NavLink>
            </li>
            <li>
              <NavLink to={"/articles"}>Articles</NavLink>
            </li>
            <li>
              <NavLink to={"/account-settings"}>Account Settings</NavLink>
            </li>
            {/* <li>
            <NavLink to={"/login"}>Login</NavLink>
          </li>
          <li>
            <NavLink to={"/register"}>Register</NavLink>
          </li>
          <li>
          <NavLink to={"/forgot-password"}>Forgot Password</NavLink>
          </li> */}
          </ul>
        </nav>
      </div>
      <div className="outlet grow overflow-y-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminRootLayout;
