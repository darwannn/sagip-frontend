import { useState } from "react";
// Services / API
import { useGetVerificationRequestsQuery } from "../../../services/usersQuery";

import { Link, Outlet } from "react-router-dom";

import VerifyUserList from "./components/VerifyUserList";
// Icons
import { IoMdArrowRoundBack } from "react-icons/io";
import { RiSearchLine } from "react-icons/ri";

const VerifyUserPage = () => {
  const token = localStorage.getItem("token");
  const [search, setSearch] = useState<string>("");

  // Get all the verificationRequests
  const {
    data: verificationRequests,
    isLoading: isVerificationRequestsLoading,
    error: isVerificationRequestsFetchError,
  } = useGetVerificationRequestsQuery({ token });

  // Filter verificationRequests base on name
  const filterdVerificationRequests = () => {
    const filteredVerificationRequests = verificationRequests?.filter(
      (VerificationRequest) => {
        const fullName = `${VerificationRequest.firstname} ${VerificationRequest.middlename} ${VerificationRequest.lastname}`;
        const name = `${VerificationRequest.firstname} ${VerificationRequest.lastname}`;
        const searchedName = search.toLowerCase();

        return (
          fullName.toLowerCase().includes(searchedName) ||
          name.toLowerCase().includes(searchedName) ||
          VerificationRequest.firstname.toLowerCase().includes(searchedName) ||
          VerificationRequest.middlename.toLowerCase().includes(searchedName) ||
          VerificationRequest.lastname.toLowerCase().includes(searchedName)
        );
      }
    );

    return filteredVerificationRequests;
  };

  if (isVerificationRequestsFetchError) {
    console.log(isVerificationRequestsFetchError);

    return <p>Something went wrong...</p>;
  }

  return (
    <div className="min-h-screen flex flex-row bg-indigo-50">
      {/* VerificationRequests List */}

      {isVerificationRequestsLoading ? (
        <p> Fetching verification Requests </p>
      ) : (
        <div className=" w-[400px] flex flex-col z-10 bg-white shadow-md  py-10 px-7 h-screen sticky top-0">
          <div className="flex items-center gap-2">
            {/* temporary back button */}
            <Link
              className="text-2xl p-1 text-gray-500 hover:bg-blue-100 rounded"
              to={"/admin/users"}
            >
              <IoMdArrowRoundBack />
            </Link>
            <h1 className="font-bold text-xl text-primary-500 mt-white3">
              Verification Requests
            </h1>
          </div>
          <hr className="my-5" />
          {/* Search Bar */}
          <div className="flex flex-row gap-2 items-center border p-2 rounded mb-5">
            <RiSearchLine className="text-lg text-gray-500" />
            <input
              className="flex-grow focus:outline-none"
              placeholder="Search with ID, Name or Email"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <VerifyUserList
            verificationRequests={filterdVerificationRequests() || []}
          />
        </div>
      )}
      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  );
};

export default VerifyUserPage;
