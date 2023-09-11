import {
  Controller,
  FieldValues,
  SubmitHandler,
  useForm,
} from "react-hook-form";
//Types
import { Article, TArticleResData } from "../../../../types/article";
// Redux
import {
  useAddArticleMutation,
  useUpdateArticleMutation,
} from "../../../../services/articleQuery";
// Components
import ArticleDetailsForm from "./ArticleDetails";
import ArticleContentEditor from "./ArticleContentEditor";
import { useNavigate } from "react-router-dom";
import useUnsaveChangesWarning from "../../../../hooks/useUnsavedChangesWarning";
import { toast } from "react-toastify";
import { Badge } from "../../../../components/ui/Badge";

type TProps = {
  articleData?: Article;
};

const ArticleForm = ({ articleData }: TProps) => {
  // Query
  const [
    addArticle,
    { isError: addIsError, isLoading: addIsLoading, error: addErr },
  ] = useAddArticleMutation();
  const [
    updateArticle,
    {
      isError: updateIsError,
      isLoading: updateIsLoading,
      isSuccess: updateIsSuccess,
    },
  ] = useUpdateArticleMutation();

  const navigate = useNavigate();

  const {
    register,
    control,
    handleSubmit,
    formState: { isDirty, errors },
  } = useForm<FieldValues>({
    /**
     * If articleData is passed in props, set the default values to the article data.
     */
    defaultValues: {
      title: articleData?.title,
      category: articleData?.category,
      content: articleData?.content,
    },
  });

  useUnsaveChangesWarning(isDirty);

  const SubmitArticleData = async (data: FieldValues, status: string) => {
    if (!isDirty) {
      console.log("No changes made");
      return;
    }
    // Prepare the data to be sent to the server
    const body = new FormData();
    body.append("title", data.title);
    body.append("content", data.content);
    body.append("category", data.category);
    /**
     * If the user is in edit mode and the image input is changed,
     * set the hasChanged to true.
     */
    body.append(
      "hasChanged",
      `${articleData && data.coverImage != null ? true : false}`
    );
    if (articleData) {
      body.append(
        "image",
        data.coverImage ? data.coverImage : articleData.image
      );
    } else {
      body.append("image", data.coverImage);
    }
    body.append("status", status);

    const token = localStorage.getItem("token");

    if (articleData) {
      // updateArticle({
      //   body,
      //   token,
      //   id: articleData._id,
      // });

      await toast.promise(
        updateArticle({ body, token, id: articleData._id }).unwrap(),
        {
          pending:
            status === "draft" ? "Saving Draft..." : "Publishing Article...",
          success: status === "draft" ? "Draft Saved" : "Article Published",
          error:
            status === "draft"
              ? "Failed To Save Draft"
              : "Failed To Publish Article",
        }
      );
    } else {
      // const res = await addArticle({ body, token });

      const res = await toast.promise(addArticle({ body, token }).unwrap(), {
        pending:
          status === "draft" ? "Saving Draft..." : "Publishing Article...",
        success: status === "draft" ? "Draft Saved" : "Article Published",
        error:
          status === "draft"
            ? "Failed To Save Draft"
            : "Failed To Publish Article",
      });

      if (res) {
        if (res.success) {
          // console.log(res);
          navigate(`/admin/manage-articles/edit/${res.safetyTip._id}`);
        }
      }
    }
  };

  const onPublish: SubmitHandler<FieldValues> = async (data) => {
    SubmitArticleData(data, "published");
  };
  const onSaveDraft: SubmitHandler<FieldValues> = async (data) => {
    SubmitArticleData(data, "draft");
  };

  // TODO: Add a loading indicator
  if (addIsLoading) console.log("Loading...");
  if (addIsError) {
    if (addErr && "status" in addErr) {
      const data = "data" in addErr ? (addErr.data as TArticleResData) : null;
      console.log(data?.title);
    }
  }

  if (updateIsLoading) console.log("Updating...");
  if (updateIsError) console.log("Error updating");
  if (updateIsSuccess) console.log("Updated successfully");

  return (
    <form className="mt-5">
      {articleData && (
        <Badge
          className={`capitalize mb-5 ${
            articleData.status === "draft"
              ? "bg-yellow-500 hover:bg-yellow-500"
              : "bg-green-500 hover:bg-green-500"
          }`}
        >
          {articleData.status}
        </Badge>
      )}
      <ArticleDetailsForm
        control={control}
        register={register}
        imageFromDb={articleData?.image}
        errors={errors}
      />
      <Controller
        name="content"
        control={control}
        rules={{ required: true }}
        render={({ field }) => (
          <>
            {errors.content && (
              <span className="text-red-500">Content is required</span>
            )}
            <ArticleContentEditor
              content={field.value}
              onChange={field.onChange}
            />
          </>
        )}
      />
      {/* FORM ACTIONS */}
      <div className="flex flex-row items-end justify-end gap-5 mt-10">
        <button
          className="py-2 px-5 border border-green-500 rounded text-green-500 font-semibold text-sm hover:bg-green-500 hover:text-white disabled:border-gray-500 disabled:text-gray-500 disabled:hover:bg-transparent disabled:hover:text-gray-500"
          onClick={handleSubmit(onPublish)}
          disabled={addIsLoading || updateIsLoading || !isDirty}
        >
          Publish Article
        </button>
        <button
          className="btn-primary"
          onClick={handleSubmit(onSaveDraft)}
          disabled={addIsLoading || updateIsLoading || !isDirty}
        >
          Save as Draft
        </button>
      </div>
    </form>
  );
};

export default ArticleForm;
