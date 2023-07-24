import {
  Controller,
  FieldValues,
  SubmitHandler,
  useForm,
} from "react-hook-form";

// Redux
import { useSendAlertMutation } from "../../../services/alertQuery";

import { useState } from "react";
import Select, { MultiValue } from "react-select";

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
/* temporary, should be similar to the options in user registration page */
const options = [
  { value: "Anilao", label: "Anilao" },
  { value: "Atlag", label: "Atlag" },
  { value: "Babatnin", label: "Babatnin" },
  { value: "Bagna", label: "Bagna" },
  { value: "Bagong-bayan", label: "Bagong Bayan" },
  { value: "Balayong", label: "Balayong" },
  { value: "Balite", label: "Balite" },
  { value: "Bangkal", label: "Bangkal" },
  { value: "Barihan", label: "Barihan" },
  { value: "Bulihan", label: "Bulihan" },
  { value: "Bungahan", label: "Bungahan" },
  { value: "Caingin", label: "Caingin" },
  { value: "Calero", label: "Calero" },
  { value: "Caliligawan", label: "Caliligawan" },
  { value: "Canalate", label: "Canalate" },
  { value: "Caniogan", label: "Caniogan" },
  { value: "Catmon", label: "Catmon" },
  { value: "Cofradia", label: "Cofradia" },
  { value: "Dakila", label: "Dakila" },
  { value: "Guinhawa", label: "Guinhawa" },
  { value: "Ligas", label: "Ligas" },
  { value: "Liyang", label: "Liyang" },
  { value: "Longos", label: "Longos" },
  { value: "Look-1st", label: "Look 1st" },
  { value: "Look-2nd", label: "Look 2nd" },
  { value: "Lugam", label: "Lugam" },
  { value: "Mabolo", label: "Mabolo" },
  { value: "Mambog", label: "Mambog" },
  { value: "Masile", label: "Masile" },
  { value: "Matimbo", label: "Matimbo" },
  { value: "Mojon", label: "Mojon" },
  { value: "Namayan", label: "Namayan" },
  { value: "Niugan", label: "Niugan" },
  { value: "Pamarawan", label: "Pamarawan" },
  { value: "Panasahan", label: "Panasahan" },
  { value: "Pinagbakahan", label: "Pinagbakahan" },
  { value: "San Agustin", label: "San Agustin" },
  { value: "San Gabriel", label: "San Gabriel" },
  { value: "San Juan", label: "San Juan" },
  { value: "San Pablo", label: "San Pablo" },
  { value: "San Vicente Pob", label: "San Vicente (Pob.)" },
  { value: "Santiago", label: "Santiago" },
  { value: "Santisima-trinidad", label: "Santisima Trinidad" },
  { value: "Santo Cristo", label: "Santo Cristo" },
  { value: "Santo Niño Pob", label: "Santo Niño (Pob.)" },
  { value: "Santo Rosario Pob", label: "Santo Rosario (Pob.)" },
  { value: "Santol", label: "Santol" },
  { value: "Sumapang Bata", label: "Sumapang Bata" },
  { value: "Sumapang Matanda", label: "Sumapang Matanda" },
  { value: "Taal", label: "Taal" },
  { value: "Tikay", label: "Tikay" },
];
