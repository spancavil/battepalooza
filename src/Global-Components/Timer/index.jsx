import { useEffect, useRef, useState } from "react";
import { getDaysMinutesSeconds } from "../../Utils/createDate";

const Timer = ({ pack }) => {
  const [timer, setTimer] = useState({ message: "", state: "" });

  const blockFlag = useRef(false);

  useEffect(() => {
    let interval;

    if (pack && !blockFlag.current) {
      if (Object.keys(pack).length) {
        blockFlag.current = true
        interval = setInterval( async () => {
          let date = await getDaysMinutesSeconds(pack?.startTime, pack?.endTime);
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
