import { useState, useEffect } from "react";
import Bar from "../../../../components/Charts/Bar";
import "chart.js/auto";

import type { THazardReport } from "../../../HazardReports/types/hazardReport";

import { MdChevronRight, MdChevronLeft } from "react-icons/md";

import moment from "moment";

type TProps = {
  emergencyData?: THazardReport[];
};

const ResponderChart = ({ emergencyData }: TProps) => {
  const currentYear = moment().year();
  const [displayedDate, setDisplayedDate] = useState<moment.Moment>(moment());

  const [displayedYear, setDisplayedYear] = useState<number>(moment().year());
  const [disablePrevDayButton, setDisablePrevDayButton] =
    useState<boolean>(true);
  const [disableNextDayButton, setDisableNextDayButton] =
    useState<boolean>(true);
  const [disablePrevMonthButton, setDisablePrevMonthButton] =
    useState<boolean>(true);
  const [disableNextMonthButton, setDisableNextMonthButton] =
    useState<boolean>(true);

  const [resolvedEmergenciesData, setResolvedReportsData] = useState<
    { date: string; value: number }[]
  >([]);

  const [selectedOption, setSelectedOption] = useState<string>("perDay");

  useEffect(() => {
    if (emergencyData) {
      if (selectedOption === "lastFiveMonths") {
        // filter resolved emergency request status within the last five months
        const fiveMonthsAgo = moment().subtract(6, "months");
        const lastFiveMonthsData = emergencyData.filter(
          (report) =>
            report.status === "resolved" &&
            moment(report.createdAt).isSameOrAfter(fiveMonthsAgo)
        );

        const groupedByMonth: { [date: string]: number } = {};
        // count the number of resolved emergency requests for the last five months
        lastFiveMonthsData.map((request) => {
          const monthYear = moment(request.createdAt).format("MMMM YYYY");
          groupedByMonth[monthYear] = (groupedByMonth[monthYear] || 0) + 1;
        });

        //create an array of the last five months
        const lastFiveMonths = [...Array(5).keys()].map((index) => {
          const date = moment().subtract(index, "months");
          return date.format("MMMM YYYY");
        });

        const resolvedEmergency = lastFiveMonths.map((monthYear) => ({
          date: moment(monthYear, "MMMM YYYY").format("MMMM"),
          value: groupedByMonth[monthYear] || 0,
        }));

        setResolvedReportsData(resolvedEmergency.reverse());
      } else if (selectedOption === "perMonth") {
        const currentYear = displayedYear;
        const groupedData: { [yearMonth: string]: number } = {};

        // create an array for all months in the year
        const allMonths = [...Array(12).keys()].map((index) => {
          const date = moment().year(currentYear).month(index);
          return date.format("YYYY-MM");
        });

        allMonths.forEach((yearMonth) => {
          groupedData[yearMonth] = 0;
        });

        // count the number of resolved emergency requests each month
        emergencyData.forEach((report) => {
          if (report.status === "resolved") {
            const yearMonth = moment(report.createdAt).format("YYYY-MM");
            groupedData[yearMonth] = (groupedData[yearMonth] || 0) + 1;
          }
        });

        const resolvedEmergency = allMonths.map((yearMonth) => ({
          date: moment(yearMonth).format("MMMM"),
          value: groupedData[yearMonth],
        }));

        setResolvedReportsData(
          resolvedEmergency.sort((a, b) =>
            moment(a.date, "MMMM").diff(moment(b.date, "MMMM"))
          )
        );
      } else if (selectedOption === "perYear") {
        const groupedData: { [year: string]: number } = {};

        // count the number of resolved emergency requests each year
        emergencyData.map((request) => {
          if (request.status === "resolved") {
            const year = moment(request.createdAt).format("YYYY");
            groupedData[year] = (groupedData[year] || 0) + 1;
          }
        });

        // loop in the past 10 years
        /* const resolvedEmergency: { date: string; value: number }[] = [];
        for (let i = currentYear - 9; i <= currentYear; i++) {
          const year = i.toString();
          resolvedEmergency.push({
            date: year,
            value: groupedData[year],
          });
          console.log(year);
          console.log(groupedData[year]);
        } */

        // show only years with existing record
        const yearsWithRecords = Object.keys(groupedData);

        const resolvedEmergency: { date: string; value: number }[] =
          yearsWithRecords.map((year) => ({
            date: year,
            value: groupedData[year],
          }));

        setResolvedReportsData(resolvedEmergency);
      } else if (selectedOption === "perDay") {
        // Filter resolved emergency requests within the selected displayedDate's month
        const firstDayOfMonth = displayedDate.clone().startOf("month");
        const lastDayOfMonth = displayedDate.clone().endOf("month");
        const selectedMonthData = emergencyData.filter(
          (report) =>
            report.status === "resolved" &&
            moment(report.createdAt).isBetween(
              firstDayOfMonth,
              lastDayOfMonth,
              "day",
              "[]"
            )
        );

        // Group data by day of the month
        const groupedByDay: { [day: string]: number } = {};
        selectedMonthData.forEach((request) => {
          const day = moment(request.createdAt).format("D");
          groupedByDay[day] = (groupedByDay[day] || 0) + 1;
        });

        // Create an array of all days in the month
        const daysOfMonth = Array.from(
          { length: lastDayOfMonth.date() },
          (_, index) => (index + 1).toString()
        );

        const resolvedEmergency = daysOfMonth.map((day) => ({
          date: day,
          value: groupedByDay[day] || 0,
        }));

        setResolvedReportsData(resolvedEmergency);
      }
    }

    /* limits prev and next button to years with existing record */
    const earliestYear = emergencyData
      ? Math.min(
        ...emergencyData
          .filter((report) => report.status === "resolved")
          .map((report) => moment(report.createdAt).year())
      )
      : moment().year();

    const earliestMonths = emergencyData
      ? emergencyData
        .filter((report) => report.status === "resolved")
        .map((report) => moment(report.createdAt).format("YYYY-MM"))
      : [moment().format("YYYY-MM")];

    if (selectedOption === "perDay") {
      setDisablePrevDayButton(
        displayedDate.format("YYYY-MM") <= earliestMonths[0]
      );
      setDisableNextDayButton(
        displayedDate.isSameOrAfter(moment().subtract(1, "day"))
      );
    } else if (selectedOption === "perMonth") {
      setDisablePrevMonthButton(displayedYear <= earliestYear);
      setDisableNextMonthButton(displayedYear >= currentYear);
    }
  }, [
    emergencyData,
    selectedOption,
    displayedYear,
    displayedDate,
    currentYear,
  ]);

  return (
    <div className="h-full flex flex-col overflow-auto lg:overflow-visible">
      <div className="flex justify-between mb-5 mx-5">
        <h1 className="text-xl font-bold">
          {selectedOption === "lastFiveMonths" &&
            "Responds in the last 5 months"}
          {selectedOption === "perMonth" &&
            `Responds in the year ${displayedYear}`}
          {selectedOption === "perYear" && "Responds per year"}
          {selectedOption === "perDay" &&
            `Responds in the month of ${displayedDate.format("MMMM YYYY")}`}
        </h1>
        <select
          className="outline-0 border rounded-md p-1 bg-gray-200  "
          onChange={(e) => setSelectedOption(e.target.value)}
          value={selectedOption}
        >
          <option value="perDay">Day</option>
          <option value="perMonth"> Month</option>
          <option value="lastFiveMonths">Last 5 Months</option>
          <option value="perYear"> Year</option>
        </select>
      </div>

      <div className="flex flex-1 items-center justify-center px-10">
        {selectedOption === "perMonth" && (
          <button
            className="text-4xl text-black mb-12 disabled:text-gray-400"
            onClick={() => setDisplayedYear((year) => year - 1)}
            disabled={disablePrevMonthButton}
          >
            <MdChevronLeft />
          </button>
        )}
        {selectedOption === "perDay" && (
          <button
            className="text-4xl text-black mb-12 disabled:text-gray-400"
            onClick={() =>
              setDisplayedDate(displayedDate.clone().subtract(1, "month"))
            }
            disabled={disablePrevDayButton}
          >
            <MdChevronLeft />
          </button>
        )}

        <Bar data={resolvedEmergenciesData} />

        {selectedOption === "perMonth" && (
          <button
            className="text-4xl text-black mb-12 disabled:text-gray-400"
            onClick={() => setDisplayedYear((year) => year + 1)}
            disabled={disableNextMonthButton}
          >
            <MdChevronRight />
          </button>
        )}
        {selectedOption === "perDay" && (
          <button
            className="text-4xl text-black mb-12 disabled:text-gray-400"
            onClick={() =>
              setDisplayedDate(displayedDate.clone().add(1, "month"))
            }
            disabled={disableNextDayButton}
          >
            <MdChevronRight />
          </button>
        )}
      </div>
    </div>
  );
};

export default ResponderChart;
