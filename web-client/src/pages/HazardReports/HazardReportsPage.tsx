import { useGetHazardReportsQuery } from "../../services/hazardReportsQuery";

const HazardReportsPage = () => {
  const {
    data,
    isLoading: isReportsLoading,
    isSuccess: isReportsSuccess,
    isError: isReportsError,
    error,
  } = useGetHazardReportsQuery(undefined);

  if (isReportsLoading) console.log("Loading...");
  if (isReportsError) console.log(error);
  if (isReportsSuccess) console.log(data);

  return (
    <>
      <h1>Hazard Reports Page</h1>
    </>
  );
};

export default HazardReportsPage;
