import React, { useContext } from "react";
import { MaintenanceData } from "../../Context/MaintenanceProvider";
import styles from "./styles.module.scss";

const Background = ({ children }) => {
  const { maintenance } = useContext(MaintenanceData);

  return (
    <div
      className={styles.layoutContainer}
      style = { !maintenance ? {paddingTop: 80} : null}
    >
      {children}
    </div>
  );
};

export default Background;
