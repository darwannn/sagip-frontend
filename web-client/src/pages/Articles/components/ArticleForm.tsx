import {
  Controller,
  FieldValues,
  SubmitHandler,
  useForm,
} from "react-hook-form";
//Types
import { Article, TArticleResData } from "../types/article";
// Redux
import {
  useAddArticleMutation,
  useUpdateArticleMutation,
} from "../../../services/articleQuery";
// Components
import ArticleDetailsForm from "./ArticleDetails";
import ArticleContentEditor from "./ArticleContentEditor";
import { useNavigate } from "react-router-dom";

type TProps = {
  articleData?: Article;
};

const ArticleForm = ({ articleData }: TProps) => {
  // Query
  const [
    addArticle,
    {
      isSuccess: addIsSuccess,
      isError: addIsError,
      isLoading: addIsLoading,
      error: addErr,
      data: addData,
    },
  ] = useAddArticleMutation();
  const [updateArticle] = useUpdateArticleMutation();

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
      const updateData = await updateArticle({
        body,
        token,
        id: articleData._id,
      });
      console.log(updateData);
    } else {
      const res = await addArticle({ body, token });
      if (res && addIsSuccess) {
        navigate("/articles");
      }
    }
  };

  const onPublish: SubmitHandler<FieldValues> = async (data) => {
    SubmitArticleData(data, "published");
  };
  const onSaveDraft: SubmitHandler<FieldValues> = async (data) => {
    SubmitArticleData(data, "draft");
  };

  if (addIsLoading) console.log("Loading...");
  if (addIsError) {
    if (addErr && "status" in addErr) {
      const data = "data" in addErr ? (addErr.data as TArticleResData) : null;
      console.log(data?.title);
    }
  }
  if (addIsSuccess) console.log(addData);

  return (
    <form>
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
      <button
        className="bg-indigo-500 text-white px-5 py-1 my-2 rounded"
        onClick={handleSubmit(onSaveDraft)}
      >
        Save as Draft
      </button>
      <button
        className="bg-green-500 text-white px-5 py-1 my-2 rounded"
        onClick={handleSubmit(onPublish)}
      >
        Publish
      </button>
    </form>
  );
};

export default ArticleForm;
