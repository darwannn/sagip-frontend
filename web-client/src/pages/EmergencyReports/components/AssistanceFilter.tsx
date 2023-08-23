import { Link, useSearchParams } from "react-router-dom";

const AssistanceFilters = () => {
  const [searchParams] = useSearchParams();
  const isActive = (filter: string) => {
    return filter === searchParams.get("filter");
  };

  return (
    <div className="flex flex-row gap-2 mb-2">
      <Link
        to={`?filter=unverified`}
        className={`cursor-pointer bg-gray-200 p-2 rounded hover:bg-gray-300 transition-all duration-100 ${
          isActive("unverified") ? "bg-gray-300" : ""
        }`}
      >
        New
      </Link>
      <Link
        to={`?filter=ongoing`}
        className={`cursor-pointer bg-gray-200 p-2 rounded hover:bg-gray-300 transition-all duration-100 ${
          isActive("ongoing") ? "bg-gray-300" : ""
        }`}
      >
        Ongoing
      </Link>
      <Link
        to={`?filter=resolved`}
        className={`cursor-pointer bg-gray-200 p-2 rounded hover:bg-gray-300 transition-all duration-100 ${
          isActive("resolved") ? "bg-gray-300" : ""
        }`}
      >
        Resolved
      </Link>
    </div>
  );
};

export default AssistanceFilters;
