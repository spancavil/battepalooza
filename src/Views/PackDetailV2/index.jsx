import { useContext, useEffect, useState } from "react";
import { PackData } from "../../Context/PackProvider";
import { useHistory, useParams } from "react-router-dom";
import { PackInfo } from "./components/PackInfo";

import Background from "../../Global-Components/Background";
import Footer from "../../Global-Components/Footer";

import styles from "./styles.module.scss";
import Checkout from "../PackDetail/Components/Checkout";
import Proccesing from "../PackDetail/Components/Proccesing";
import Complete from "../PackDetail/Components/Complete";
import { NftData } from "../../Context/NftProvider";

const PackDetailV2 = () => {
  const [pack, setSelectedPack] = useState();
  const [checkoutNCoin, setCheckoutNCoin] = useState(false);
  const [processingNCoin, setProcessingNcoin] = useState(false);
  const [buyComplete, setBuyComplete] = useState(false);

  const { setPack, packData } = useContext(PackData);
  const { packSelected } = useContext(PackData);
  const { setReloadCollection } = useContext(NftData);
  const { id } = useParams();
  const history = useHistory();

  useEffect(() => {
    const selectedPack = packData?.nftPackProducts?.find(
      (pack) => pack?.id === id
    );
    setSelectedPack(selectedPack);
    setPack(selectedPack);
  }, [id, packData, setPack]);

  const processingComplete = () => {
    setCheckoutNCoin(false);
    setProcessingNcoin(false);
    setBuyComplete(true);
  };

  const handleCloseComplete = () => {
    setReloadCollection((value) => !value);
    history.push(`/open-pack`);
  };

  return (
    <Background>
      <div className={styles.packDetail}>
        <div className={styles.header}>
          <img src={pack?.thumbnailUrl} alt="" />
        </div>
        <PackInfo setCheckoutNCoin={setCheckoutNCoin} pack={packSelected} />
      </div>
      <Footer />
      {checkoutNCoin && (
        <Checkout
          packBuy={packSelected}
          nftProccesing={setProcessingNcoin}
          handleClose={setCheckoutNCoin}
        />
      )}
      {processingNCoin && (
        <Proccesing
          packBuy={packSelected}
          processingComplete={processingComplete}
          handleClose={() => setProcessingNcoin(false)}
        />
      )}
      {buyComplete && (
        <Complete
          title={packSelected?.packName}
          goOpenPack={() => handleCloseComplete()}
          closeComplete={() => handleCloseComplete()}
        />
      )}
    </Background>
  );
};

export default PackDetailV2;
