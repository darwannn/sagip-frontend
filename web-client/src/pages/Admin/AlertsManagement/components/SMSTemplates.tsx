import SMSTemplateItem from "./SMSTemplateItem";

const SMSTemplates = () => {
  return (
    <div className="flex-1 p-5">
      <div className="flex flex-row justify-between items-center">
        <h2 className="text-lg font-bold text-gray-800">Message Templates</h2>
        <button className="btn-primary">
          Create New
        </button>
      </div>
      <div className="templates-container mt-5 h-full">
        <SMSTemplateItem />
      </div>
    </div>
  );
}

export default SMSTemplates;