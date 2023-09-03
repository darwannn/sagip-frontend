import { useAnswerSurveyMutation } from "../../../../services/alertQuery";

import { TActiveSurvey } from "../../../../types/alert";

type TProps = {
  wellnessSurveyData: TActiveSurvey;
};

const WellnessSurvey = ({ wellnessSurveyData }: TProps) => {
  const [
    answerSurvey,
    {
      isError: answerIsError,
      isLoading: answerIsLoading,
      isSuccess: answerIsSuccess,
    },
  ] = useAnswerSurveyMutation();

  const onAnswerSurvey = async (answer: string) => {
    /* const res = */ await answerSurvey(answer);
    /* if ("data" in res) {
      setServerRes(res.data);
      if (res.data.success) {
        navigate(`/users`);
      }
    } else {
      if ("error" in res && "data" in res.error) {
        const errData = res.error.data as TUserResData;
        setServerRes(errData);
      }
    } */
  };

  if (answerIsLoading) console.log("Updating...");
  if (answerIsError) console.log("Error updating");
  if (answerIsSuccess) console.log("Updated successfully");

  return (
    <>
      {wellnessSurveyData?.success && (
        <div className="bg-[#FFF0A5] p-5 rounded-2xl my-2">
          <div className="flex flex-col gap-2">
            <div>
              We care for your safety and wellness. Please tell us how you are
              doing after the{" "}
              <span className="font-bold">{wellnessSurveyData?.title}</span>.
            </div>
            <button
              className="bg-[#A6FF86] p-3 rounded-lg"
              onClick={() => {
                onAnswerSurvey("unaffected");
              }}
            >
              I am safe and unharmed
            </button>
            <button
              className="bg-[#FF7A7A] p-3 rounded-lg"
              onClick={() => {
                onAnswerSurvey("affected");
              }}
            >
              I have been impacted in some way
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default WellnessSurvey;
