import { ReactNode, FC } from "react";
import { useLocation } from "react-router-dom";

type ShowNavProps = {
  children: ReactNode;
};

const ShowNav: FC<ShowNavProps> = ({ children }) => {
  const noNavPath = [
    "/account-settings",
    "/notification",
    "/emergency-hotlines",
    "/emergency-reports",
    "/hazard-reports/",
    "/articles/",
  ];
  const location = useLocation();

  /**
   * * This is a much more specific way of checking the path name
   * * This checks if path name is equal to the string
   * When using this method, make sure to include the exact path name
   */
  // if (noNavPath.includes(location.pathname)) {
  //   return null;
  // }

  // * This checks if path name contains the string
  if (noNavPath.some((path) => location.pathname.includes(path))) {
    return null;
  }

  return <>{children}</>;
};

export default ShowNav;
