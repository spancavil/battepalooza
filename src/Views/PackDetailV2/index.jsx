import { useContext, useEffect, useState } from "react";
import { PackData } from "../../Context/PackProvider";
import { useParams } from "react-router-dom";
import { PackInfo } from "./components/PackInfo";

import Background from "../../Global-Components/Background";
import Footer from "../../Global-Components/Footer";

import styles from "./styles.module.scss";

const PackDetailV2 = () => {
  const [pack, setSelectedPack] = useState();

  const { setPack, packData } = useContext(PackData);
  const { packSelected } = useContext(PackData);
  const { id } = useParams();

  useEffect(() => {
    const selectedPack = packData?.nftPackProducts?.find(
      (pack) => pack?.id === id
    );
    setSelectedPack(selectedPack);
    setPack(selectedPack);
  }, [id, packData, setPack]);

  return (
    <Background>
      <div className={styles.packDetail}>
        <div className={styles.header}>
          <img src={pack?.thumbnailUrl} alt="" />
        </div>
        <PackInfo pack={packSelected} />
      </div>
      <Footer />
    </Background>
  );
};

export default PackDetailV2;
