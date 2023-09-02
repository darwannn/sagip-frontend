import { useState, useEffect } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

import { TSurvey, TSurveyResData } from "../../../../types/alert";
import { useGetActiveSurveyQuery } from "../../../../services/surveyQuery";
import {
  useAddSurveyMutation,
  useUpdateSurveyMutation,
} from "../../../../services/surveyQuery";

import moment from "moment";
import { useNavigate } from "react-router-dom";

type TProps = {
  surveyData?: TSurvey;
};

const SurveyForm = ({ surveyData }: TProps) => {
  const { data: activeAlert } = useGetActiveSurveyQuery();

  const [
    addAlert,
    { isError: addIsError, isLoading: addIsLoading, error: addErr },
  ] = useAddSurveyMutation();
  const [
    updateAlert,
    {
      isError: updateIsError,
      isLoading: updateIsLoading,
      isSuccess: updateIsSuccess,
    },
  ] = useUpdateSurveyMutation();

  const navigate = useNavigate();

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
    formState: { isDirty, errors },
  } = useForm<FieldValues>({
    defaultValues: {
      title: surveyData?.title,
      category: surveyData?.category,
      /* by default, input type="date" requires its value to be in YYYY-MM-DD format */
      endDate: moment(surveyData?.endDate).format("YYYY-MM-DD"),
    },
  });

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

    let res;
    if (surveyData) {
      res = await updateAlert({
        body,
        id: surveyData._id,
      });
    } else {
      res = await addAlert(body);
    }
    console.log(res);
    if (res && "data" in res) {
      if (res.data.success) {
        navigate(`/admin/welness-check`);
      }
    }
  };

  const onPublish: SubmitHandler<FieldValues> = async (data) => {
    SubmitAlertData(data, "active");
  };

  const onUnpublish: SubmitHandler<FieldValues> = async (data) => {
    SubmitAlertData(data, "inactive");
  };

  if (addIsLoading) console.log("Loading...");
  if (addIsError) {
    if (addErr && "status" in addErr) {
      const data = "data" in addErr ? (addErr.data as TSurveyResData) : null;
      console.log(data?.title);
    }
  }

  if (updateIsLoading) console.log("Updating...");
  if (updateIsError) console.log("Error updating");
  if (updateIsSuccess) console.log("Updated successfully");

  return (
    <form>
      {surveyData?._id !== activeAlert?._id && activeAlert?.success === true && (
        <div className="bg-red-400 text-white px-5 py-3 my-5 rounded">
          There is already an active alert. Please unpublish it before
          publishing a new one.
        </div>
      )}
      <div className="flex flex-col mt-5">
        <label htmlFor="title">Title</label>
        <input
          type="text-area"
          id="title"
          className="border p-1 "
          placeholder="Title"
          {...register("title", { required: true })}
        />
        {errors.title && (
          <span className="text-red-500">Title is required</span>
        )}
      </div>
      <div className="flex flex-col mt-5">
        <label htmlFor="endDate">End Date</label>
        <input
          type="date"
          id="endDate"
          className="border p-1 "
          placeholder="End Date"
          {...register("endDate", { required: true })}
        />
        {errors.endDate && (
          <span className="text-red-500">Date is required</span>
        )}
      </div>
      <div className="flex flex-col mt-5">
        <label htmlFor="category">Category</label>
        <select id="category" {...register("category")}>
          <option value="Earthquake">Earthquake</option>
          <option value="Flood">Flood</option>
        </select>
      </div>

      <div className="mt-5">
        <button
          className="bg-green-500 text-white px-5 py-1 m-2 rounded disabled:bg-green-300"
          onClick={handleSubmit(onPublish)}
          disabled={
            addIsLoading ||
            updateIsLoading ||
            surveyData?._id !== activeAlert?._id
          }
        >
          {!surveyData
            ? "Publish"
            : surveyData?.status === "active"
              ? "Update"
              : "Publish"}
        </button>

        {surveyData && (
          <button
            className="bg-red-500 text-white px-5 py-1 m-2 rounded"
            onClick={handleSubmit(onUnpublish)}
            disabled={addIsLoading || updateIsLoading}
          >
            {surveyData?.status === "active" ? "Unpublish" : "Update"}
          </button>
        )}
      </div>
    </form>
  );
};

export default SurveyForm;
