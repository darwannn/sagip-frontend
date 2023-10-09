import { useEffect, useState } from "react";

import { Link } from "react-router-dom";

import type { Article } from "../../../../types/article";
import type { Token } from "../../../../types/auth";

import { BASE_IMAGE_URL } from "../../../../api.config";
import { useSaveArticleMutation } from "../../../../services/articleQuery";

import { BiBookmarks } from "react-icons/bi";

import jwtDecode from "jwt-decode";

type TProps = {
  articleData: Article;
};

const ArticleItem = ({ articleData }: TProps) => {
  const [isArticleSaved, setIsArticleSaved] = useState<boolean>(false);

  const userToken = localStorage.getItem("token");
  useEffect(() => {
    if (userToken && articleData) {
      const decodedToken = jwtDecode<Token>(userToken);

      if (articleData.saves.includes(decodedToken.id)) {
        setIsArticleSaved(true);
      } else {
        setIsArticleSaved(false);
      }
    }
  }, [userToken, articleData]);

  const [
    save,
    {
      isError: verifyIsError,
      isLoading: verifyIsLoading,
      isSuccess: verifyIsSuccess,
    },
  ] = useSaveArticleMutation();

  const onSave = async (id: string) => {
    console.log("onSave called with ID:", id);

    const res = await save(id);
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
  };

  if (verifyIsLoading) console.log("Verifying...");
  if (verifyIsError) console.log("Error verifying" + verifyIsError);
  if (verifyIsSuccess) console.log("Verified successfully");

  return (
    <>
      <div className="flex bg-white  rounded-2xl shadow-md relative">
        <div className="max-w-[130px] min-w-[130px] min-h-[130px] ">
          <img
            src={`${BASE_IMAGE_URL}/safety-tips/${articleData.image}`}
            className="w-full h-full object-cover  rounded-2xl"
          />
        </div>
        <div className="m-3">
          <div className="text-xs text-gray-500">{articleData.category}</div>
          <Link to={`/articles/${articleData._id}`}>
            <div className="font-bold hover:text-[#364FC7] pb-7 hover:cursor-pointer">
              {articleData.title}
            </div>
          </Link>
        </div>

        {/* bookmark */}
        {userToken && (
          <div
            className={`absolute bottom-3 right-3 border-2 border-[#364FC7]  rounded-full p-1 cursor-pointer ${
              isArticleSaved
                ? "bg-[#364FC7] text-white"
                : "bg-white text-[#364FC7] opacity-50"
            }`}
            onClick={() => onSave(articleData._id)}
          >
            <BiBookmarks />
          </div>
        )}
      </div>
    </>
  );
};

export default ArticleItem;
