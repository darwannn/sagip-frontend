import { useEffect } from "react";
import {
  NavLink,
  Outlet,
  ScrollRestoration,
  useNavigate,
} from "react-router-dom";
import {
  LuGalleryThumbnails,
  LuHome,
  LuMap,
  LuShieldAlert,
  LuSiren,
} from "react-icons/lu";
import ShowNav from "../../routers/ShowNav";

const MobileRootPage = () => {
  // THIS PAGE REDIRECTS TO THE ADMIN DASHBOARD
  const navigate = useNavigate();
  useEffect(() => {
    /* navigate("/admin") */
  }, [navigate]);

  return (
    <div className="relative min-h-screen bg-gray-100">
      {/* ScrollRestoration resets the scroll after moving to another page */}
      <ScrollRestoration />
      {/**
       * * Added padding to each page to avoid the bottom nav from overlapping the content
       */}
      <Outlet />
      {/* MOBILE NAV */}
      <ShowNav>
        <div className="fixed bottom-0 left-0 h-[80px] w-full">
          {/* Nav Items Container */}
          <div className="bg-white h-full max-w-[450px] min-w-[350px] mx-auto pt-[20px] rounded-t-3xl shadow-[0px_-1px_10px_0px_rgba(0,0,0,0.10)]">
            <ul className="relative flex items-center justify-center gap-12  mx-auto">
              <div className="indicator absolute w-20 h-20 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full -translate-y-[20%] border-[8px] border-white"></div>
              <li className="z-10">
                <NavLink
                  to={"home"}
                  className={({ isActive }) =>
                    `${isActive && "child:text-red-500"}`
                  }
                >
                  <LuHome className="text-[24px] text-gray-400" />
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={"hazard-map"}
                  className={({ isActive }) =>
                    `${isActive && "child:text-red-500"}`
                  }
                >
                  <LuMap className="text-[24px] text-gray-400" />
                </NavLink>
              </li>
              <li className="relative -translate-y-4">
                <NavLink
                  to={
                    /*  window.AndroidInterface?.isLocationEnabled("resident")
                    ?  */ "emergency-reports"
                    /*  : "#" */
                  }
                  className={`text-white`}
                >
                  <LuSiren className="z-10 text-[30px]" />
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={"hazard-reports"}
                  className={({ isActive }) =>
                    `${isActive && "child:text-red-500"}`
                  }
                >
                  <LuShieldAlert className="text-[24px] text-gray-400" />
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={"articles"}
                  className={({ isActive }) =>
                    `${isActive && "child:text-red-500"}`
                  }
                >
                  <LuGalleryThumbnails className="text-[24px] text-gray-400" />
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </ShowNav>
    </div>
  );
};

export default MobileRootPage;
