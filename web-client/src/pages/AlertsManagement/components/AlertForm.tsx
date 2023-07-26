import { useState, useEffect } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

import { TActiveSurvey, TSurvey, TSurveyResData } from "../types/alert";

import {
  useAddAlertMutation,
  useUpdateAlertMutation,
} from "../../../services/alertQuery";

import moment from "moment";
import { useNavigate } from "react-router-dom";

import { useSelector } from "react-redux";
import { selectActiveAlert } from "../../../store/slices/alertSlice";

type TProps = {
  alertData?: TSurvey;
};

const AlertForm = ({ alertData }: TProps) => {
  const [
    addAlert,
    { isError: addIsError, isLoading: addIsLoading, error: addErr },
  ] = useAddAlertMutation();
  const [
    updateAlert,
    {
      isError: updateIsError,
      isLoading: updateIsLoading,
      isSuccess: updateIsSuccess,
    },
  ] = useUpdateAlertMutation();

  const navigate = useNavigate();

  /* allows status to be updated without changing the value of other fields */
  const activeAlert = useSelector(selectActiveAlert) as TActiveSurvey;

  const [initialStatus, setInitialStatus] = useState<string>("");
  useEffect(() => {
    if (alertData) {
      setInitialStatus(alertData.status);
    }
  }, [alertData]);

  const {
    register,
    handleSubmit,
    formState: { isDirty, errors },
  } = useForm<FieldValues>({
    defaultValues: {
      title: alertData?.title,
      category: alertData?.category,
      /* by default, input type="date" requires its value to be in YYYY-MM-DD format */
      endDate: moment(alertData?.endDate).format("YYYY-MM-DD"),
    },
  });

  const SubmitAlertData = async (data: FieldValues, status: string) => {
    if (!isDirty && status === initialStatus) {
      console.log("No changes made");
      return;
    }

    const body = {
      title: data.title,
      category: data.category,
      status: status,
      endDate: data.endDate,
    };

    const token = localStorage.getItem("token");
    let res;
    if (alertData) {
      res = await updateAlert({
        body,
        token,
        id: alertData._id,
      });
    } else {
      res = await addAlert({ body, token });
    }
    if (res && "data" in res) {
      if (res.data.success) {
        navigate(`/disaster-alerts`);
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
      {alertData?._id !== activeAlert?._id && activeAlert?.success === true && (
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
            addIsLoading || updateIsLoading || activeAlert?.success === true
          }
        >
          {!alertData
            ? "Publish"
            : alertData?.status === "active"
            ? "Update"
            : "Publish"}
        </button>

        {alertData && (
          <button
            className="bg-red-500 text-white px-5 py-1 m-2 rounded"
            onClick={handleSubmit(onUnpublish)}
            disabled={addIsLoading || updateIsLoading}
          >
            {alertData?.status === "active" ? "Unpublish" : "Update"}
          </button>
        )}
      </div>
    </form>
  );
};

export default AlertForm;
