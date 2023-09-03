import { useState } from "react";
import Modal from "../../../../components/Modal/Modal";
import { useGetAlertTemplatesQuery } from "../../../../services/alertQuery";
import SMSTemplateItem from "./SMSTemplateItem";
import SMSTemplateForm from "./SMSTemplateForm";

const SMSTemplates = () => {

  const [isAddMode, setIsAddMode] = useState(false);
  const { data, isSuccess, isLoading, isError, error } = useGetAlertTemplatesQuery();

  let templates;

  if (isLoading) {
    templates = <p className="text-center">Templates Loading...</p>
  }

  if (isSuccess) {
    templates = data?.map((template) => (
      <SMSTemplateItem key={template._id} templateData={template} />
    ))
  }

  if (isError) {
    console.log(error);
    templates = <p className="text-center">Error Loading Templates</p>
  }

  return (
    <>
      <div className="flex-1 p-5">
        <div className="flex flex-row justify-between items-center">
          <h2 className="text-lg font-bold text-gray-800">Message Templates</h2>
          <button type="button" className="btn-primary" onClick={() => setIsAddMode(true)}>
            Create New
          </button>
        </div>
        <div className="templates-container mt-5 h-full flex flex-col gap-3">
          {templates}
        </div>
      </div>
      <Modal
        modalTitle="Create New Template"
        modalShow={isAddMode}
        modalClose={() => setIsAddMode(false)}
      >
        <SMSTemplateForm />
      </Modal>
    </>
  );
}

export default SMSTemplates;