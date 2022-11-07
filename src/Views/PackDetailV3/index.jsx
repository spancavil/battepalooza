import { useContext, useEffect, useState } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { NftData } from "../../Context/NftProvider";
import { PackData } from "../../Context/PackProvider";
import useModifyList from "../../Hooks/useModifyList";
import Checkout from "./components/Checkout";
import Complete from "./components/Complete";
import Obtainable from "./components/Obtainable";
import PackDescription from "./components/PackDescription";
import Proccesing from "./components/Proccesing";

import styles from "./styles.module.scss";

const PackDetailV3 = () => {
  const [pack, setSelectedPack] = useState();
  const [checkoutNCoin, setCheckoutNCoin] = useState(false);
  const [processingNCoin, setProcessingNcoin] = useState(false);
  const [buyComplete, setBuyComplete] = useState(false);

  const { setPack, packData } = useContext(PackData);
  const { setReloadCollection } = useContext(NftData);
  const { nftStatic, clanStatic, rarityStatic, repIdStatic} = useContext(NftData)

  const { id } = useParams();

  const history = useHistory();

  const nftList = useModifyList(pack?.obtainableNFTs || [], nftStatic, clanStatic, rarityStatic, repIdStatic)

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
    <div className={styles.packDetail}>
      <div className={styles.goBack}>
        <Link to="/packs">&lt; Go back to Packs</Link>
      </div>
      <div className={styles.packContainer}>
        <PackDescription pack={pack} setCheckoutNCoin={setCheckoutNCoin} />
        <Obtainable nftList={nftList} />
      </div>
      {checkoutNCoin && (
        <Checkout
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
        />
      )}
      {buyComplete && (
        <Complete
          title={pack?.packName}
          goOpenPack={() => handleCloseComplete()}
          closeComplete={() => handleCloseComplete()}
        />
      )}
    </div>
  );
};

export default PackDetailV3;
