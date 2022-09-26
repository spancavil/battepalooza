import { useContext, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { NftData } from "../../Context/NftProvider";
import Background from "../../Global-Components/Background";
import useModifyDetail from "../../Hooks/useModifyDetail";
import marketService from "../../Services/market.service";
import checkErrorMiddleware from "../../Utils/checkErrorMiddleware";
import NftDetail from "./components/NftDetail";

const MarketplaceDetailV2 = () => {
  const history = useHistory();

  const [chosenNftRaw, setChosenNftRaw] = useState({});
  const { nftId } = useParams();

  let nftSplitted = nftId.split("-");
  const uid = nftSplitted[0];
  const seller = nftSplitted[1];

  const { nftStatic, clanStatic, rarityStatic, repIdStatic, premiumStatic } =
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

  return (
    <Background>
      <NftDetail goBack="/marketplace" chosenNft={chosenNft} />
    </Background>
  );
};

export default MarketplaceDetailV2;
