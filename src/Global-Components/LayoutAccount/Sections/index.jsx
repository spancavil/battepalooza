import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import styles from "./styles.module.scss";

const Sections = () => {
  const { pathname } = useLocation();
  console.log(pathname);

  return (
    <div className={styles.sections}>
      <Link
        to={"/account/profile"}
        className={
          pathname === "/account/profile" ? styles.btnSelected : styles.btn
        }
      >
        <button>Profile</button>
      </Link>
      <Link
        to={"/account/trade-history"}
        className={
          pathname === "/account/trade-history"
            ? styles.btnSelected
            : styles.btn
        }
      >
        <button>Trade History</button>
      </Link>
    </div>
  );
};

export default Sections;
