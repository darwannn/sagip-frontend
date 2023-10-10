import { Link } from "react-router-dom";
import { Table } from "@tanstack/react-table";
import { User } from "../../../../types/user";

// Icons
import { RiSearchLine } from "react-icons/ri";
import { GiNotebook } from "react-icons/gi";
import { BsFillPersonFill } from "react-icons/bs";
import { useGetVerificationRequestsQuery } from "../../../../services/usersQuery";
// import { Popover } from "../../../../components/ui/Popover";
import { BiFilter } from "react-icons/bi";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../../../components/ui/Popover";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "../../../../components/ui/Dialog";
import UserForm from "./UserForm";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import {
  selectUserFilters,
  setFilterArchive,
  setFilterRoles,
} from "../../../../store/slices/userManageSlice";
interface UserTableActionsProps {
  table: Table<User>;
  globalFilterVal: string;
  setGlobalFilterVal: (value: string) => void;
}

const UserTableActions: React.FC<UserTableActionsProps> = ({
  // table,
  globalFilterVal,
  setGlobalFilterVal,
}) => {
  /* used to determine what action button to show */
  const token = localStorage.getItem("token");

  const dispatch = useAppDispatch();
  const { isArchive, roles } = useAppSelector(selectUserFilters);
  const isStaff = useAppSelector((state) => state.userManage.isStaff);

  const {
    data: verificationRequests,
    // error: isVerificationRequestsFetchError,
  } = useGetVerificationRequestsQuery({ token });

  // For filtering data
  // const [searchOption, setSearchOption] = useState<string>("firstname");

  return (
    <section className="flex flex-row justify-between  items-center w-full">
      <div className="flex flex-row gap-2 items-center">
        {/* Search Bar */}
        <div className="flex flex-row gap-2 items-center border xl:w-[350px] p-2 rounded">
          <RiSearchLine className="text-lg text-gray-500" />
          <input
            className="flex-grow focus:outline-none"
            placeholder="Search with ID, Name or Email"
            value={globalFilterVal}
            onChange={(e) => setGlobalFilterVal(e.target.value)}
          />
        </div>
        <Popover>
          <PopoverTrigger className="flex items-center py-2 px-3 text-gray-500 bg-slate-100 rounded">
            <BiFilter className="mr-2" />
            Filter
          </PopoverTrigger>
          <PopoverContent className="text-sm">
            {isStaff && (
              <>
                <div>
                  <p className="font-semibold mb-2">Roles</p>
                  <div className="flex flex-row flex-wrap gap-3">
                    <div className="flex flex-row gap-2">
                      <input
                        type="checkbox"
                        id="super-admin"
                        checked={roles.includes("super-admin")}
                        onChange={() => dispatch(setFilterRoles("super-admin"))}
                      />
                      <label htmlFor="super-admin">Super-Admin</label>
                    </div>
                    <div className="flex flex-row gap-2">
                      <input
                        type="checkbox"
                        id="admin"
                        checked={roles.includes("admin")}
                        onChange={() => dispatch(setFilterRoles("admin"))}
                      />
                      <label htmlFor="admin">Admin</label>
                    </div>
                    <div className="flex flex-row gap-2">
                      <input
                        type="checkbox"
                        id="responder"
                        checked={roles.includes("responder")}
                        onChange={() => dispatch(setFilterRoles("responder"))}
                      />
                      <label htmlFor="responder">Responder</label>
                    </div>
                    <div className="flex flex-row gap-2">
                      <input
                        type="checkbox"
                        id="dispatcher"
                        checked={roles.includes("dispatcher")}
                        onChange={() => dispatch(setFilterRoles("dispatcher"))}
                      />
                      <label htmlFor="dispatcher">Dispatcher</label>
                    </div>
                  </div>
                </div>
                <hr className="my-2" />
              </>
            )}
            <div>
              <p className="font-semibold mb-2">Archive</p>
              <div className="flex flex-row gap-2">
                <input
                  type="checkbox"
                  id="archived"
                  checked={isArchive}
                  onChange={(e) => {
                    if (e.target.checked) dispatch(setFilterArchive(true));
                    else dispatch(setFilterArchive(false));
                  }}
                />
                <label htmlFor="archived">Filter Archived Users</label>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>

      {/* Other Btns */}
      <div className="flex flex-row gap-3">
        <Link className="flex items-center btn-primary" to={"verify-users"}>
          <GiNotebook className="mr-2" /> Verification Request
          <span className="bg-red-600 text-white rounded-md px-2 ml-2">
            {verificationRequests?.length}
          </span>
        </Link>
        <Dialog>
          <DialogTrigger className="btn-primary flex flex-row items-center">
            <BsFillPersonFill /> Add Users
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Users</DialogTitle>
              <DialogDescription>
                Fill up the form and add a new user.
              </DialogDescription>
            </DialogHeader>
            <UserForm />
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
};

export default UserTableActions;
