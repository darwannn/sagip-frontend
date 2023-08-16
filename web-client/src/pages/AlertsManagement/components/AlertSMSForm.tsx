import {
  Controller,
  FieldValues,
  SubmitHandler,
  useForm,
} from "react-hook-form";

// Redux
import { useSendAlertMutation } from "../../../services/alertQuery";

import { useState } from "react";
import Select from "react-select";

import {
  getBarangays,
  Barangay,
} from "../../../components/AddressSelector/AddressSelector";

const AlertForm = () => {
  const [formMessage, setFormMessage] = useState<string>("");
  const [selectedBarangay, setSelectedBarangay] = useState<null>(null);
  const [sendToSpecific, setSendToSpecific] = useState<boolean>(false);
  const [resetSelectKey, setResetSelectKey] = useState<number>(0);
  const [
    sendAlert,
    {
      isError: sendIsError,
      isLoading: sendIsLoading,
      isSuccess: sendIsSuccess,
    },
  ] = useSendAlertMutation();

  const {
    register,
    reset,
    control,
    handleSubmit,
    formState: { isDirty, errors },
  } = useForm<FieldValues>({});

  const SubmitAlertData = async (data: FieldValues) => {
    if (!isDirty) {
      console.log("No changes made");
      return;
    }

    // Prepare the data to be sent to the server
    const body = {
      alertTitle: data.alertTitle,
      alertMessage: data.alertMessage,
      /* by default, the alert will be sent to all registered user */
      location: sendToSpecific ? data.location : ["All"],
    };

    const token = localStorage.getItem("token");

    const res = await sendAlert({ body, token });
    console.log(res);
    if (res && "data" in res) {
      if (res.data.success) {
        setFormMessage(res.data.message);
        setSendToSpecific(false);
        setSelectedBarangay(null);
        setResetSelectKey((prevKey) => prevKey + 1);
        reset({
          alertTitle: "",
          alertMessage: "",
          location: "",
        });
      }
    }
  };

  const onSend: SubmitHandler<FieldValues> = async (data) => {
    SubmitAlertData(data);
  };

  if (sendIsLoading) console.log("Updating...");
  if (sendIsError) console.log("Error updating");
  if (sendIsSuccess) console.log("Updated successfully");

  return (
    <form>
      {formMessage && (
        <div className="bg-green-500 text-white p-2 rounded-md text-center">
          {formMessage}
        </div>
      )}
      <div className=" w-full flex flex-col bg-indigo-100 p-5 mt-5 rounded-xl">
        <div className="flex flex-col  ">
          <label htmlFor="alertTitle">Title</label>
          <input
            className="border p-1 rounded-md"
            type="text"
            id="alertTitle"
            placeholder="Enter title"
            {...register("alertTitle", { required: true })}
          />
          {errors.alertTitle && (
            <span className="text-red-500">This field is required</span>
          )}
        </div>
        <div className="flex flex-col mt-5">
          <label htmlFor="alertMessage" className="">
            Message
          </label>
          <textarea
            className="border p-1 rounded-md"
            id="alertMessage"
            placeholder="Enter message"
            rows={5}
            {...register("alertMessage", { required: true })}
          />
          {errors.alertMessage && (
            <span className="text-red-500">This field is required</span>
          )}
        </div>
        <div className="mt-5 mb-2 flex items-center">
          <input
            className="border p-1 rounded-md h-5 w-5"
            type="checkbox"
            id="sendToSpecific"
            onChange={(e) => setSendToSpecific(e.target.checked)}
            checked={sendToSpecific}
          />
          <label htmlFor="sendToSpecific" className="text-[16px] ml-2">
            Send to a specific Barangay
          </label>
        </div>
        <Controller
          control={control}
          defaultValue={selectedBarangay}
          {...(sendToSpecific && { rules: { required: true } })}
          name="location"
          render={({ field }) => (
            <Select
              key={resetSelectKey}
              onChange={(val) => field.onChange(val.map((c) => c.value))}
              options={options}
              isMulti
              isClearable={true}
              placeholder="Select Barangay/s"
              isDisabled={!sendToSpecific}
            />
          )}
        />

        {sendToSpecific && errors.location && (
          <span className="text-red-500">This field is required</span>
        )}
        <button
          className="w-full bg-indigo-500 hover:bg-indigo-600 text-white px-5 py-1 mt-10 rounded"
          onClick={handleSubmit(onSend)}
          disabled={sendIsLoading}
        >
          Send
        </button>
      </div>
    </form>
  );
};

export default AlertForm;

const barangays = await getBarangays("031410");

const options = barangays.map((barangay: Barangay) => ({
  value: barangay.brgy_name,
  label: barangay.brgy_name,
}));
