import { useNavigate } from "react-router-dom";

import { Article } from "../../../../types/article";
import { BASE_IMAGE_URL } from "../../../../api.config";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

type TProps = {
  articleData: Article;
};

const CarouselArticleItem = ({ articleData }: TProps) => {
  const navigate = useNavigate();

  return (
    <>
      <div className="p-2">
        <div className="h-[150px]">
          <img
            src={`${BASE_IMAGE_URL}/safety-tips/${articleData.image}`}
            alt={articleData.title}
            className="rounded-3xl w-full h-full object-cover"
          />
        </div>
        <div className="mt-2 ml-5">
          <div
            className="font-bold hover:text-[#364FC7] hover:cursor-pointer"
            onClick={() => navigate(`/articles/${articleData._id}`)}
          >
            {articleData.title}
          </div>
          <div className="text-gray-600 text-sm">{articleData.category}</div>
        </div>
      </div>
    </>
  );
};

export default CarouselArticleItem;
