import React, { useContext } from "react";
import { NftData } from "../../Context/NftProvider";
import Background from "../../Global-Components/Background";
import NftDetail from "./components/NftDetail";

const MarketplaceDetailV2 = () => {
  const { nftMarket } = useContext(NftData);

  /*   const [nft, setNft] = useState ({});
  const [checkout, setCheckout] = useState (false); */
  /*   const [proccesing, setProccesing] = useState (false);
  const [buyComplete, setBuyComplete] = useState (false); */
  /*   const [listing, setListing] = useState(false); */

  /*   const setBuy = (nftSelected) => {
    if (listing) {
      setListing(false);
    }
    setNft(nftSelected);
    setCheckout(true);
  }; */

  /*   const setNftListing = (nftSelected) => {
    setNft(nftSelected);
    setListing(true);
  }; */

  /*   const proccessingComplete = () => {
    setCheckout (false);
    setProccesing (false);
    setBuyComplete (true);
  };

  const handleReload = (destiny) => {
    setReloadMarket(value => !value)
    setReloadCollection(value => !value)
    history.push(`/${destiny}`)
  } */

  return (
    <Background>
      <NftDetail
        /* setNft={(nftSelected) => setBuy(nftSelected)}
        setNftListing={(nftSelected) => setNftListing(nftSelected)} */
        nfts={nftMarket}
      />
    </Background>
  );
};

export default MarketplaceDetailV2;
