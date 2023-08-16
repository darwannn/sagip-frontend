import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { useGetUserByTokenQuery } from "../../services/accountQuery";

import AccountOptionList from "./components/AccountSettingsList";
import ViewAccountPage from "./components/ViewAccountPage";

const ManageAccountPage = () => {
  let { page } = useParams();

  const [isMobile, setIsMobile] = useState(false);
  const { data: userData, isLoading, error } = useGetUserByTokenQuery();

  /* checks if the screen size is less than 768px (xs/default to md breakpoint) */
  const checkScreenSize = () => {
    const isMobileSize = window.matchMedia("(max-width: 768px)").matches;
    setIsMobile(isMobileSize);
  };
  useEffect(() => {
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => {
      window.removeEventListener("resize", checkScreenSize);
    };
  }, []);

  if (isLoading) {
    return <p>Loading...</p>;
  }
  if (error) {
    console.log(error);
    return <p>Something went wrong</p>;
  }

  return (
    <>
      {isMobile ? (
        /* for mobile, show only one component at a time */
        <div className="flex flex-col h-full">
          {page !== "profile" &&
            page !== "email" &&
            page !== "contact-number" &&
            page !== "password" && <AccountOptionList userData={userData} />}

          {page && <ViewAccountPage userData={userData} />}
        </div>
      ) : (
        /* for web, show two components at the same time */
        <div className="w-full flex">
          <AccountOptionList />
          {/* flex-1, takes the rest of the space */}
          <ViewAccountPage userData={userData} />
        </div>
      )}
    </>
  );
};

export default ManageAccountPage;
