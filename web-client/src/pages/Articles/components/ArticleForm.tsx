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
import ArticleContentEditor from "./ArticleContentEditor";
import ArticleDetailsForm from "./ArticleDetails";

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
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log(data);
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
