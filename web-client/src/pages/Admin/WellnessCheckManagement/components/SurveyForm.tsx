import { useState, useEffect } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

import { TSurvey, TSurveyResData } from "../../../../types/survey";
import { useGetActiveSurveyQuery } from "../../../../services/surveyQuery";
import {
  useAddSurveyMutation,
  useUpdateSurveyMutation,
} from "../../../../services/surveyQuery";

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "../../../../components/ui/Alert";

import moment from "moment";
import { toast } from "react-toastify";

type TProps = {
  surveyData?: TSurvey;
};

const SurveyForm = ({ surveyData }: TProps) => {
  const { data: activeAlert } = useGetActiveSurveyQuery();

  const [
    addAlert,
    { isError: addIsError, isLoading: addIsLoading, error: addErr },
  ] = useAddSurveyMutation();
  const [updateAlert, { isError: updateIsError, isLoading: updateIsLoading }] =
    useUpdateSurveyMutation();

  /* allows status to be updated without changing the value of other fields */
  const [initialStatus, setInitialStatus] = useState<string>("");
  useEffect(() => {
    if (surveyData) {
      setInitialStatus(surveyData.status);
    }
  }, [surveyData]);

  const {
    register,
    handleSubmit,
    watch,
    formState: { isDirty, errors },
  } = useForm<FieldValues>({
    defaultValues: {
      title: surveyData?.title,
      category: surveyData?.category,
      /* by default, input type="date" requires its value to be in YYYY-MM-DD format */
      endDate: moment(surveyData?.endDate).format("YYYY-MM-DD"),
    },
  });
  const endDateValue = watch("endDate");

  const SubmitAlertData = async (data: FieldValues, status: string) => {
    if (!isDirty && status === initialStatus) {
      console.log("No changes made");
      return;
    }

    const body: Partial<TSurvey> = {
      title: data.title,
      category: data.category,
      status: status,
      endDate: data.endDate,
    };

    if (surveyData) {
      toast.promise(
        updateAlert({
          body,
          id: surveyData._id,
        }).unwrap,
        {
          pending: "Updating survey...",
          success: "Survey updated!",
          error: "Something went wrong",
        }
      );
    } else {
      toast.promise(addAlert(body).unwrap, {
        pending: "Publishing survey...",
        success: "Survey published!",
        error: "Something went wrong",
      });
    }
  };

  const onPublish: SubmitHandler<FieldValues> = async (data) => {
    SubmitAlertData(data, "active");
  };

  if (addIsLoading) console.log("Loading...");
  if (addIsError) {
    if (addErr && "status" in addErr) {
      const data = "data" in addErr ? (addErr.data as TSurveyResData) : null;
      console.log(data?.title);
    }
  }

  if (updateIsError) console.log("Error updating");

  return (
    <form>
      {surveyData?._id !== activeAlert?._id &&
        activeAlert?.success === true && (
          <Alert className="bg-yellow-100 border-none mb-5">
            {/* There is already an active alert. Please unpublish it before
            publishing a new one. */}
            <AlertTitle>There is already an active wellness check.</AlertTitle>
            <AlertDescription>
              Please unpublish it before publishing a new one.
            </AlertDescription>
          </Alert>
        )}
      <div className="flex flex-col gap-5">
        <div className="form-group">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text-area"
            id="title"
            className="form-input "
            placeholder="Title"
            {...register("title", { required: true })}
          />
          {errors.title && (
            <span className="text-red-500">Title is required</span>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="endDate" className="form-label">
            End Date
          </label>
          <input
            type="date"
            id="endDate"
            className="form-input"
            placeholder="End Date"
            {...register("endDate", { required: true })}
          />
          {errors.endDate && (
            <span className="text-red-500">Date is required</span>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="category" className="form-label">
            Category
          </label>
          <select
            id="category"
            className="p-2 border rounded"
            {...register("category")}
          >
            <option value="Earthquake">Earthquake</option>
            <option value="Flood">Flood</option>
          </select>
        </div>
      </div>

      <div className="mt-5">
        <button
          className="btn-primary float-right"
          onClick={handleSubmit(onPublish)}
          disabled={
            addIsLoading ||
            updateIsLoading ||
            (activeAlert?.success && surveyData?._id !== activeAlert?._id) ||
            (!surveyData &&
              !moment(endDateValue).isSameOrAfter(moment(), "day"))
          }
        >
          {!surveyData
            ? "Publish"
            : moment(endDateValue).isSameOrAfter(moment(), "day")
            ? surveyData?._id !== activeAlert?._id
              ? "Publish"
              : "Update"
            : surveyData?._id !== activeAlert?._id
            ? "Update"
            : "Finish"}
        </button>
      </div>
    </form>
  );
};

export default SurveyForm;
