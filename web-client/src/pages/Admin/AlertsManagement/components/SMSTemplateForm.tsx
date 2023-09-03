import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useAddAlertTemplateMutation } from "../../../../services/alertQuery";

const SMSTemplateForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [addTemplate, { isLoading, isSuccess, isError }] = useAddAlertTemplateMutation();
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log(data);

    const body = {
      alertTitle: data.alertTitle,
      alertMessage: data.alertMessage,
    }

    addTemplate(body);

  };

  if (isSuccess) {
    console.log("Success");
  }

  if (isError) {
    console.log("Error");
  }

  if (isLoading) {
    console.log("Loading");
  }

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
      <div className="action-container flex flex-row justify-end mt-5">
        <button className="btn-primary" type="submit">
          Create Template
        </button>
      </div>
    </form>
  );
}

export default SMSTemplateForm;