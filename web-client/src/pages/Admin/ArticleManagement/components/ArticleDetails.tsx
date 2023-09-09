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
      <div className="articleDetails form-group mb-5">
        <label htmlFor="articleTitle" className="form-label text-sm">
          Article Title
        </label>
        <input
          type="text"
          id="articleTitle"
          className="p-2 my-1 border rounded bg-slate-100 text-sm"
          placeholder="Title of article"
          {...register("title", { required: true })}
        />
        {errors.title && (
          <span className="text-red-500">Title is required</span>
        )}
      </div>
      <div className="form-group mb-5">
        <label htmlFor="category" className="form-label text-sm">
          Category
        </label>
        <select
          id="category"
          {...register("category")}
          className="p-2 text-sm border rounded bg-slate-100"
        >
          <option value="General Tips" className="">
            General Tips
          </option>
          <option value="Preparedness">Preparedness</option>
          <option value="Flood Safety">Flood Safety</option>
          <option value="Heat Safety">Heat Safety</option>
        </select>
      </div>
      <div className="">
        <label htmlFor="coverImage" className="form-label text-sm">
          Cover Image
        </label>
        {imageFromDb && !editImage ? (
          <div className="">
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
              <div className="bg-slate-100 rounded p-5">
                {errors.coverImage && (
                  <span className="text-red-500">Cover Image is required</span>
                )}
                {imageState && (
                  <div className="h-64 rounded">
                    <img
                      src={URL.createObjectURL(imageState)}
                      alt="cover"
                      className="w-full h-full object-cover rounded"
                    />
                  </div>
                )}
                <div className="form-group">
                  <FileDropzone onChange={field.onChange} />
                </div>
              </div>
            )}
          />
        )}
      </div>
    </>
  );
};

export default ArticleDetailsForm;
