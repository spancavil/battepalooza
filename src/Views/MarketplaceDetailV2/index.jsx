import { useContext, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { NftData } from "../../Context/NftProvider";
import Background from "../../Global-Components/Background";
import NftDetail from "../../Global-Components/NftDetail";
import useModifyDetail from "../../Hooks/useModifyDetail";
import marketService from "../../Services/market.service";
import checkErrorMiddleware from "../../Utils/checkErrorMiddleware";
import Checkout from "./components/Checkout";
import Complete from "./components/Complete";
import Proccesing from "./components/Proccesing";


const MarketplaceDetailV2 = () => {
  const history = useHistory();

  const [chosenNftRaw, setChosenNftRaw] = useState({});

  //Modal states
  const [checkout, setCheckout] = useState (false);
  const [proccesing, setProccesing] = useState (false);
  const [buyComplete, setBuyComplete] = useState (false);
  const [nft, setNft] = useState ({});

  const { nftId } = useParams();

  let nftSplitted = nftId.split("-");
  const uid = nftSplitted[0];
  const seller = nftSplitted[1];

  const { nftStatic, clanStatic, rarityStatic, repIdStatic, premiumStatic, setReloadCollection } =
    useContext(NftData);

  useEffect(() => {
    (async () => {
      const response = await marketService.getNftMarketplaceDetail(seller, uid);
      const canContinue = checkErrorMiddleware(response, history);
      if (canContinue) {
        setChosenNftRaw(response.product);
      }
    })();
  }, [uid, seller, history]);

  const chosenNft = useModifyDetail(
    chosenNftRaw,
    nftStatic,
    clanStatic,
    rarityStatic,
    repIdStatic,
    premiumStatic
  );

  const setBuy = nftSelected => {
    setNft (nftSelected);
    setCheckout (true);
  };

  const proccessingComplete = () => {
    setCheckout (false);
    setProccesing (false);
    setBuyComplete (true);
  };

  const handleReload = (destiny) => {
    setReloadCollection(value => !value)
    history.push(`/${destiny}`)
  }

  return (
    <Background>
      <NftDetail 
        goBack="/marketplace" 
        chosenNft={chosenNft} 
        buyNft={nftSelected => setBuy (nftSelected)}
      />
      {checkout &&
        <Checkout
          nftBuy={nft}
          nftProccesing={setProccesing}
          handleClose={setCheckout}
        />}
      {proccesing &&
        <Proccesing 
          nftBuy={nft} 
          proccessingComplete={proccessingComplete} 
          handleClose={()=>setProccesing(false)}
        />}
      {buyComplete &&
        <Complete
          title={nft.itemName}
          goCollection={() => handleReload('collection')}
          goMarketPlace={() => handleReload('marketPlace')}
        />}
    </Background>
  );
};

export default MarketplaceDetailV2;
