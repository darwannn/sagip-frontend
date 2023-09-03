import { Article } from "../../../../types/article";

import SavedArticleItem from "./CarouselArticleItem";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

type TProps = {
  articleData: Article[];
};

const CarouselArticleList = ({ articleData }: TProps) => {
  const slickSettings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3.5,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2.5,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1.5,
        },
      },
    ],
  };

  return (
    <>
      <Slider {...slickSettings}>
        {articleData.map((article, index) => (
          <SavedArticleItem key={index} articleData={article} />
        ))}
      </Slider>
    </>
  );
};

export default CarouselArticleList;
