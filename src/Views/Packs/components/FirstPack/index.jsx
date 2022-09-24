import { useEffect, useContext, useState } from "react";
import Pack from "../../../../Assets/img/pack1.png";
import { PackData } from "../../../../Context/PackProvider";
import styles from "./styles.module.scss";
import {getDaysMinutesSeconds} from '../../../../Utils/createDate';

export const FirstPack = ({ onClick }) => {
    const { packData } = useContext(PackData);
    const [timer, setTimer] = useState({ message: "", state: "" });

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
            }, 10000);
        }
        return ()=> {
          clearInterval(interval)
        }
    }, [packData]);

    console.log("Se actualiza solo este");

    return (
        <div onClick={onClick} className={styles.firstPack}>
            <div className={styles.imgContainer}>
                <img src={Pack} alt="pack" />
            </div>
            <div className={styles.texts}>
                <div className={styles.time}>
                    <p>{timer.message}</p>
                    <span>DAYS HRS MINS</span>
                </div>
                <div className={styles.desc}>
                    <p>{packData?.packInfo?.name}</p>
                    <span>{packData?.packInfo?.desc}</span>
                </div>
            </div>
        </div>
    );
};
