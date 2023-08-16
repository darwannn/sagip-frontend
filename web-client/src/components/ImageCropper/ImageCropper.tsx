import React, { useEffect, useRef, useState } from "react";
import Cropper, { ReactCropperElement } from "react-cropper";
import "cropperjs/dist/cropper.css";
import Modal from "../Modal/Modal";

import { MdOutlineImageNotSupported } from "react-icons/md";

type TProps = {
  /* image is in in base64 image format */
  image: string;
  setCroppedImage: (croppedImage: string) => void;
  showModal: boolean;
  setShowModal: (show: boolean) => void;
  setHasBeenCropped: (show: boolean) => void;
};

const ImageCropper: React.FC<TProps> = ({
  image,
  setCroppedImage,
  showModal,
  setShowModal,
  setHasBeenCropped,
}) => {
  const cropperRef = useRef<ReactCropperElement | null>(null);
  const [imageRequirmentsMet, setImageRequirmentsMet] = useState(true);
  useEffect(() => {
    setHasBeenCropped(false);
    handleImageLoad();
  }, [image]);

  const handleImageLoad = () => {
    console.log(image);

    /* check if uploaded file is image */
    if (
      image.includes("image/png") ||
      image.includes("image/jpg") ||
      image.includes("image/jpeg")
    ) {
      const imageSizeInBytes = (image.length * 3) / 4;
      const imageSizeInMB = imageSizeInBytes / (1024 * 1024);

      // check if image size is less than 10MB
      if (imageSizeInMB <= 10) {
        setImageRequirmentsMet(false);
      } else {
        setImageRequirmentsMet(true);
      }
    } else {
      setImageRequirmentsMet(true);
    }
  };

  const getCroppedImage = () => {
    if (cropperRef.current && cropperRef.current.cropper) {
      const croppedImage = cropperRef.current.cropper
        .getCroppedCanvas()
        .toDataURL();
      setCroppedImage(croppedImage);
      setShowModal(false);
      setHasBeenCropped(true);
    }
  };

  return (
    <Modal
      modalTitle={"Crop Profile Picture"}
      modalShow={showModal}
      modalClose={() => setShowModal(false)}
    >
      <div>
        {/* shows when image does not meet requirments */}
        {imageRequirmentsMet && (
          <div className="bg-red-400 text-white px-5 py-3 my-2  text-center rounded">
            Upload an image file .jpeg, .jpg, or .png that is less than 10MB
          </div>
        )}
        {imageRequirmentsMet ? (
          <div className="w-full h-[300px] bg-gray-200 flex flex-col justify-center items-center">
            <MdOutlineImageNotSupported className="text-8xl text-gray-500" />
          </div>
        ) : (
          <Cropper
            ref={cropperRef}
            style={{ height: 400, width: "100%" }}
            aspectRatio={1}
            src={image}
            viewMode={1}
            minCropBoxHeight={10}
            minCropBoxWidth={10}
            background={false}
            responsive={true}
            autoCropArea={1}
            checkOrientation={false}
            guides={true}
            zoomOnWheel={true}
            onInitialized={handleImageLoad}
          />
        )}
      </div>

      <button
        onClick={getCroppedImage}
        className={`w-full bg-indigo-500 text-white px-5 py-1 my-2 rounded ${
          imageRequirmentsMet && "cursor-not-allowed opacity-50"
        }`}
        disabled={imageRequirmentsMet}
      >
        Crop
      </button>
    </Modal>
  );
};

export default ImageCropper;
