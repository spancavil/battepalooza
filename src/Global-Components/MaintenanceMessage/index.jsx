import styles from "./styles.module.scss";

const MaintenanceMessage = () => {
  return (
    <div className={styles.maintenanceMsg}>
      <b>System under maintenance</b>
      <p>You cannot purchase or trade packs during maintenance.</p>
      <span>
        Maintenance: <b>00:23:59:59</b>
      </span>
    </div>
  );
};

export default MaintenanceMessage;
