import { useState } from "react";
import OrdersIcon from "../../Assets/svg/OrdersIcon";

import styles from "./styles.module.scss";

const DropdownSection = ({ title, children }) => {
  const [open, setOpen] = useState(false);

  return (
    <div
      className={open ? styles.dropdownSectionActive : styles.dropdownSection}
    >
      <div onClick={() => setOpen(!open)} className={styles.title}>
        <span>{title}</span>
        <OrdersIcon className={styles.icon}/>
      </div>
      {open && <>{children}</>}
    </div>
  );
};

export default DropdownSection;
