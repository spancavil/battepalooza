import { useEffect, useContext, useState, useMemo } from "react";
import Pack from "../../../../Assets/img/pack1.png";
import { PackData } from "../../../../Context/PackProvider";
import styles from "./styles.module.scss";
import { getDaysMinutesSeconds } from "../../../../Utils/createDate";
import { createRef } from "react/cjs/react.production.min";

export const FirstPack = ({ onClick }) => {
    const { packData } = useContext(PackData);
    const [timer, setTimer] = useState({ message: "", state: "" });
    const [count, setCount] = useState(0);
    const [timerRefs, setTimerRefs] = useState([])

    useEffect(() => {
        if (timer.message !== "" && count === 0) {
            console.log("Entra aquí");
            setCount(count+1);
            setTimerRefs(timer.message.split(":").map(() => createRef()))
        }
    }, [timer, count, setCount]);

    console.log(timerRefs);

    useEffect(() => {
        let interval;
        if (packData && packData?.packInfo?.length !== 0) {
            interval = setInterval(() => {
                let date = getDaysMinutesSeconds(
                    packData?.packInfo?.startTime,
                    packData?.packInfo?.endTime
                );
                let { message, state } = date;
                const actualDate = { message, state };
                setTimer(actualDate);
            }, 1000);
        }
        return () => {
            clearInterval(interval);
        };
    }, [packData]);

    const timerFragments = timer.message.split(":");

    return (
        <div onClick={onClick} className={styles.firstPack}>
            <div className={styles.imgContainer}>
                <img src={Pack} alt="pack" />
            </div>
            <div className={styles.texts}>
                <div className={styles.time}>
                    <div className={styles.messageSeparator}>
                        {timerFragments?.map((time, index) => {
                            if (index !== 2)
                                return (
                                    <>
                                        <p key={time} ref= {timerRefs[index]}>{time}</p>
                                        <h4 key={index}>:</h4>
                                    </>
                                );
                            return <p key={time} ref={timerRefs[index]}>{time}</p>;
                        })}
                    </div>
                    <div className={styles.messageSeparator2}>
                        <span style={{ width: timerRefs[0]?.current?.offsetWidth }}>DAYS</span>
                        <span style={{ width:  timerRefs[1]?.current?.offsetWidth, margin: '0 10px 0 20px'}}>HRS</span>
                        <span style={{ width: timerRefs[2]?.current?.offsetWidth, margin: '0 10px'}}>MINS</span>
                        <span style={{ width: timerRefs[0]?.current?.offsetWidth, margin: '0 10px'}}>SEC</span>
                    </div>
                </div>
                <div className={styles.desc}>
                    <p>{packData?.packInfo?.name}</p>
                    <span>{packData?.packInfo?.desc}</span>
                </div>
            </div>
        </div>
    );
};
