import React, { useContext } from "react";
import { MaintenanceData } from "../../Context/MaintenanceProvider";
import styles from "./styles.module.scss";

const Background = ({ children }) => {
  const { maintenance } = useContext(MaintenanceData);

  return (
    <div
      style={{ paddingTop: !maintenance && "80px" }}
      className={styles.layoutContainer}
    >
      {children}
    </div>
  );
};

export default Background;
