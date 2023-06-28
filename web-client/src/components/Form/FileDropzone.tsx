import { useState } from "react";
import { useDropzone } from "react-dropzone";

type TProps = {
  onChange: (file: File | undefined) => void;
};

export const FileDropzone = ({ onChange }: TProps) => {
  const [acceptedFile, setAcceptedFile] = useState<File | undefined>(undefined);

  const onDrop = (acceptedFiles: File[]) => {
    setAcceptedFile(acceptedFiles[0]);
    onChange(acceptedFiles[0]);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    multiple: false,
  });

  const file = (
    <div className="flex flex-row space-between">
      <span>{acceptedFile?.name}</span>
      <button
        type="button"
        onClick={() => {
          setAcceptedFile(undefined);
          onChange(undefined);
        }}
      >
        Remove
      </button>
    </div>
  );

  return (
    <div>
      {acceptedFile && file}
      <div
        {...getRootProps({
          className: `dropzone flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-slate-50 hover:bg-slate-100 ${
            acceptedFile ? "hidden" : ""
          }`,
        })}
      >
        <svg
          className="w-10 h-10 mb-3 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
          ></path>
        </svg>
        <input {...getInputProps()} />
        <p>Drag and drop your image here.</p>
      </div>
    </div>
  );
};

export default FileDropzone;
