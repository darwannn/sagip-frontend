import {
  Await,
  LoaderFunctionArgs,
  json,
  useNavigate,
  useParams,
} from "react-router-dom";
import { defer, useLoaderData } from "react-router-typesafe";
import { store } from "../../../store/store";
import { articleQueryApi } from "../../../services/articleQuery";
import { Suspense } from "react";
import { Article } from "../../../types/article";
import { BASE_IMAGE_URL } from "../../../api.config";
import momennt from "moment";
import "./styles/articlePreview.css";

// Icons
import { IoMdArrowRoundBack } from "react-icons/io";

const ArticlePreviewPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { article } = useLoaderData<typeof ArticlePreviewLoader>();
  console.log("articleData", article);

  const createMarkup = (html: string) => {
    return { __html: html };
  };

  const formatDate = (date: string) => {
    return momennt(date).format("MMMM DD, YYYY");
  };

  return (
    <Suspense fallback={<p className="text-center">Loading...</p>}>
      <Await resolve={article}>
        {(data: Article) => (
          <div>
            <div className="bg-blue-500 text-white h-[50px] fixed w-full text-base shadow">
              <div className="mx-auto w-full h-full md:w-[600px] lg:w-[1100px] flex flex-row items-center justify-between">
                <div className="flex flex-row items-center">
                  <button
                    className="mr-5 text-2xl"
                    onClick={() => navigate(-1)}
                  >
                    <IoMdArrowRoundBack />
                  </button>
                  <span className="font-semibold text-sm">
                    You are in preview mode.
                  </span>
                </div>
                <div className="justify-self-end text-sm flex gap-2">
                  <button
                    className="py-2 px-5 border border-white text-white rounded hover:bg-white hover:text-blue-500"
                    onClick={() =>
                      navigate(`/admin/manage-articles/edit/${id}`)
                    }
                  >
                    Edit
                  </button>
                </div>
              </div>
            </div>
            <section className="w-full h-[30vh] mb-10">
              <img
                className="w-full h-full object-cover"
                src={`${BASE_IMAGE_URL}/safety-tips/${data.image}`}
                alt="Cover Image"
              />
            </section>
            {/* Article Header */}
            <div className="mx-auto w-full md:w-[600px] lg:w-[1100px]">
              <section className="">
                <h1 className="font-semibold text-5xl text-primary-500">
                  {data.title}
                </h1>
                {/* META */}
                <div className="mt-2 mb-5 text-gray-500 text-base">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">Category: </span>
                    <span>{data.category}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">Date Added: </span>
                    <span>{formatDate(data.createdAt)}</span>
                  </div>
                </div>
              </section>
              <hr />
              <div
                className="preview-container mt-5 mb-20 md:text-xl"
                dangerouslySetInnerHTML={createMarkup(data.content)}
              />
            </div>
          </div>
        )}
      </Await>
    </Suspense>
  );
};

export default ArticlePreviewPage;

const loadArticle = async (id: string) => {
  const dispatch = store.dispatch;
  const res = await dispatch(
    articleQueryApi.endpoints.getArticleById.initiate(id)
  );

  if (res.isError) {
    console.log("res.error", res.error);
    throw json(res.error);
  } else if (res.isSuccess) {
    return res.data;
  }
};

export const ArticlePreviewLoader = async ({ params }: LoaderFunctionArgs) => {
  const { id } = params;

  return defer({
    article: loadArticle(id || ""),
  });
};
