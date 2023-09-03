import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem } from "../../../../components/ui/DropdownMenu";
import { SMSAlertTemplate, } from "../../../../types/alert";

// ICONS
import { TbPencil } from "react-icons/tb"
import { useDeleteAlertTemplateMutation } from "../../../../services/alertQuery";


type SMSTemplateItemProps = {
  templateData: SMSAlertTemplate;
}
const SMSTemplateItem: React.FC<SMSTemplateItemProps> = ({ templateData }) => {

  const [
    deleteTemplate,
    { isLoading: isDeleteLoading,
      isError: isDeleteError,
      isSuccess: isDeleteSuccess,
    }
  ] = useDeleteAlertTemplateMutation();

  const onEditItemHandler = (id: string) => {
    console.log("edit");
  }

  const onDeleteItemHandler = (id: string) => {
    deleteTemplate({ id });
  }

  if (isDeleteLoading) {
    console.log("delete loading");
  }
  if (isDeleteSuccess) {
    console.log("delete success");
  }
  if (isDeleteError) {
    console.log("delete error");
  }

  return (
    <div className="template-item p-5 h-[150px] bg-gray-100 shadow-sm rounded-md cursor-pointer relative group">
      <div className="template-title mb-2">
        <h5 className="text-lg font-semibold text-gray-700 truncate">{templateData.alertTitle}</h5>
      </div>
      <div className="template-message">
        <span className="line-clamp-3 text-gray-500">{templateData.alertMessage}</span>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="btn-icon absolute top-3 right-3 text-lg p-2 rounded transition-all duration-200 text-gray-700 hover:bg-gray-300 focus:bg-gray-300 visiblity-">
            <TbPencil />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-48 bg-white absolute right-0">
          <DropdownMenuItem
            className="hover:bg-gray-100 text-base"
            onClick={() => onEditItemHandler(templateData._id)}
          >
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem
            className="hover:bg-gray-100 text-base"
            onClick={() => onDeleteItemHandler(templateData._id)}
          >
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export default SMSTemplateItem;