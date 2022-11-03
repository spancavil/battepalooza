import { useContext, useEffect, useState } from "react";
import { MaintenanceData } from "../../Context/MaintenanceProvider";
import { getStartAndEndMessages } from "../../Utils/maintenaceDates";
import styles from "./styles.module.scss";

const MaintenanceMessage = () => {
    const { maintenance } = useContext(MaintenanceData);
    const [date, setDate] = useState({ start: "", end: "" });

    useEffect(() => {
      if (Object.keys(maintenance).length) {
        const dateProccesed = getStartAndEndMessages(
            maintenance.start,
            maintenance.end
        );
        setDate({
            start: dateProccesed.startMessage,
            end: dateProccesed.endMessage,
        });
      }
    }, [maintenance]);

    return (
        <div className={styles.maintenanceMsg}>
            <b>System under maintenance</b>
            <p>You cannot purchase or trade packs during maintenance.</p>
            <span>
                Maintenance: <b>{date.start}</b> ~ <b>{date.end}</b>
            </span>
        </div>
    );
};

export default MaintenanceMessage;
