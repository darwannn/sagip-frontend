import { useParams } from "react-router-dom";

import { User } from "../../../types/user";

import AccountEmailForm from "./AccountEmailForm";
import AccountContactNumberForm from "./AccountContactNumberForm";
import AccountPasswordForm from "./AccountPasswordForm";
import AccountProfileForm from "./../components/AccountProfileForm";

type TProps = {
  userData?: User;
};
const ViewAccountPage = ({ userData }: TProps) => {
  let { page } = useParams();

  return (
    <div className="flex-1 bg-red-100 ">
      <div className=" flex flex-col bg-indigo-50 p-5  rounded-xl h-full">
        <div className="flex-1">
          {/* display specific component based on the url parameter */}
          {page === "profile" && <AccountProfileForm userData={userData} />}
          {page === "email" && <AccountEmailForm userData={userData} />}
          {page === "contact-number" && (
            <AccountContactNumberForm userData={userData} />
          )}
          {page === "password" && <AccountPasswordForm userData={userData} />}
        </div>
      </div>
    </div>
  );
};

export default ViewAccountPage;
