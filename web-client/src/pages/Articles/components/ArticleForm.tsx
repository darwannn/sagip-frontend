import { useMemo } from "react";
import {
  Controller,
  FieldValues,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import moment from "moment";

// Redux
import { useAddArticleMutation } from "../../../services/articleQuery";
// Services
import { useGetUserByIdQuery } from "../../../services/usersApi";
// Components
import ArticleDetailsForm from "./ArticleDetails";
import ArticleContentEditor from "./ArticleContentEditor";

const ArticleForm = () => {
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

  const [addArticle, result] = useAddArticleMutation();

  const { register, control, handleSubmit } = useForm();
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    console.log(data);
    const body = new FormData();
    body.append("title", data.title);
    body.append("content", data.content);
    body.append("category", data.category);
    body.append("hasChanged", "false");
    body.append("image", data.coverImage[0]);

    const token = localStorage.getItem("token");

    addArticle({ body, token });
  };

  if (result.isLoading) console.log("Loading...");
  if (result.isError) console.log(result.error);
  if (result.isSuccess) console.log(result.data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <ArticleDetailsForm
        user={user}
        currentDate={currentDate}
        register={register}
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
