import { useMemo } from "react";
import {
  Controller,
  FieldValues,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import moment from "moment";
//Types
import { Article } from "../../../types/article";
// Redux
import {
  useAddArticleMutation,
  useUpdateArticleMutation,
} from "../../../services/articleQuery";
// Services
import { useGetUserByIdQuery } from "../../../services/usersApi";
// Components
import ArticleDetailsForm from "./ArticleDetails";
import ArticleContentEditor from "./ArticleContentEditor";

type TProps = {
  articleData?: Article;
};

const ArticleForm = ({ articleData }: TProps) => {
  /**
   * This way of getting user info might not be the best way.
   * This should be changed in the future.
   * Maybe use redux to store user info?
   */
  const userId = useMemo(() => {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user).id : "";
  }, []);
  const { data: user } = useGetUserByIdQuery(userId);
  const currentDate = useMemo(() => moment().format("YYYY-MM-DD"), []);
  // Query
  const [addArticle, addResult] = useAddArticleMutation();
  const [updateArticle, updateResult] = useUpdateArticleMutation();

  const { register, control, handleSubmit } = useForm<FieldValues>({
    /**
     * If articleData is passed in props, set the default values to the article data.
     */
    defaultValues: {
      title: articleData?.title,
      category: articleData?.category,
      content: articleData?.content,
    },
  });
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
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

    const token = localStorage.getItem("token");

    if (articleData) {
      updateArticle({ body, token, id: articleData._id });
      if (updateResult.isError) {
        console.log("shet may error");
        console.log(updateResult.data);
      }
    } else {
      addArticle({ body, token });
      if (addResult.isError) console.log(addResult.error);
    }
  };

  if (addResult.isLoading) console.log("Loading...");
  if (addResult.isError) console.log(addResult.error);
  if (addResult.isSuccess) console.log(addResult.data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <ArticleDetailsForm
        user={user}
        currentDate={currentDate}
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
      <button className="bg-indigo-500 text-white px-5 py-1 my-2 rounded">
        Submit
      </button>
    </form>
  );
};

export default ArticleForm;
