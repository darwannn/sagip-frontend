import { useEffect, useState } from "react";
//Type
import { User } from "../../types/user";

//Services
import { useLazyGetUserByIdQuery } from "../../services/usersApi";

type PROPS = {
  userId: string;
};

const UserRowAction = ({ userId }: PROPS) => {
  const [userData, setUserData] = useState<User>();
  const [getUser, results] = useLazyGetUserByIdQuery();

  useEffect(() => {
    if (results.data) {
      setUserData(results.data);
      console.log(userData);
    }
  }, [results, userData]);

  const onViewHandler = () => {
    getUser(userId);
  };

  return (
    <div className="w-max flex justify-center align-center">
      <button
        className="bg-indigo-500 rounded px-3 py-1 text-white"
        onClick={onViewHandler}
        disabled={results.isLoading}
      >
        {results.isLoading ? "Loading..." : "View"}
      </button>
    </div>
  );
};

export default UserRowAction;
