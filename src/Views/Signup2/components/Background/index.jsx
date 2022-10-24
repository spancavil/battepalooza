import { useContext } from "react";
import { MaintenanceData } from "../../../../Context/MaintenanceProvider";
import styles from "./styles.module.scss";

const Background = ({ children, showInfoSignup }) => {
  const { maintenance } = useContext(MaintenanceData);

  return (
    <div
      style={{ paddingTop: !maintenance && "80px" }}
      className={
        showInfoSignup ? styles.layoutContainer2 : styles.layoutContainer
      }
    >
      {children}
    </div>
  );
};

export default Background;
