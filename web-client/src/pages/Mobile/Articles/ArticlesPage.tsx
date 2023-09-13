import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  useGetPublishedArticlesQuery,
  useGetSavedArticlesQuery,
} from "../../../services/articleQuery";

import { BiSearch, BiBookmarks } from "react-icons/bi";
import { BsArrowLeft } from "react-icons/bs";

import ArticleList from "./components/ArticleList";
import CarouselArticleList from "./components/CarouselArticleList";

const ArticlesPage = () => {
  const isInSavedPage = location.pathname.includes("saved");
  const [search, setSearch] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const {
    data: articleData,
    isLoading: articleIsLoading,
    error: articleIsError,
  } = useGetPublishedArticlesQuery();
  const { data: savedArticleData, isLoading: savedIsLoading } =
    useGetSavedArticlesQuery();
  console.log(savedArticleData);
  const filteredArticles = useMemo(() => {
    if (!articleData) return [];
    const articlesToFilter = isInSavedPage ? savedArticleData : articleData;

    let filteredByCategory = articlesToFilter;
    if (selectedCategory !== "All") {
      filteredByCategory = articlesToFilter?.filter(
        (article) =>
          article.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    const filteredBySearch = filteredByCategory?.filter((article) =>
      article.title.toLowerCase().includes(search.toLowerCase())
    );

    return filteredBySearch;
  }, [articleData, savedArticleData, search, selectedCategory, isInSavedPage]);

  if (articleIsLoading || savedIsLoading) {
    return <p>Loading...</p>;
  }

  if (articleIsError) {
    return <p>Something went wrong</p>;
  }

  return (
    <>
      <div className="bg-gray-100 p-5">
        {isInSavedPage && (
          <Link to="/articles">
            <BsArrowLeft className="text-2xl text-gray-500 mb-3 cursor-pointer" />
          </Link>
        )}
        <div className="flex items-center text-[#293B95] text-2xl font-bold ">
          <>
            <div className="flex-1">
              {isInSavedPage ? "Saved Articles" : "Disaster Resources"}{" "}
            </div>{" "}
            {savedArticleData?.length != 0 &&
              !isInSavedPage &&
              search === "" && (
                <Link to="/articles/saved">
                  <BiBookmarks />
                </Link>
              )}
          </>
        </div>
        <div className=" min-h-screen">
          <div className="relative w-full my-5">
            <input
              type="text"
              className="w-full h-10 pl-3 pr-10 text-sm border rounded-xl bg-gray-200"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <div className="text-xl text-gray-500 absolute top-0 right-0 h-10 pr-3 flex items-center">
              <BiSearch />
            </div>
          </div>

          {!isInSavedPage &&
            search === "" &&
            savedArticleData &&
            savedArticleData.length != 0 && (
              <>
                <div className="font-bold text-gray-800 my-3">Saved:</div>
                <CarouselArticleList articleData={savedArticleData} />
              </>
            )}
          {
            <div className="flex my-3">
              {/* <div className="flex-1 font-bold text-gray-800 ">All:</div>
               */}
              <select
                className="outline-0 border rounded-md p-1" /* bg-gray-200 */
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                {categories.map((category, index) => (
                  <option key={index} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          }
          {filteredArticles && <ArticleList articleData={filteredArticles} />}
        </div>
      </div>
    </>
  );
};

export default ArticlesPage;

const categories = ["All", "Heat Safety", "Flood Safety", "General Tips"];
