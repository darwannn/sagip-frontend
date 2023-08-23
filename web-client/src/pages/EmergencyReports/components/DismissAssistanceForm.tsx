import { FieldValues, useForm } from "react-hook-form";
import { useDismissAssistanceRequestMutation } from "../../../services/assistanceRequestQuery";
import { useAppDispatch } from "../../../store/hooks";
import { setSelectedAssistanceRequest } from "../../../store/slices/assistanceReqSlice";

type TProps = {
  assistanceId: string;
  closeModal: () => void;
};

const DismissAssistanceForm: React.FC<TProps> = ({
  assistanceId,
  closeModal,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors: formErrors },
  } = useForm<FieldValues>();
  const dispatch = useAppDispatch();
  const [dismissReq, { isLoading, isError, error }] =
    useDismissAssistanceRequestMutation();
  const onSubmit = async (data: FieldValues) => {
    const res = await dismissReq({
      id: assistanceId,
      body: { reason: data.reason, note: data.note },
    });

    if (res && "data" in res) {
      closeModal();
      dispatch(setSelectedAssistanceRequest(null));
    } else if ("error" in res) {
      console.log(res.error);
    }
  };

  if (isLoading) console.log("dismiss loading");
  if (isError) console.log(error);

  if (assistanceId === "") return <p className="text-center">Invalid ID</p>;

  return (
    <form className="flex flex-col gap-2">
      <div>
        <label htmlFor="reasonTxt" className="">
          Reason for Dismiss:
        </label>
        <input
          id="reasonTxt"
          type="text"
          className="border rounded-md p-2 w-full"
          {...register("reason", { required: true })}
        />
        {formErrors.reason && (
          <span className="text-red-500 text-sm block">Reason is required</span>
        )}
      </div>
      <div>
        <label htmlFor="additionalNote" className="">
          Additional Note:
        </label>
        <textarea
          id="additionalNote"
          className="border rounded-md p-2 w-full"
          rows={5}
          {...register("additionalNote")}
        ></textarea>
      </div>
      <div className="flex flex-row justify-end">
        <button
          className="bg-red-500 text-white px-3 py-2 rounded"
          onClick={handleSubmit(onSubmit)}
        >
          Dismiss
        </button>
      </div>
    </form>
  );
};

export default DismissAssistanceForm;
