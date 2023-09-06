import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const TEMP_ROOT_PAGE = () => {
  // THIS PAGE REDIRECTS TO THE ADMIN DASHBOARD
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/admin")
  }, [navigate]);

  return <Outlet />;
};

export default TEMP_ROOT_PAGE;
