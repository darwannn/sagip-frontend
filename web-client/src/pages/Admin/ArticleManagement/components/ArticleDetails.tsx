import { useState } from "react";
import {
  Control,
  FieldErrors,
  FieldValues,
  UseFormRegister,
  useWatch,
} from "react-hook-form";
import { Controller } from "react-hook-form";
// Types
import FileDropzone from "../../../../components/Form/FileDropzone";

import { BASE_IMAGE_URL } from "../../../../api.config";

type TProps = {
  register: UseFormRegister<FieldValues>;
  control: Control<FieldValues>;
  imageFromDb?: string;
  errors: FieldErrors<FieldValues>;
};

const ArticleDetailsForm = ({
  register,
  control,
  imageFromDb,
  errors,
}: TProps) => {
  const [editImage, setEditImage] = useState(false);
  const imageState = useWatch({ control, name: "coverImage" });
  return (
    <>
      <div className="articleDetails w-full flex flex-col">
        {errors.title && (
          <span className="text-red-500">Title is required</span>
        )}
        <input
          type="text-area"
          id="articleTitle"
          className="p-2 my-1"
          style={{ fontSize: "2.2rem", fontWeight: "bold" }}
          placeholder="Title of article"
          {...register("title", { required: true })}
        />
      </div>
      {imageFromDb && !editImage ? (
        <div>
          <img
            src={`${BASE_IMAGE_URL}/safety-tips/${imageFromDb}`}
            alt="cover"
          />
          <button type="button" onClick={() => setEditImage(true)}>
            Replace
          </button>
        </div>
      ) : (
        <Controller
          name="coverImage"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <>
              {errors.coverImage && (
                <span className="text-red-500">Cover Image is required</span>
              )}
              {imageState && (
                <div>
                  <img src={URL.createObjectURL(imageState)} alt="cover" />
                </div>
              )}
              <FileDropzone onChange={field.onChange} />
            </>
          )}
        />
      )}
      <div className="flex flex-col">
        <label htmlFor="category">Category</label>
        <select id="category" {...register("category")}>
          <option value="General Tips">General Tips</option>
          <option value="Preparedness">Preparedness</option>
          <option value="Flood Safety">Flood Safety</option>
          <option value="Heat Safety">Heat Safety</option>
        </select>
      </div>
    </>
  );
};

export default ArticleDetailsForm;
