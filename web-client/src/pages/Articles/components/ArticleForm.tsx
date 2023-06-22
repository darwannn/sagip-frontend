import { useMemo } from "react";
import {
  Controller,
  FieldValues,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import moment from "moment";
// Services
import { useGetUserByIdQuery } from "../../../services/usersApi";
import { API_BASE_URL } from "../../../api.config";
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

  const { register, control, handleSubmit } = useForm();
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("content", data.content);
    formData.append("category", data.category);
    formData.append("hasChanged", "false");
    formData.append("image", data.coverImage[0]);

    const userToken = localStorage.getItem("token");

    try {
      const response = await fetch(`${API_BASE_URL}/safety-tips/add`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
        body: formData,
      });
      if (!response.ok) {
        console.log(await response.json());
        throw new Error();
      }
      // const data = await response.json();
      /**
       * Perform action with response data here.
       * - Display the message
       * - Redirect to preview page
       */
    } catch (error) {
      console.log(error);
    }
  };

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
