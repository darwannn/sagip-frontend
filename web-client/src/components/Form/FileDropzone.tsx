import { useDropzone } from "react-dropzone";

type TProps = {
  onChange: (files: File[]) => void;
};

export const FileDropzone = ({ onChange }: TProps) => {
  const onDrop = (acceptedFiles: File[]) => {
    onChange(acceptedFiles);
  };

  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    onDrop,
  });

  return (
    <div
      {...getRootProps({
        className:
          "dropzone flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-slate-50 hover:bg-slate-100",
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
  );
};

export default FileDropzone;
