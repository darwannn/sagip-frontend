import { Doughnut as ChartDoughnut } from "react-chartjs-2";

const Doughnut = ({ data }: { data: any }) => {
  return (
    <ChartDoughnut
      data={{
        labels: data.map((item: any) => item.title),
        datasets: [
          {
            data: data.map((item: any) => item.value),
            backgroundColor: data.map((item: any) => item.color),
            hoverBackgroundColor: data.map((item: any) => item.color),
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
