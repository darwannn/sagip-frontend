import { useParams } from "react-router-dom";
import {
  useArchiveUserMutation,
  useGetUserByIdQuery,
  useResetPasswordMutation,
  useUpdateUserMutation,
} from "../../../../services/usersQuery";
import { User } from "../../../../types/user";
import { toast } from "react-toastify";

const UserAccountOptions = () => {
  const { userId } = useParams<{ userId: string }>();
  const {
    data: userData,
    isLoading,
    isError,
    error,
  } = useGetUserByIdQuery(userId);
  const [updateUser, { isError: isUpdateError, error: updateErr }] =
    useUpdateUserMutation();
  const [archiveUser, { isError: isArchiveError, error: archiveErr }] =
    useArchiveUserMutation();
  const [resetPassword, { isError: isResetError, error: resetErr }] =
    useResetPasswordMutation();

  const onResetPasswordHandler = async () => {
    const confirm = window.confirm(
      "Are you sure you want to reset this user's password?"
    );
    if (!confirm) return;
    await toast.promise(resetPassword({ id: userId || "" }).unwrap, {
      pending: "Resetting Password...",
      success: "Password has been reset",
      error: "Something went wrong",
    });
  };

  const onBanHandler = async () => {
    const body: Partial<User> = {
      contactNumber: userData?.contactNumber,
      email: userData?.email,
      status: userData?.status,
      isBanned: userData?.isBanned ? false : true,
      userType: userData?.userType,
      firstname: userData?.firstname,
      middlename: userData?.middlename,
      lastname: userData?.lastname,
    };

    const confirmBan = confirm(
      `Are you sure you want to ${
        userData?.isBanned === true ? "unban" : "ban"
      } this user?`
    );

    if (confirmBan) {
      toast.promise(updateUser({ body, id: userId || "" }).unwrap, {
        pending: "Loading...",
        success: `User has been ${
          userData?.isBanned === true ? "unbanned" : "banned"
        }`,
        error: "Something went wrong",
      });
    }
  };

  if (isLoading) {
    return <p>Loading Account Information ...</p>;
  }

  if (isError) {
    console.log(error);
    return <p>Something went wrong</p>;
  }

  if (isResetError) {
    console.log(resetErr);
  }

  if (isUpdateError) {
    console.log(updateErr);
  }

  if (isArchiveError) {
    console.log(archiveErr);
  }

  const onArchiveHandler = async () => {
    const confirm = window.confirm(
      `Are you sure you want to ${
        userData?.status === "archived" ? "unarchive" : "archive"
      } this account?`
    );
    if (!confirm) return;

    const action = userData?.isArchived ? "unarchive" : "archive";

    await toast.promise(archiveUser({ action, id: userId || "" }).unwrap, {
      pending: "Loading...",
      success: `User has been ${
        userData?.status === "archived" ? "unarchived" : "archived"
      }`,
      error: "Something went wrong",
    });
  };

  const banMsg = userData?.isBanned
    ? "Unbanning a user account will restore their access to the system. If their account was previously banned, this action will reverse the ban and allow them to use their account again."
    : "Banning a user account will immediately revoke their access to the system. This action is reversible, allowing you to lift the ban at a later time if necessary. However, it should only be used in cases of serious misconduct or policy violations.";
  const banWarn = userData?.isBanned
    ? "Please proceed with caution and ensure that the reason for the ban no longer applies or has been resolved before unbanning the user."
    : "Please ensure that banning this user is warranted and aligns with your organization's guidelines.";

  const archiveMsg = userData?.isArchived
    ? "Unarchiving a user account will restore their access to the system. If their account was previously archived, this action will reverse the archive and allow them to use their account again."
    : "Archiving a user account will temporarily restrict access and disable the account. However, it can be unarchived later if needed.";

  const archiveWarn = userData?.isArchived
    ? "Please proceed with caution and ensure that the reason for the archive no longer applies or has been resolved before unarchiving the user."
    : "Please ensure that archiving is necessary.";

  return (
    <div>
      <section className="flex flex-col gap-10">
        <div className="text-sm">
          <h3 className="text-orange-500 text-lg font-semibold">
            Reset Password
          </h3>
          <hr className="my-3" />
          <p className="">
            Resetting the user's password to the default will permanently change
            their current password to the predefined default password.
          </p>
          <p className="text-orange-500">
            Please make sure that this reset is authorized and communicated to
            the user.
          </p>
          <button
            className="border border-orange-500 text-sm text-orange-500 font-semibold py-2 px-3 mt-3 rounded hover:bg-orange-500 hover:text-white duration-100 transition-all"
            onClick={onResetPasswordHandler}
          >
            Reset Password
          </button>
        </div>
        <div className="text-sm">
          <h3 className="text-orange-500 text-lg font-semibold">
            {userData?.isBanned ? "Unban User" : "Ban User"}
          </h3>
          <hr className="my-3" />
          <p className="">{banMsg}</p>
          <p className="text-orange-500">{banWarn}</p>
          <button
            className="border border-orange-500 text-sm text-orange-500 font-semibold py-2 px-3 mt-3 rounded hover:bg-orange-500 hover:text-white duration-100 transition-all"
            onClick={onBanHandler}
          >
            {userData?.isBanned ? "Unban User" : "Ban User"}
          </button>
        </div>
        <div className="text-sm">
          <h3 className="text-orange-500 text-lg font-semibold">
            {userData?.isArchived ? "Unarchive User" : "Archive User"}
          </h3>
          <hr className="my-3" />
          <p>{archiveMsg}</p>
          <p className="text-orange-500">{archiveWarn}</p>
          <button
            className="border border-orange-500 text-sm text-orange-500 font-semibold py-2 px-3 mt-3 rounded hover:bg-orange-500 hover:text-white duration-100 transition-all"
            onClick={onArchiveHandler}
          >
            {userData?.isArchived ? "Unarchive User" : "Archive User"}
          </button>
        </div>
      </section>
    </div>
  );
};

export default UserAccountOptions;
