import { useEffect, useState } from "react";
import { getDaysMinutesSeconds } from "../../Utils/createDate";

const Timer = ({ pack }) => {
  const [timer, setTimer] = useState({ message: "", state: "" });

  useEffect(() => {
    let interval;

    if (pack) {
      if (Object.keys(pack).length) {
        interval = setInterval(() => {
          let date = getDaysMinutesSeconds(pack?.startTime, pack?.endTime);
          let { message, state } = date;
          const actualDate = { message, state };
          setTimer(actualDate);
        }, 1000);
      }
    }

    return () => {
      clearInterval(interval);
    };
  }, [pack]);

  return <b>{timer.message}</b>;
};

export default Timer;
