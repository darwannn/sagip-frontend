import { useParams, useNavigate } from "react-router-dom";
import moment from "moment";
// import SurveyForm from "./components/SurveyForm";
import {
  useGetSurveyByIdQuery,
  useUpdateSurveyMutation,
} from "../../../services/surveyQuery";
import { Badge } from "../../../components/ui/Badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../components/ui/Dialog";
import {
  BiMessageSquareCheck,
  BiSolidCalendarAlt,
  BiSolidCalendarCheck,
} from "react-icons/bi";
import { IoMdArrowRoundBack } from "react-icons/io";
import ResponseTable from "./components/ResponseTable";
import { LoaderSpin } from "../../../components/Loader/Loader";
import Doughnut from "../../../components/Charts/Doughnut";
import { TbEdit, TbInputCheck, TbReport } from "react-icons/tb";
import SurveyForm from "./components/SurveyForm";
import { toast } from "react-toastify";

const ViewSurveyPage = () => {
  const navigate = useNavigate();
  const { surveyId } = useParams();
  const {
    data: surveyData,
    isLoading,
    isFetching,
    error,
  } = useGetSurveyByIdQuery(surveyId);

  const [
    updateAlert,
    // {
    //   isError: updateIsError,
    //   isLoading: updateIsLoading,
    //   isSuccess: updateIsSuccess,
    // },
  ] = useUpdateSurveyMutation();

  const onUnpublishHandler = async () => {
    if (surveyData?.status !== "active") return;
    if (!window.confirm("Are you sure you want to unpublish this survey?"))
      return;
    const res = await toast.promise(
      updateAlert({
        body: {
          title: surveyData?.title,
          category: surveyData?.category,
          status: "inactive",
          endDate: new Date().toISOString(),
        },
        id: surveyId || "",
      }).unwrap,
      {
        pending: "Unpublishing survey...",
        success: "Survey unpublished!",
        error: "Something went wrong",
      }
    );
    if (!res.success) {
      console.log(res.message);
    }
  };

  if (isFetching) {
    return <p>Loading...</p>;
  }

  if (isLoading) {
    return <p>Loading...</p>;
  }
  if (error) {
    console.log(surveyId);
    console.log(error);

    return <p>Something went wrong</p>;
  }

  const startDate = moment(surveyData?.startDate).format("MMM D, YYYY | h:mma");
  const endDate = moment(surveyData?.endDate).format("MMM D, YYYY | h:mma");

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      {/* <SurveyForm surveyData={alertData} /> */}
      <div className="bg-white pt-10 pb-5 px-10 shadow">
        <div>
          <button
            className="text-2xl p-1 text-gray-500 hover:bg-blue-100 rounded"
            onClick={() => navigate("/admin/wellness-check")}
          >
            <IoMdArrowRoundBack />
          </button>
        </div>
        <div className="flex flex-row justify-between items-center">
          <div className="flex flex-row items-center gap-3">
            <h1 className="font-bold text-2xl text-indigo-500">
              {surveyData?.title}
            </h1>
            <Badge className="rounded-md text-xs bg-gray-500">
              {surveyData?.category}
            </Badge>
          </div>
          <div className="flex items-center gap-2">
            {surveyData?.status === "active" && (
              <button
                className="flex items-center gap-2 text-sm text-green-500 font-semibold border border-green-500 rounded-md py-2 px-3
                hover:bg-green-500 hover:text-white transition-all duration-100
                "
                onClick={() => onUnpublishHandler()}
              >
                <BiMessageSquareCheck className="text-lg" />
                Finish
              </button>
            )}
            <button
              className="flex items-center gap-2 text-sm text-red-500 font-semibold border border-red-500 rounded-md py-2 px-3
                hover:bg-red-500 hover:text-white transition-all duration-100
                "
              onClick={() =>
                window.open(`/wellness-check/report/${surveyId}`, "_blank")
              }
            >
              <TbReport className="text-lg" />
              Generate Report
            </button>

            <Dialog>
              <DialogTrigger className="btn-primary">
                <TbEdit className="text-lg" />
                Edit
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle className="">Publish Wellness Check</DialogTitle>
                </DialogHeader>
                <SurveyForm surveyData={surveyData} />
              </DialogContent>
            </Dialog>
          </div>
        </div>
        <hr className="my-3" />
        <div className="text-sm flex flex-row gap-3">
          {surveyData?.status === "active" && (
            <Badge className="rounded-md text-xs bg-green-500">Ongoing</Badge>
          )}
          <div className="flex flex-row items-center gap-2">
            <span>
              <BiSolidCalendarAlt className="text-gray-400" />
            </span>
            <span className="text-gray-500">{`Posted: ${startDate}`}</span>
          </div>
          <div className="flex flex-row items-center gap-2">
            <span>
              <BiSolidCalendarCheck className="text-gray-400" />
            </span>
            <span className="text-gray-500">{`End: ${endDate}`}</span>
          </div>
        </div>
      </div>

      <div className="grow p-10 flex flex-col gap-5">
        <div className="flex flex-row gap-5">
          <div className="flex flex-row flex-wrap gap-4 mb-8">
            <div className="flex flex-row justify-between items-start p-6 xl:w-[250px] bg-white rounded-md shadow">
              <div className="flex flex-col gap-2">
                <span className="text-sm text-gray-500">Total Responses</span>
                <h3 className="text-2xl font-bold">
                  {isLoading ? <LoaderSpin /> : surveyData?.responses?.length}
                </h3>
              </div>
              <div className="bg-blue-100 p-2 rounded">
                <TbInputCheck className="text-blue-500 text-lg " />
              </div>
            </div>
          </div>
          {surveyData?.responses && surveyData?.responses?.length > 0 ? (
            <div className="flex flex-row items-center justify-center gap-5 p-6 xl:w-[350px] bg-white shadow rounded-md">
              <div className="w-32 h-max">
                {isLoading ? (
                  <LoaderSpin />
                ) : (
                  <Doughnut
                    data={[
                      {
                        title: "Unaffected",
                        value: surveyData?.unaffected.length || 0,
                        color: "rgba(99, 102, 241,1)",
                      },
                      {
                        title: "Affected",
                        value: surveyData?.affected.length || 0,
                        color: "rgba(212, 85, 85, 1)",
                      },
                    ]}
                  />
                )}
              </div>
              <div className="flex-1 flex flex-col gap-3 text-sm">
                <div>
                  <div className="flex flex-row items-center gap-2">
                    <span className="w-2 h-2 mr-1 rounded-full bg-blue-500"></span>
                    <span className="text-sm">Unaffected</span>
                  </div>
                  <p className="pl-6 text-xl font-bold">
                    {surveyData?.affected.length}
                  </p>
                </div>
                <div>
                  <div className="flex flex-row items-center gap-2">
                    <span className="w-2 h-2 mr-1 rounded-full bg-red-500"></span>
                    <span className="text-sm">Affected</span>
                  </div>
                  <p className="pl-6 text-xl font-bold">
                    {surveyData?.unaffected.length}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <></>
          )}
        </div>
        <h2 className="font-semibold text-xl">Responses:</h2>
        {surveyData && <ResponseTable surveyData={surveyData} />}
      </div>
    </div>
  );
};

export default ViewSurveyPage;
