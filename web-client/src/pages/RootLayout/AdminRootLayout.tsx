import { NavLink, Outlet } from "react-router-dom";

const AdminRootLayout = () => {
  return (
    <>
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
      <br />
      <Outlet />
    </>
  );
};

export default AdminRootLayout;
