import { useState } from "react";
// Services / API
import { useAppSelector } from "../../store/hooks";
import { useGetVerificationRequestsQuery } from "../../services/usersApi";
import { selectionVerificationRequest } from "../../store/slices/userManageSlice";

import { Link } from "react-router-dom";

import VerifyUserData from "./components/VerifyUserData";

import VerifyUserList from "./components/VerifyUserList";

import { MdChevronLeft } from "react-icons/md";
const VerifyUserPage = () => {
  const token = localStorage.getItem("token");
  const [search, setSearch] = useState<string>("");
  const selectedVerificationRequest = useAppSelector(
    selectionVerificationRequest
  );

  // Get all the verificationRequests
  const {
    data: verificationRequests,
    isLoading: isVerificationRequestsLoading,
    error: isVerificationRequestsFetchError,
  } = useGetVerificationRequestsQuery({ token });

  // Filter verificationRequests base on name
  const filterdVerificationRequests = () => {
    let filteredVerificationRequests = verificationRequests?.filter(
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
    <div className="flex flex-row  bg-indigo-50">
      {/* VerificationRequests List */}

      {isVerificationRequestsLoading ? (
        <p> Fetching verification Requests </p>
      ) : (
        <>
          <div className=" w-[350px] flex flex-col z-10 bg-white shadow-md rounded-r-xl p-4 h-screen sticky top-0">
            <div className="flex items-center">
              {/* temporary back button */}
              <Link className="text-3xl" to={"/users"}>
                <MdChevronLeft />
              </Link>
              <h1 className="font-bold text-2xl text-sky-900 mt-3">
                Verification
                <br />
                Requests
              </h1>
            </div>
            <div className="mt-8 mb-1">To review:</div>
            <hr className="border border-gray-300 bg-gray-300 " />

            <input
              type="text"
              placeholder="Search by name"
              className="w-full p-2 my-5 border border-gray-300 rounded-md"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <VerifyUserList
              verificationRequests={filterdVerificationRequests() || []}
            />
          </div>
        </>
      )}
      {selectedVerificationRequest ? (
        <VerifyUserData verificationRequest={selectedVerificationRequest} />
      ) : (
        <div className="m-auto">Select a request to verify</div>
      )}
    </div>
  );
};

export default VerifyUserPage;
