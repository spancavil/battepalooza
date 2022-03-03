import bpBrand from "../../../../Assets/img/BI-BP-2.png";
import Home from "../../../../Assets/img/Bg-Home.png";

import styles from './styles.module.scss'

const Main = () => {
  return (
    <div className={styles.content1}>
      <div className={styles.battle}>
        <img src={Home} alt="home" className={styles.homePic} id="homeImage" />
        <img src={bpBrand} alt="bp-brand" className={styles.bpBrand} />

      </div>
    </div>
  );
};

export default Main;
