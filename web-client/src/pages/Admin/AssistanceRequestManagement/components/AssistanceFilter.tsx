import { Link, useSearchParams } from "react-router-dom";

const AssistanceFilters = () => {
  const [searchParams] = useSearchParams();
  const isActive = (filter: string | null) => {
    return filter === searchParams.get("filter");
  };

  return (
    <div className="flex flex-row gap-2 p-2 bg-gray-100 shadow-inner rounded-md text-sm font-semibold text-gray-500">
      <Link
        to={`?`}
        className={`cursor-pointer flex-1 text-center  p-2 rounded hover:bg-gray-300 transition-all duration-100 ${
          isActive(null) ? "bg-primary-500 text-white" : ""
        }`}
      >
        All
      </Link>
      <Link
        to={`?filter=unverified`}
        className={`cursor-pointer flex-1 text-center p-2 rounded hover:bg-gray-300 transition-all duration-100 ${
          isActive("unverified") ? "bg-blue-500 text-white" : ""
        }`}
      >
        New
      </Link>
      <Link
        to={`?filter=ongoing`}
        className={`cursor-pointer flex-1 text-center p-2 rounded hover:bg-gray-300 transition-all duration-100 ${
          isActive("ongoing") ? "bg-blue-500 text-white" : ""
        }`}
      >
        Ongoing
      </Link>
      <Link
        to={`?filter=resolved`}
        className={`cursor-pointer flex-1 text-center p-2 rounded hover:bg-gray-300 transition-all duration-100 ${
          isActive("resolved") ? "bg-blue-500 text-white" : ""
        }`}
      >
        Resolved
      </Link>
    </div>
  );
};

export default AssistanceFilters;
