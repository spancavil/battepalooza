import { useContext } from "react";
import { useHistory } from "react-router-dom";

import { PackCard } from "./components/PackCard";
import { PackData } from "../../Context/PackProvider";

import Footer from "../../Global-Components/Footer";
import Background from "../../Global-Components/Background";

import styles from "./styles.module.scss";

const Packs = () => {
  const { setPack, packData } = useContext(PackData);
  const history = useHistory();

  const setSelectedCard = (packId) => {
    setPack(packId);
    history.push(`/packs/${packId}`);
  };

  return (
    <Background>
      <section className={styles.packsSection}>
        <h4>PACKS</h4>
        <span className={styles.description}>
          Battlepalooza Packs contains various NFTs with certain drop rates.
          <br /> The higher quality of the Pack is, the higher the drop rate for
          the high-quality NFTs is.
        </span>

        <div className={styles.packs}>
          {packData?.nftPackProducts?.map((pack) => {
            return (
              <PackCard
                onClick={() => setSelectedCard(pack?.id)}
                key={pack?.id}
                pack={pack}
              />
            );
          })}
        </div>
      </section>
      <Footer />
    </Background>
  );
};

export default Packs;
