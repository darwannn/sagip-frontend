import { Doughnut as ChartDoughnut } from "react-chartjs-2";

interface DoughnutData {
  title: string;
  value: number;
  color: string;
}

type TProps = {
  data: DoughnutData[];
};

const Doughnut: React.FC<TProps> = ({ data }) => {
  const labels = data.map((item) => item.title);
  const values = data.map((item) => item.value);
  const colors = data.map((item) => item.color);

  return (
    <ChartDoughnut
      data={{
        labels: labels,
        datasets: [
          {
            data: values,
            backgroundColor: colors,
            hoverBackgroundColor: colors,
            borderWidth: 0,
          },
        ],
      }}
      options={{
        maintainAspectRatio: false,
        animation: {
          duration: 0,
        },
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            displayColors: false,
          },
        },
      }}
    />
  );
};

export default Doughnut;
