import { useContext, useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { MaintenanceData } from "../../Context/MaintenanceProvider";
import { NftData } from "../../Context/NftProvider";
import { PackData } from "../../Context/PackProvider";
import Background from "../../Global-Components/Background";
import BackLink from "../../Global-Components/BackLink";
import Loader from "../../Global-Components/Loader";
import useModifyList from "../../Hooks/useModifyList";
import Checkout from "./components/Checkout";
import Complete from "./components/Complete";
import Obtainable from "./components/Obtainable";
import PackDescription from "./components/PackDescription";
import Proccesing from "./components/Proccesing";

import styles from "./styles.module.scss";

const PackDetailV3 = () => {
  const [pack, setSelectedPack] = useState();
  const [packCount, setPackCount] = useState(1);
  const [buyComplete, setBuyComplete] = useState(false);
  const [checkoutNCoin, setCheckoutNCoin] = useState(false);
  const [processingNCoin, setProcessingNcoin] = useState(false);

  const { setPack, packData } = useContext(PackData);
  const { setReloadCollection } = useContext(NftData);
  const { nftStatic, clanStatic, rarityStatic, repIdStatic, premiumStatic } =
    useContext(NftData);
  const { setCheckMaintenance } = useContext(MaintenanceData);

  const { id } = useParams();

  const history = useHistory();

  const nftList = useModifyList(
    pack?.obtainableNFTs || [],
    nftStatic,
    clanStatic,
    rarityStatic,
    repIdStatic
  );

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

  //Fire check maintenance
  useEffect(() => {
    setCheckMaintenance((value) => !value);
  }, [setCheckMaintenance]);

  return (
    <Background>
      <BackLink to="/packs" content="Go back to packs" />
      {pack ? (
        <div className={styles.packContainer}>
          <PackDescription
            pack={pack}
            setCheckoutNCoin={setCheckoutNCoin}
            setPackCount={setPackCount}
          />
          <Obtainable
            nftList={nftList}
            premiumBuffs={premiumStatic}
            rarityRates={pack?.randomWeights}
          />
        </div>
      ) : (
        <div className={styles.loadingContainer}>
          <Loader />
        </div>
      )}
      {checkoutNCoin && (
        <Checkout
          setPackCount={setPackCount}
          quantity={packCount}
          packBuy={pack}
          nftProccesing={setProcessingNcoin}
          handleClose={setCheckoutNCoin}
        />
      )}
      {processingNCoin && (
        <Proccesing
          packBuy={pack}
          processingComplete={processingComplete}
          handleClose={() => setProcessingNcoin(false)}
          quantity={packCount}
        />
      )}
      {buyComplete && (
        <Complete
          title={pack?.packName}
          goOpenPack={() => handleCloseComplete()}
          closeComplete={() => handleCloseComplete()}
        />
      )}
    </Background>
  );
};

export default PackDetailV3;
