import { PackData } from "../../Context/PackProvider";
import { useContext } from "react";

import Background from "../../Global-Components/Background";

import styles from "./styles.module.scss";

const PackDetailV2 = () => {
  const { packSelected } = useContext(PackData);

  console.log({ packSelected });

  return (
    <Background>
      <div className={styles.header}>
        <img src="" alt="" />
      </div>
    </Background>
  );
};

export default PackDetailV2;
