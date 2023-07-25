import { BASE_IMAGE_URL } from "../../../api.config";
import { User } from "../../../types/user";

type TProps = {
  user: User;
};

const UserCard = ({ user }: TProps) => {
  return (
    <div className="flex flex-row gap-2">
      <div>
        <img
          src={`${BASE_IMAGE_URL}/user/${user.profilePicture}`}
          alt="Team Leader"
          className="w-14 h-14 rounded-full"
        />
      </div>
      <div>
        <span className="text-sm text-gray-500">{user._id}</span>
        <p className="font-bold">{`${user.lastname}, ${user.firstname} ${user.middlename} 
          `}</p>
      </div>
    </div>
  );
};

export default UserCard;
