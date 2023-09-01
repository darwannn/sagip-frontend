import { memo } from "react";
// Functional Components
import VerifyUserItem from "./VerifyUserItem";
// Types
import type { User } from "../../../../types/user";

type TProps = {
  verificationRequests: User[];
};

const VerifyUserList = memo(({ verificationRequests }: TProps) => {
  return (
    <>
      <div className="flex flex-col gap-3 h-full w-full overflow-y-auto">
        {verificationRequests.length != 0 ? (
          verificationRequests.map((verificationRequest) => (
            <VerifyUserItem
              key={verificationRequest._id}
              verificationRequests={verificationRequest}
            />
          ))
        ) : (
          <p className="text-center">No Results</p>
        )}
      </div>
    </>
  );
});

export default VerifyUserList;
