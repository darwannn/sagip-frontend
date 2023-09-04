import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem } from "../../../../components/ui/DropdownMenu";
import { SMSAlertTemplate, } from "../../../../types/alert";

import { useDeleteAlertTemplateMutation } from "../../../../services/alertQuery";
import { useNavigate, useSearchParams } from "react-router-dom";
import Modal from "../../../../components/Modal/Modal";
import SMSTemplateForm from "./SMSTemplateForm";
import { useState } from "react";
import { useAppDispatch } from "../../../../store/hooks";
import { setSelectedTemplate } from "../../../../store/slices/alertSlice";

// ICONS
import { TbPencil } from "react-icons/tb";
import { LuTrash2 } from "react-icons/lu"
import { toast } from "react-toastify";


type SMSTemplateItemProps = {
  templateData: SMSAlertTemplate;
}
const SMSTemplateItem: React.FC<SMSTemplateItemProps> = ({ templateData }) => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [isEditMode, setIsEditMode] = useState(false);

  const dispatch = useAppDispatch();

  const [
    deleteTemplate,
    {
      isError: isDeleteError,
      error,
    }
  ] = useDeleteAlertTemplateMutation();

  const onEditItemHandler = (id: string) => {
    navigate(`?mode=edit&id=${id}`)
    setIsEditMode(true);
  }

  const onDeleteItemHandler = (id: string) => {
    toast.promise(
      deleteTemplate({ id }).unwrap,
      {
        pending: 'Deleting Template...',
        success: 'Template Deleted.',
        error: 'Delete Failed.'
      }
    )
  }

  const onSelectItemHandler = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    dispatch(setSelectedTemplate(templateData))
  };

  if (isDeleteError) {
    console.log("Delete error", error);
  }

  return (
    <>
      <div className="template-item p-5 h-[150px] bg-gray-100 shadow-sm rounded-md cursor-pointer relative group hover:shadow-md hover:-translate-y-1 transition-all duration-100"
        onClick={onSelectItemHandler}
      >
        <div className="template-title mb-2">
          <h5 className="font-semibold text-gray-700 truncate">{templateData.alertTitle}</h5>
        </div>
        <div className="template-message">
          <span className=" text-sm line-clamp-3 text-gray-500">{templateData.alertMessage}</span>
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
              <span className="mr-2 h-4 w-4"><TbPencil /></span> <span>Edit</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              className="hover:bg-gray-100 text-base"
              onClick={() => onDeleteItemHandler(templateData._id)}
            >
              <span className="mr-2 h-4 w-4"><LuTrash2 /></span> <span>Delete</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <Modal
        modalTitle="Edit Template"
        modalShow={isEditMode}
        modalClose={() => {
          // CLEAR URL PARAMS
          searchParams.delete("mode");
          searchParams.delete("id");
          navigate(`?${searchParams.toString()}`);
          setIsEditMode(false);
        }}
      >
        <SMSTemplateForm templateData={templateData} />
      </Modal>
    </>
  );
}

export default SMSTemplateItem;