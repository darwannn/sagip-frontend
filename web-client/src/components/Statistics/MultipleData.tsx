import { useNavigate } from "react-router-dom";
import Doughnut from "../Charts/Doughnut";

type TProps = {
  title: string;
  value: number;
  color: string;
};

const MultipleData = ({
  data,
  navigateTo,
}: {
  data: TProps[];
  navigateTo: string;
}) => {
  const navigate = useNavigate();

  return (
    <div
      className={`flex flex-col sm:flex-row justify-center items-center p-5 gap-5 h-full border-2 rounded-xl border-gray-200 bg-gray-200 text-gray-800 ${
        navigateTo !== "/" && "cursor-pointer"
      }`}
    >
      <div className="w-44 flex items-center justify-center">
        <Doughnut data={data} />
      </div>
      <div
        className={
          data.length === 2
            ? "w-1/2 grid h-full grid-row-2 justify-center gap-4"
            : "w-1/2 grid h-full grid-cols-2 items-center gap-4"
        }
        onClick={() => {
          if (navigateTo !== "/") navigate(navigateTo);
        }}
      >
        {data.map(({ title, value, color }) => (
          <div key={title}>
            <div className="flex items-center">
              <span
                className="w-2 h-2 rounded-full mr-2"
                style={{ backgroundColor: color }}
              ></span>
              <h2>{title}</h2>
            </div>
            <span className="font-bold text-3xl ml-4">
              {value?.toLocaleString()}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MultipleData;
