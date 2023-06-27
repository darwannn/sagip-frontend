import {
  Controller,
  FieldValues,
  SubmitHandler,
  useForm,
} from "react-hook-form";
//Types
import { Article } from "../types/article";
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
  const [addArticle, addResult] = useAddArticleMutation();
  const [updateArticle] = useUpdateArticleMutation();

  const navigate = useNavigate();

  const {
    register,
    control,
    handleSubmit,
    formState: { isDirty },
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
      addArticle({ body, token });
      navigate("/articles");
    }
  };

  const onPublish: SubmitHandler<FieldValues> = async (data) => {
    SubmitArticleData(data, "published");
  };
  const onSaveDraft: SubmitHandler<FieldValues> = async (data) => {
    SubmitArticleData(data, "draft");
  };

  if (addResult.isLoading) console.log("Loading...");
  if (addResult.isError) console.log(addResult.error);
  if (addResult.isSuccess) console.log(addResult.data);

  return (
    <form>
      <ArticleDetailsForm
        control={control}
        register={register}
        imageFromDb={articleData?.image}
      />
      <Controller
        name="content"
        control={control}
        rules={{ required: true }}
        render={({ field }) => (
          <ArticleContentEditor
            content={field.value}
            onChange={field.onChange}
          />
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
