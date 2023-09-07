import React, { useEffect, useState } from "react";

import { User } from "../../../../types/user";
import { useUpdateProfilePictureMutation } from "../../../../services/accountQuery";

import { BASE_IMAGE_URL } from "../../../../api.config";

import ImageCropper from "../../../../components/ImageCropper/ImageCropper";

type TProps = {
  userData?: User;
};

const AccountProfilePicture = ({ userData }: TProps) => {
  const [showModal, setShowModal] = useState(false);

  const [image, setImage] = useState<string | null | ArrayBuffer>("");
  const [hasBeenCropped, setHasBeenCropped] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<string | undefined>(`
  ${BASE_IMAGE_URL}/user/${userData?.profilePicture}
  `);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setShowModal(true);
      e.preventDefault();
      const files = e.target.files;
      if (files) {
        const reader = new FileReader();
        reader.onload = () => {
          setImage(reader.result);
          console.log(reader.result);
        };
        reader.readAsDataURL(files[0]);
      }
    }
  };
  const [
    updateProfilePicture,
    {
      isError: updateIsError,
      isLoading: updateIsLoading,
      isSuccess: updateIsSuccess,
    },
  ] = useUpdateProfilePictureMutation();

  /* trigger the query when the image has been cropped */
  useEffect(() => {
    if (hasBeenCropped) {
      const uploadProfilePicture = async () => {
        const body = new FormData();
        if (selectedImage) {
          const imageBlob = await fetch(selectedImage).then((res) =>
            res.blob()
          );
          body.append("image", imageBlob, "profilePicture.png");
        }

        const res = await updateProfilePicture({
          body,
        });
        console.log(res);
      };
      uploadProfilePicture();
    }
  }, [hasBeenCropped, selectedImage, updateProfilePicture]);

  if (updateIsLoading) console.log("Updating...");
  if (updateIsError) console.log("Error updating");
  if (updateIsSuccess) console.log("Updated successfully");
  return (
    <>
      <div className="">
        <div className="relative w-40 h-40 rounded-full overflow-hidden border">
          {!image && (
            <>
              <div className="w-full px-6 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-sm text-white text-center leading-4 z-20">
                Tap to update profile picture
              </div>
              <div className="w-full h-full absolute bg-black opacity-50 z-10"></div>
            </>
          )}

          <input
            type="file"
            id="profilePicture"
            accept="image/*"
            title=" "
            className="opacity-0 absolute w-full h-full top-0 left-0 cursor-pointer z-30"
            onChange={(e) => handleImageChange(e)}
          />
          <img className="" id="profilePictureImg" src={selectedImage} />
        </div>
      </div>
      <ImageCropper
        image={image as string}
        setCroppedImage={setSelectedImage}
        showModal={showModal}
        setShowModal={setShowModal}
        setHasBeenCropped={setHasBeenCropped}
      />
    </>
  );
};

export default AccountProfilePicture;
