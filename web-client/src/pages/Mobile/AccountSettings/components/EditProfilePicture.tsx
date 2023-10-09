import { createRef, useCallback, useState } from "react";
import Sheet from "react-modal-sheet";
import { useDropzone } from "react-dropzone";
import { BASE_IMAGE_URL } from "../../../../api.config";
import { User } from "../../../../types/user";
import { Cropper, ReactCropperElement } from "react-cropper";
import { useUpdateProfilePictureMutation } from "../../../../services/accountQuery";
import { toast } from "react-toastify";
import { MdOutlineClose } from "react-icons/md";

type EditProfilePictureProps = {
  userData: User | undefined;
};

const EditProfilePicture: React.FC<EditProfilePictureProps> = ({
  userData,
}) => {
  const [isCropMode, setCropMode] = useState<boolean>(false);
  const cropperRef = createRef<ReactCropperElement>();
  const [selectedImage, setSelectedImage] = useState<string | undefined>();

  const [uploadProfilePicture, uploadState] = useUpdateProfilePictureMutation();

  /**
   * Get and process the image from the dropzone / file input
   * to be used in the cropper
   * @param acceptedFiles
   */
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length <= 0) return;

    const file = acceptedFiles[0];

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setSelectedImage(reader.result as string);
      setCropMode(true);
    };
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    noDrag: true,
    accept: {
      "image/png": [".png"],
      "image/jpeg": [".jpeg"],
      "image/jpg": [".jpg"],
    },
    maxFiles: 1,
  });

  /**
   * Get the cropped image from the cropper
   * and upload it to the server
   */
  const getCroppedImage = async () => {
    if (cropperRef.current && cropperRef.current.cropper) {
      const croppedImage = cropperRef.current.cropper
        .getCroppedCanvas()
        .toDataURL();

      const body = new FormData();

      // Check if there is a cropped image
      if (croppedImage) {
        const imageBlob = await fetch(croppedImage).then((res) => res.blob());
        body.append("image", imageBlob, "profilePicture.png");

        // Upload Cropped
        const res = await toast.promise(uploadProfilePicture({ body }).unwrap, {
          pending: "Uploading profile picture...",
          success: "Profile picture uploaded!",
          error: "Something went wrong",
        });

        if (res.success) {
          setCropMode(false);
        } else if (!res.success) {
          setCropMode(false);
          console.log(uploadState.error);
        }
      }
    }
  };

  return (
    <>
      <div className="p-5 text-sm flex flex-col items-center gap-4">
        <div className="">
          <img
            src={`${BASE_IMAGE_URL}/user/${userData?.profilePicture}`}
            alt="Profile Picture"
            className="w-24 h-24 rounded-full object-cover"
          />
        </div>
        <div
          {...getRootProps({
            className:
              "border rounded-full p-2 text-xs text-blue-400 border-blue-400",
          })}
        >
          <input {...getInputProps()} />
          <p className="">Edit profile picture</p>
        </div>
      </div>
      <Sheet
        isOpen={isCropMode}
        onClose={() => setCropMode(false)}
        disableDrag
        style={{ zIndex: 50 }}
      >
        <Sheet.Backdrop onTap={(e) => e.stopPropagation()}>
          <Sheet.Container>
            <Sheet.Header className="py-3 relative border-b">
              <>
                <button
                  onClick={() => setCropMode(false)}
                  className="absolute left-2 top-[50%] -translate-y-[50%]"
                >
                  <MdOutlineClose />
                </button>
                <p className="text-base text-gray-700 font-semibold">
                  Crop Photo
                </p>
              </>
            </Sheet.Header>
            <Sheet.Content className="p-5">
              <div className="w-full md:max-w-[500px] aspect-square">
                <Cropper
                  ref={cropperRef}
                  src={selectedImage}
                  style={{ height: 400, width: "100%" }}
                  initialAspectRatio={1}
                  aspectRatio={1}
                  zoomTo={0.5}
                  dragMode="move"
                  guides={true}
                  background={false}
                  responsive={true}
                  viewMode={1}
                  minCropBoxHeight={10}
                  minCropBoxWidth={10}
                  autoCropArea={1}
                />
              </div>
              <button className="btn-primary mt-5" onClick={getCroppedImage}>
                Crop
              </button>
            </Sheet.Content>
          </Sheet.Container>
        </Sheet.Backdrop>
      </Sheet>
    </>
  );
};

export default EditProfilePicture;
