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
interface UserTableActionsProps {
  table: Table<User>;
}

const UserTableActions: React.FC<UserTableActionsProps> = ({ table }) => {
  /* used to determine what action button to show */
  const token = localStorage.getItem("token");

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
            placeholder="Search with ID"
            value={(table.getColumn("_id")?.getFilterValue() as string) ?? ""}
            onChange={(e) =>
              table.getColumn("_id")?.setFilterValue(e.target.value)
            }
          />
        </div>
        <Popover>
          <PopoverTrigger className="flex items-center py-2 px-3 text-gray-500 bg-slate-100 rounded">
            <BiFilter className="mr-2" />
            Filter
          </PopoverTrigger>
          <PopoverContent>{/* Filter Options Here */}</PopoverContent>
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
        <button className="btn-primary">
          <BsFillPersonFill className="mr-2" /> Add Users
        </button>
      </div>
    </section>
  );
};

export default UserTableActions;
