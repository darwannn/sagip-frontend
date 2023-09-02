import { useState, useEffect, useCallback } from "react";
import { Controller, FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Select from "react-select"
import { Barangay, getBarangays } from "../../../../components/AddressSelector/AddressSelector";
import { MdSend } from "react-icons/md";

const SMSForm = () => {
  const [malBarangays, setMalBarangays] = useState<Barangay[]>([]);
  const getMalolosBarangays = useCallback(async () => {
    const barangays = await getBarangays("031410");
    setMalBarangays(barangays);
  }, []);

  const { register, handleSubmit, watch, control, formState: { errors } } = useForm<FieldValues>();

  const watchSendOpt = watch("sendOptions");

  useEffect(() => {
    getMalolosBarangays();
  }, [getMalolosBarangays]);

  const options = malBarangays.map((barangay: Barangay) => ({
    value: barangay.brgy_name,
    label: barangay.brgy_name,
  }));

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log(data);
  };


  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="form-group">
        <label htmlFor="alertTitle" className="form-label">
          Title
        </label>
        <input className="form-input" type="text" id="alertTitle" placeholder="Enter Alert Title" {...register("alertTitle", { required: true })} />
        {errors.alertTitle && <span className="input-error">Title is required.</span>}
      </div>
      <div className="form-group">
        <label htmlFor="alertMessage" className="form-label">
          Message
        </label>
        <textarea className="form-input" id="alertMessage" placeholder="Enter alert message or select from the templates." rows={10} {...register("alertMessage", { required: true })} />
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
        <button className="btn-primary" type="submit">
          Send Alert
          <span><MdSend /></span>
        </button>
      </div>
    </form>);
}

export default SMSForm;