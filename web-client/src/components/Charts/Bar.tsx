import React from "react";
import { Bar as ChartBar } from "react-chartjs-2";

interface ChartData {
  date: string;
  value: number;
}

interface TProps {
  data: ChartData[];
}

const Bar: React.FC<TProps> = ({ data }) => {
  const chartData = {
    labels: data.map((item) => item.date),
    datasets: [
      {
        data: data.map((item) => item.value),
        backgroundColor: "rgba(212, 85, 85, 1)",
        hoverBackgroundColor: "rgba(212, 85, 85, 1)",
      },
    ],
  };

  const chartOptions = {
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
  };

  return <ChartBar data={chartData} options={chartOptions} />;
};

export default Bar;
