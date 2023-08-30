import { BASE_IMAGE_URL } from "../../api.config";
import { useGetUserByTokenQuery } from "../../services/accountQuery";

const MiniProfile = () => {
  const { data, isLoading, isError, error } = useGetUserByTokenQuery();

  const skeleton = (
    <div className="flex flex-row align-center gap-4 p-2 bg-gray-100 rounded-md">
      <div className="avatar-container flex flex-col justify-center">
        <div className="avatar w-12 h-12 rounded-full bg-gray-300 animate-pulse"></div>
      </div>
      <div className="flex flex-col gap-2">
        <div className="bg-gray-300 h-2.5 w-36 animate-pulse"></div>
        <div className="bg-gray-300 h-2.5  w-20 animate-pulse"></div>
      </div>
    </div>
  );

  if (isLoading) return skeleton;
  if (isError) console.log(error);

  return (
    <div className="flex flex-row align-center gap-4 p-2 bg-gray-100 rounded-md">
      <img
        className="w-12 h-12 rounded-full bg-gray-300 object-cover"
        src={`${BASE_IMAGE_URL}/user/${data?.profilePicture}`}
        alt=""
      />
      <div className="overflow-hidden">
        <p className="text-gray-600 font-bold">
          {data?.firstname + " " + data?.lastname}
        </p>
        <p className="text-gray-600 text-sm leading-tight truncate">
          {data?.email}
        </p>
      </div>
    </div>
  );
};

export default MiniProfile;
