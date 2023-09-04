import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useAddAlertTemplateMutation, useEditAlertTemplateMutation, } from "../../../../services/alertQuery";
import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import { SMSAlertTemplate } from "../../../../types/alert";
import { toast } from "react-toastify";

type SMSTemplateFormProps = {
  templateData?: SMSAlertTemplate;
}

const SMSTemplateForm: React.FC<SMSTemplateFormProps> = ({ templateData }) => {
  const [searchParams] = useSearchParams();
  const isEditMode = searchParams.get("mode") === "edit";
  const templateId = searchParams.get("id");

  const [addTemplate, { isLoading, isError }] = useAddAlertTemplateMutation();
  const [editTemplate, { isLoading: isEditLoading, isError: isEditError, error }] = useEditAlertTemplateMutation();
  const { register, handleSubmit, setValue, reset, formState: { errors } } = useForm();

  useEffect(() => {
    if (isEditMode && templateId && templateData) {
      setValue("alertTitle", templateData.alertTitle);
      setValue("alertMessage", templateData.alertMessage);
    }

    // Cleanup
    return () => {
      setValue("alertTitle", "");
      setValue("alertMessage", "");
    }
  }, [isEditMode, templateId, templateData, setValue])


  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    console.log(data);

    const body = {
      alertTitle: data.alertTitle,
      alertMessage: data.alertMessage,
    }

    if (isEditMode && templateId) {
      // Update
      toast.promise(
        editTemplate({ id: templateId, body }).unwrap,
        {
          pending: 'Editing Template.',
          success: 'Edited Successfully',
          error: 'Edit Failed.'
        }
      )

    } else {
      // Add
      // const res = await addTemplate(body);
      const res = await toast.promise(
        addTemplate(body).unwrap(),
        {
          pending: 'Adding New Template.',
          success: 'Template Added.',
          error: 'Add Failed.'
        }
      )

      if (res) {
        if (res.success) {
          reset();
        }
      }
    }
  };

  let buttonTxt;

  if (isError || isEditError) {
    console.log("Error", error);
  }

  if (isLoading || isEditLoading) {
    buttonTxt = "Loading...";
  } else if (isEditMode) {
    buttonTxt = "Update";
  } else {
    buttonTxt = "Add";
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
        <button className="btn-primary" type="submit" disabled={isLoading || isEditLoading}>
          {buttonTxt}
        </button>
      </div>
    </form>
  );
}

export default SMSTemplateForm;