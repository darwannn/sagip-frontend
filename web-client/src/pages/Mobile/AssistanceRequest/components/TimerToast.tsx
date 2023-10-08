import { GrPowerReset } from "react-icons/gr";
type TProps = {
  setTimer: (value: number) => void;
  timer: number;
  timeBeforeAutoSubmit: number;
};
const TimerNotify = ({ timer, setTimer, timeBeforeAutoSubmit }: TProps) => {
  return (
    <>
      <div
        className="flex items-center text-[11px] bg-primary-600 rounded-full text-white py-1  px-2  cursor-pointer text-left shadow-md opacity-90 w-[200px]"
        onClick={() => setTimer(timeBeforeAutoSubmit)}
      >
        <div
          className="bg-white rounded-full p-1"
          onClick={() => setTimer(timeBeforeAutoSubmit)}
        >
          <GrPowerReset className="text-lg" />
        </div>
        <p className="px-2">
          {" "}
          The form will be submitted in {timer}{" "}
          {timer > 1 ? "seconds" : "second"}
        </p>
      </div>
    </>
  );
};

export default TimerNotify;
