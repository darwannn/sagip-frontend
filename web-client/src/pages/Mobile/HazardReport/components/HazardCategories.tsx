const HazardCategories = () => {
  return (
    <div className="px-5">
      <div className="text-xl font-semibold"> Submit a report:</div>
      <div className="bg-gray-100 text-gray-700  px-5 py-3 rounded-lg my-2">
        Object on the street{" "}
        <span className="text-gray-400"> i.e. Fallen Tree</span>
      </div>
      <div className="bg-gray-100 text-gray-700  px-5 py-3 rounded-lg my-2">
        Damaged road
      </div>
      <div className="bg-gray-100 text-gray-700  px-5 py-3 rounded-lg my-2">
        Others
      </div>
    </div>
  );
};

export default HazardCategories;
