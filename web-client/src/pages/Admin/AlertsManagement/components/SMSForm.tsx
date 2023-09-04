import { useState, useEffect, useCallback } from "react";
import { Controller, FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Select from "react-select"
import { Barangay, getBarangays } from "../../../../components/AddressSelector/AddressSelector";
import { useSendAlertMutation } from "../../../../services/alertQuery";
import { SMSAlert } from "../../../../types/alert";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import { selectedTemplate, setSelectedTemplate } from "../../../../store/slices/alertSlice";
// ICONS
import { MdSend } from "react-icons/md";
import { IoMdClose } from "react-icons/io";
import { toast } from "react-toastify";

const SMSForm = () => {
  const [malBarangays, setMalBarangays] = useState<Barangay[]>([]);
  const getMalolosBarangays = useCallback(async () => {
    const barangays = await getBarangays("031410");
    setMalBarangays(barangays);
  }, []);

  const [sendAlert, { isLoading, isError, error }] = useSendAlertMutation();

  const { register, handleSubmit, reset, watch, setValue, control, formState: { errors } } = useForm<FieldValues>();

  const dispatch = useAppDispatch();
  const setTemplate = useAppSelector(selectedTemplate);

  const watchSendOpt = watch("sendOptions");

  useEffect(() => {
    getMalolosBarangays();

    if (setTemplate) {
      setValue("alertTitle", setTemplate.alertTitle);
      setValue("alertMessage", setTemplate.alertMessage);
    }

  }, [getMalolosBarangays, setTemplate, setValue]);

  const options = malBarangays.map((barangay: Barangay) => ({
    value: barangay.brgy_name,
    label: barangay.brgy_name,
  }));


  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const selectedLoc = data.sendOption === "sendToSpecific" ? data.location.map((loc: { value: string, label: string }) => loc.value) : ["All"];

    const smsData: SMSAlert = {
      alertTitle: data.alertTitle,
      alertMessage: data.alertMessage,
      location: selectedLoc,
    }

    const res = await toast.promise(sendAlert(smsData).unwrap, {
      pending: 'Sending Alert...',
      success: 'Alert Send Success!',
      error: 'Failed To Send Alert'
    })

    if (res) {
      if (res.success) {
        reset()
        if (setTemplate)
          dispatch(setSelectedTemplate(null));
      }
    }
  };

  if (isError) {
    console.log(error);
  }

  return (
    <form className="col-span-3 flex flex-col" onSubmit={handleSubmit(onSubmit)}>
      {setTemplate &&
        <div className="p-2 bg-blue-200 my-2 rounded border-l-4 border-l-blue-500 flex flex-row justify-between">
          <span className="text-sm truncate">Using template: <span className="font-semibold">{setTemplate?.alertTitle}</span></span>
          <button type="button" className="flex items-center text-gray-500 hover:text-gray-800"
            onClick={() => {
              dispatch(setSelectedTemplate(null));
              reset();
            }}
          >
            <IoMdClose />
          </button>
        </div>
      }
      <div className="form-group">
        <label htmlFor="alertTitle" className="form-label">
          Title
        </label>
        <input className="form-input" type="text" id="alertTitle" placeholder="Enter Alert Title" {...register("alertTitle", { required: true })} />
        {errors.alertTitle && <span className="input-error">Title is required.</span>}
      </div>
      <div className="form-group grow">
        <label htmlFor="alertMessage" className="form-label">
          Message
        </label>
        <textarea className="form-input h-full resize-none" id="alertMessage" placeholder="Enter alert message or select from the templates." {...register("alertMessage", { required: true })} />
        {errors.alertMessage && <span className="input-error">Message is required.</span>}
      </div>
      <label htmlFor="" className="form-label">Sending Options</label>
      <div className="">
        <div className="flex flex-row gap-2">
          <input
            {...register("sendOptions")}
            value="all"
            type="radio"
            id="sendToAll"
          />
          <label htmlFor="sendToAll" className="">
            Send to <span className="font-bold">all</span>
          </label>
        </div>
        <div className="flex flex-row gap-2 mb-2">
          <input
            {...register("sendOptions")}
            value="sendToSpecific"
            type="radio"
            id="sendToSpecific"
            defaultChecked
          />
          <label htmlFor="sendToSpecific" className="">
            Send to specific barangay
          </label>
        </div>
        <Controller
          control={control}
          name={"location"}
          rules={{ required: watchSendOpt === "sendToSpecific" }}
          render={({ field: { onChange } }) => (
            <Select
              isMulti
              options={options}
              placeholder="Select a barangay"
              isDisabled={watchSendOpt === "all"}
              onChange={onChange}
            />
          )}
        />
        {errors.location && <span className="input-error">Reciepient location is required.</span>}

      </div>
      <div className="action-container flex flex-row justify-end mt-5">
        <button className="btn-primary" type="submit" disabled={isLoading}>
          {isLoading ? "Sending..." :
            <>
              Send Alert
              <span><MdSend /></span>
            </>
          }
        </button>
      </div>
    </form>);
}

export default SMSForm;