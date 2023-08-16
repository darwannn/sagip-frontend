import { Bar as ChartBar } from "react-chartjs-2";

const Bar = ({ data }: { data: any }) => {
  return (
    <ChartBar
      data={{
        labels: data.map((item: any) => item.date),
        datasets: [
          {
            data: data.map((item: any) => item.value),
            backgroundColor: "rgba(212, 85, 85, 1)",
            hoverBackgroundColor: "rgba(212, 85, 85, 1)",
          },
        ],
      }}
      options={{
        maintainAspectRatio: true,
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

        scales: {
          x: {
            ticks: {
              font: {
                size: 12,
                family: "Poppins",
              },
              color: "black",
            },
          },
          y: {
            type: "linear" as const,
            ticks: {
              stepSize: 1000,
              font: {
                size: 12,
                family: "Poppins",
              },
              color: "black",
            },
          },
        },
      }}
    />
  );
};

export default Bar;
