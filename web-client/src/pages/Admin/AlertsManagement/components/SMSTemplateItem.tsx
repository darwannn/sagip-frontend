import { SMSAlerTemplate, } from "../../../../types/alert";

type SMSTemplateItemProps = {
  templateData: SMSAlerTemplate;
}
const SMSTemplateItem: React.FC<SMSTemplateItemProps> = ({ templateData }) => {
  return (
    <div className="template-item p-5 h-[150px] bg-gray-100 shadow-sm rounded-md">
      <div className="template-title mb-2">
        <h5 className="text-lg font-semibold text-gray-700">{templateData.alertTitle}</h5>
      </div>
      <div className="template-message">
        <span className="line-clamp-3 text-gray-500">{templateData.alertMessage}</span>
      </div>
    </div>
  );
}

export default SMSTemplateItem;