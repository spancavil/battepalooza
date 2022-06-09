import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { useState } from "react";
import styles from "./styles.module.scss";

const Sections = () => {
  const { pathname } = useLocation();
  const [claimClick, setClaimClick] = useState(false)

/*   const handleClaim = () => {
    window.open("https://auth.nwayplay.com");
    setClaimClick(true)
  } */

  return (
    <div className={styles.sections}>
      <Link
        to={"/account/profile"}
        className={
          pathname === "/account/profile" && !claimClick ? styles.btnSelected : styles.btn
        }
      >
        <button onClick={()=> setClaimClick(false)}>Profile</button>
      </Link>
      <Link
        to={"/account/trade-history"}
        className={
          pathname === "/account/trade-history" && !claimClick
            ? styles.btnSelected
            : styles.btn
        }
      >
        <button onClick={()=> setClaimClick(false)}>Trade History</button>
      </Link>
      {/* <span 
        className = { claimClick ? styles.btnSelected : styles.btn}
      >
        <button onClick={handleClaim}>Claim</button>
      </span> */}
    </div>
  );
};

export default Sections;
