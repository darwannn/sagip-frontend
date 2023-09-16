import { useParams, Outlet, useNavigate, NavLink } from "react-router-dom";
import { useGetUserByIdQuery } from "../../../services/usersQuery";
import moment from "moment";
import { BASE_IMAGE_URL } from "../../../api.config";
import { Badge } from "../../../components/ui/Badge";
import { IoMdArrowRoundBack } from "react-icons/io";
import { PiGearSixBold, PiUserCircleBold } from "react-icons/pi";

const ViewUserPage = () => {
  const navigate = useNavigate();
  const { userId } = useParams();
  const { data: userData, isLoading, error } = useGetUserByIdQuery(userId);

  if (isLoading) {
    return <p>Loading...</p>;
  }
  if (error) {
    console.log(userId);
    console.log(error);

    return <p>Something went wrong</p>;
  }

  return (
    <div className="p-10 min-h-screen">
      <div className="mb h-full flex gap-2">
        <button
          className="text-2xl p-1 text-gray-500 hover:bg-blue-100 rounded"
          onClick={() => navigate("/admin/users")}
        >
          <IoMdArrowRoundBack />
        </button>
        <h1 className="text-2xl font-bold text-primary-500">
          User Information
        </h1>
      </div>
      <hr className="my-5" />
      <div className="flex flex-row gap-10">
        <div className="flex flex-col gap-5 w-56">
          {/* User Avatar */}
          <div className="">
            <p className="font-semibold mb-5">Profile Picture</p>
            <img
              className="w-40 h-40 mx-auto rounded-full"
              src={`${BASE_IMAGE_URL}/user/${userData?.profilePicture}`}
              alt="user avatar"
            />
          </div>
          <div className="flex flex-col gap-2 text-sm">
            <div>
              <span className="form-label">User ID</span>
              <p className="text-gray-500">{userData?._id}</p>
            </div>
            <div>
              <span className="form-label">Role</span>
              <p className="text-gray-500 capitalize">{userData?.userType}</p>
            </div>
            <div>
              <span className="form-label">Joined</span>
              <p className="text-gray-500">
                {moment(userData?.createdAt).format("MMM DD, YYYY")}
              </p>
            </div>
            <div>
              <span className="form-label block">
                Identity Verification Status
              </span>
              <Badge
                className={`capitalize mt-1 ${
                  userData?.status.toLowerCase() === "verified"
                    ? "bg-green-500"
                    : "bg-yellow-500"
                }`}
              >
                {userData?.status}
              </Badge>
            </div>
            <div>
              <span className="form-label block">Email Verification</span>
              <Badge
                className={`capitalize mt-1 ${
                  userData?.emailStatus.toLowerCase() === "verified"
                    ? "bg-green-500"
                    : "bg-yellow-500"
                }`}
              >
                {userData?.emailStatus}
              </Badge>
            </div>
          </div>
          <hr className="my-5" />
          <div className="flex flex-col gap-1">
            <NavLink
              className={({ isActive }) =>
                `${
                  isActive ? "child:bg-slate-200" : ""
                } text-sm font-semibold text-gray-600`
              }
              to={""}
              end
            >
              <div className="flex items-center p-2 hover:bg-blue-100 rounded">
                <PiUserCircleBold className="text-lg mr-2" />
                User Information
              </div>
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                `${
                  isActive ? "child:bg-slate-200" : ""
                } text-sm font-semibold text-gray-600`
              }
              to={"account-actions"}
              end
            >
              <div className="flex items-center p-2 hover:bg-blue-100 rounded">
                <PiGearSixBold className="text-lg mr-2" />
                Account Action
              </div>
            </NavLink>
          </div>
        </div>
        <div className="flex-1">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default ViewUserPage;
