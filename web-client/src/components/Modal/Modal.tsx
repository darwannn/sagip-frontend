import React from "react";
import { ReactNode } from "react";
import { createPortal } from "react-dom";
import { IoMdClose } from "react-icons/io";

interface ModalProps {
  children: ReactNode;
  modalTitle?: string;
  modalShow: boolean;
  modalClose: () => void;
  isMobile?: boolean;
}

const Modal: React.FC<ModalProps> = ({
  children,
  modalTitle,
  modalShow,
  modalClose,
  isMobile,
}) => {
  if (!modalShow) return null;
  return createPortal(
    <>
      {/* Modal Overlay */}
      <div
        className="fixed inset-0 bg-gray-500 bg-opacity-50 z-50"
        onClick={() => !isMobile && modalClose()}
      ></div>
      <div className="fixed w-[90%] sm:w-[500px] max-h-[80vh] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white z-50 p-[20px] flex flex-col rounded shadow-md">
        {/* Title Bar */}
        <div
          className={`${
            isMobile ? "hidden" : "flex flex-row justify-between items-center"
          }`}
        >
          <h1 className="text-gray-500">{modalTitle}</h1>
          <button className="text-gray-500" onClick={modalClose}>
            <IoMdClose />
          </button>
        </div>
        <div className="flex-grow my-2 overflow-y-auto">
          {/* Modal Content */}
          {children}
        </div>
      </div>
    </>,
    document.getElementById("modal") as HTMLElement
  );
};

export default Modal;
