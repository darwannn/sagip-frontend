import { Controller, FieldValues, useForm } from "react-hook-form";
import Select from "react-select";
import { useDismissAssistanceRequestMutation } from "../../../../services/assistanceRequestQuery";
import { useAppDispatch } from "../../../../store/hooks";
import { setSelectedAssistanceRequest } from "../../../../store/slices/assistanceReqSlice";
import { RiFileCloseFill } from "react-icons/ri";
import { toast } from "react-toastify";

type TProps = {
  assistanceId: string;
};

const rejectReasonst = [
  {
    value: "False Alarm",
    label: "False Alarm",
  },
  {
    value: "Insufficient Information",
    label: "Insufficient Information",
  },
  {
    value: "Outside Service Area",
    label: "Outside Service Area",
  },
];

const DismissAssistanceForm: React.FC<TProps> = ({ assistanceId }) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors: formErrors, isDirty },
  } = useForm<FieldValues>();

  const dispatch = useAppDispatch();

  const [dismissReq, { isError, error }] =
    useDismissAssistanceRequestMutation();

  const onSubmit = async (data: FieldValues) => {
    if (!isDirty) return;

    if (!confirm("Are you sure you want to dismiss this emergency request ?"))
      return;

    const res = await toast.promise(
      dismissReq({
        id: assistanceId,
        body: { reason: data.reason, note: data.note },
      }).unwrap,
      {
        pending: "Rejecting assistance request...",
        success: "Request has been rejected.",
        error: "Something is wrong.",
      }
    );

    if (res.success) {
      dispatch(setSelectedAssistanceRequest(null));
    }
  };

  if (isError) console.log(error);

  if (assistanceId === "") return <p className="text-center">Invalid ID</p>;

  return (
    <form className="flex flex-col gap-2">
      <div className="form-group text-sm">
        <label htmlFor="reasonTxt" className="form-label">
          Reason
        </label>
        <Controller
          control={control}
          name="reason"
          rules={{ required: true }}
          render={({ field: { onChange, value } }) => (
            <Select
              className="text-sm"
              options={rejectReasonst}
              value={value}
              onChange={onChange}
              placeholder={"Select a reason for rejecting emergency request"}
            />
          )}
        />
        {formErrors.reason && (
          <span className="text-red-500 text-sm block">Reason is required</span>
        )}
      </div>
      <div className="form-group text-sm mt-5">
        <label htmlFor="additionalNote" className="form-label">
          Additional Note
        </label>
        <textarea
          id="additionalNote"
          className="border rounded-md p-2 w-full text-sm"
          rows={5}
          {...register("additionalNote")}
        ></textarea>
      </div>
      <div className="flex flex-row justify-end mt-5">
        <button
          className="btn-secondary"
          onClick={handleSubmit(onSubmit)}
          disabled={!isDirty}
        >
          <RiFileCloseFill />
          Reject
        </button>
      </div>
    </form>
  );
};

export default DismissAssistanceForm;
