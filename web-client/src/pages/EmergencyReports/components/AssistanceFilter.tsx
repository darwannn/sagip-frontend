import { Link } from "react-router-dom";

const AssistanceFilters = () => {
  return (
    <div className="flex flex-row gap-2 mb-2">
      <Link to={`?filter=new`}>
        <div className="cursor-pointer bg-gray-200 p-2 rounded hover:bg-gray-300 transition-all duration-100">
          New
        </div>
      </Link>
      <Link to={`?filter=ongoing`}>
        <div className="cursor-pointer bg-gray-200 p-2 rounded hover:bg-gray-300 transition-all duration-100">
          Ongoing
        </div>
      </Link>
      <Link to={`?filter=resolved`}>
        <div className="cursor-pointer bg-gray-200 p-2 rounded hover:bg-gray-300 transition-all duration-100">
          Resolved
        </div>
      </Link>
    </div>
  );
};

export default AssistanceFilters;
