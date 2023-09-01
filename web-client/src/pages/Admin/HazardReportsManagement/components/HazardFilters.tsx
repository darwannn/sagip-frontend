type TProps = {
  onChangeFilter: (filter: string) => void;
};

const HazardFilters = ({ onChangeFilter }: TProps) => {
  return (
    <div className="flex flex-row w-full overflow-x-auto gap-2">
      <button
        className="p-2 bg-gray-200 rounded-md"
        onClick={() => onChangeFilter("All")}
      >
        All
      </button>
      <button
        className="p-2 bg-gray-200 rounded-md"
        onClick={() => onChangeFilter("Review")}
      >
        Review
      </button>
      <button
        className="p-2 bg-gray-200 rounded-md"
        onClick={() => onChangeFilter("Ongoing")}
      >
        Ongoing
      </button>
      <button
        className="p-2 bg-gray-200 rounded-md"
        onClick={() => onChangeFilter("Resolved")}
      >
        Resolved
      </button>
    </div>
  );
};

export default HazardFilters;
