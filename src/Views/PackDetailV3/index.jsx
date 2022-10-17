import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { PackData } from "../../Context/PackProvider";
import PackDescription from "./components/PackDescription";

import styles from "./styles.module.scss";

const PackDetailV3 = () => {
  const [pack, setSelectedPack] = useState();

  const { setPack, packData } = useContext(PackData);
  const { id } = useParams();

  useEffect(() => {
    const selectedPack = packData?.nftPackProducts?.find(
      (pack) => pack?.id === id
    );
    setSelectedPack(selectedPack);
    setPack(selectedPack);
  }, [id, packData, setPack]);

  return (
    <div className={styles.packDetail}>
      <div className={styles.goBack}>
        <Link to="/packs">&lt; Go back to Packs</Link>
      </div>
      <div className={styles.packContainer}>
        <PackDescription pack={pack} />
      </div>
    </div>
  );
};

export default PackDetailV3;
