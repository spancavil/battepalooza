import React, { useEffect, useState, useContext } from "react";
import styles from "./styles.module.scss";
import { useParams, useHistory } from "react-router";
import marketService from "../../../../Services/market.service";
import { NftData } from "../../../../Context/NftProvider";
import useModifyDetail from "../../../../Hooks/useModifyDetail";
import checkErrorMiddleware from "../../../../Utils/checkErrorMiddleware";
import { Link } from "react-router-dom";
import Description from "./components/Description";
import Stats from "./components/Stats";
import Abilities from "./components/Abilities";
import P2eInfo from "./components/P2eInfo";
import Generations from "./components/Generations";

const NftDetail = ({ nfts, setNft, setNftListing }) => {
  const history = useHistory();

  const [chosenNftRaw, setChosenNftRaw] = useState({});
/*   const [loading, setLoading] = useState(false);
  const [premium, setPremium] = useState(false);
  const [position, setPosition] = useState({ positionX: "", positionY: "" }); */
  const { nftId } = useParams();

  let nftSplitted = nftId.split("-");
  const uid = nftSplitted[0];
  const seller = nftSplitted[1];

  const { nftStatic, clanStatic, rarityStatic, repIdStatic, premiumStatic } =
    useContext(NftData);
 /*  const { userData } = useContext(UserData); */

  useEffect(() => {
    (async () => {
      const response = await marketService.getNftMarketplaceDetail(seller, uid);
      const canContinue = checkErrorMiddleware(response, history);
      if (canContinue) {
        setChosenNftRaw(response.product);
      }
    })();
  }, [uid, seller, history]);

/*   useEffect(() => {
    setLoading(true);
  }, []); */

/*   const handleBuy = () => {
    if (Object.keys(userData).length !== 0) {
      setNft(chosenNft);
      sendAmplitudeData("Buy request Marketplace");
    } else {
      fireToast("Need login", 1200, "300px");
    }
  }; */

/*   const handleShowPremium = (e) => {
    console.log(e);
    setPosition({
      positionY: e.nativeEvent.offsetY,
    });
    setPremium(true);
  }; */

  const chosenNft = useModifyDetail(
    chosenNftRaw,
    nftStatic,
    clanStatic,
    rarityStatic,
    repIdStatic,
    premiumStatic
  );

  return (
    <>
      <div className={styles.nftDetailPage}>
        <Link className={styles.goBackToMarket} to="/marketplace">
          &lt; Go back to Marketplace
        </Link>
        <div className={styles.nft}>
          <div className={styles.nftImg}>
            <img src={chosenNft?.thumbnailUrl} alt={chosenNft?.itemName} />
          </div>
          <div className={styles.nftData}>
            <Description chosenNft={chosenNft} />
            <Stats chosenNft={chosenNft} />
            <Abilities chosenNft={chosenNft} />
            <P2eInfo chosenNft={chosenNft} />
            <Generations />
          </div>
        </div>
      </div>
      {/* <Footer /> */}
    </>
  );
};

export default NftDetail;
