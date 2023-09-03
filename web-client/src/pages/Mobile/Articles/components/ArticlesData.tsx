import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

import type { Token } from "../../../../types/auth";

import { useGetArticleByIdQuery } from "../../../../services/articleQuery";
import { useSaveArticleMutation } from "../../../../services/articleQuery";

import { BASE_IMAGE_URL } from "../../../../api.config";

import { BsArrowLeft } from "react-icons/bs";
import { BiBookmarks } from "react-icons/bi";

import moment from "moment";
import jwtDecode from "jwt-decode";

import "../styles/article.css";

const ArticlesData = () => {
  const { articleId } = useParams();

  const {
    data: articleData,
    isLoading,
    error,
  } = useGetArticleByIdQuery(articleId);

  const [
    save,
    {
      isError: verifyIsError,
      isLoading: verifyIsLoading,
      isSuccess: verifyIsSuccess,
    },
  ] = useSaveArticleMutation();

  const [isArticleSaved, setIsArticleSaved] = useState<boolean>(false);
  const userToken = localStorage.getItem("token");
  useEffect(() => {
    if (userToken) {
      const decodedToken = jwtDecode<Token>(userToken);

      if (articleData?.saves.includes(decodedToken.id)) {
        setIsArticleSaved(true);
      }
    }
  }, [userToken, articleData?.saves]);

  const onSave = async () => {
    if (articleData) {
      const res = await save(articleData._id);
      console.log("Save API response:", res);

      if ("data" in res) {
        if (isArticleSaved) {
          console.log("Toggling isArticleSaved to false");
          setIsArticleSaved(false);
        } else {
          console.log("Toggling isArticleSaved to true");
          setIsArticleSaved(true);
        }
      } else {
        if ("error" in res && "data" in res.error) {
          console.log("Error response:", res.error.data);
        }
      }
    }
  };

  const createMarkup = (htmlString: string) => {
    return { __html: htmlString };
  };
  if (isLoading) {
    /* return <p>Loading...</p>; */
  }
  if (error) {
    return <p>Something went wrong</p>;
  }

  if (verifyIsLoading) console.log("Verifying...");
  if (verifyIsError) console.log("Error verifying" + verifyIsError);
  if (verifyIsSuccess) console.log("Verified successfully");
  return (
    <>
      {articleData && (
        <>
          <div className="relative">
            <Link to="/articles">
              <div className=" p-3 absolute top-10 left-10 rounded-full bg-white text-gray-500 cursor-pointer hover:bg-gray-100">
                <BsArrowLeft />
              </div>
            </Link>

            {userToken && (
              <div
                className={`flex items-center  absolute top-10 right-10 rounded-3xl py-3 px-6   cursor-pointer ${
                  isArticleSaved
                    ? "bg-[#364FC7] text-white"
                    : "bg-white text-gray-500"
                }`}
                onClick={onSave}
              >
                <BiBookmarks className="text-xl mr-1" />
                {isArticleSaved ? "Saved" : "Save"}
              </div>
            )}
            <div
              className="h-[300px]"
              style={{
                background: `linear-gradient(180deg, rgba(89, 89, 89, 0.00) 0%, #000 150%), url(${BASE_IMAGE_URL}/safety-tips/${articleData.image})`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "50% 50%",
              }}
            ></div>
          </div>
          <div className=" relative rounded-t-[50px] bg-white z-90 -my-12">
            <div className="p-5">
              <div className="text-gray-600 text-center">
                {articleData.category}
              </div>
              <div className=" text-2xl font-bold text-center">
                {articleData.title}
              </div>
              <div className="text-sm  text-center">
                {moment(articleData?.createdAt).format("MMMM DD, YYYY")}
              </div>

              <div
                className="content mt-10 text-gray-600"
                dangerouslySetInnerHTML={createMarkup(articleData.content)}
              />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ArticlesData;
