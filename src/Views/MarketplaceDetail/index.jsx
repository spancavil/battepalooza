import React, {useState, useContext} from 'react';
import {useHistory} from 'react-router';
import {NftData} from '../../Context/NftProvider';
import Background from '../../Global-Components/Background';
import {useMediaQuery} from '../../Hooks/useMediaQuery';
import Checkout from './components/Checkout';
import Complete from './components/Complete';
import Listing from './components/Listing';
import ListingMobile from './components/ListingMobile';
import NftDetail from './components/NftDetail';
import Proccesing from './components/Proccesing';

const MarketplaceDetail = () => {
  const history = useHistory ();
  const {nftMarket} = useContext (NftData);

  const desktop = useMediaQuery ('(min-width: 768px)');

  const [nft, setNft] = useState ({});
  const [checkout, setCheckout] = useState (false);
  const [proccesing, setProccesing] = useState (false);
  const [buyComplete, setBuyComplete] = useState (false);
  const [listing, setListing] = useState (false);

  const setBuy = nftSelected => {
    if (listing) {
      setListing (false);
    }
    setNft (nftSelected);
    setCheckout (true);
  };

  const setNftListing = nftSelected => {
    setNft (nftSelected);
    setListing (true);
  };

  const processingComplete = () => {
    setCheckout (false);
    setProccesing (false);
    setBuyComplete (true);
  };

  return (
    <Background>
      <NftDetail
        setNft={nftSelected => setBuy (nftSelected)}
        setNftListing={nftSelected => setNftListing (nftSelected)}
        nfts={nftMarket}
      />
      {checkout &&
        <Checkout
          nftBuy={nft}
          nftProccesing={setProccesing}
          handleClose={setCheckout}
        />}
      {proccesing &&
        <Proccesing nftBuy={nft} processingComplete={processingComplete} handleClose={()=>setProccesing(false)}/>}
      {buyComplete &&
        <Complete
          title={nft.itemName}
          goCollection={() => history.push ('/collection')}
          goMarketPlace={() => history.push ('/marketPlace')}
        />}
      {listing &&
        !desktop &&
        <ListingMobile
          handleClose={() => setListing (false)}
          nfts={nftMarket}
          nftSelected={nft}
          setNft={nftSelected => setBuy (nftSelected)}
        />}
      {listing &&
        desktop &&
        <Listing
          handleClose={() => setListing (false)}
          nfts={nftMarket}
          nftSelected={nft}
          setNft={nftSelected => setBuy (nftSelected)}
        />}
    </Background>
  );
};

export default MarketplaceDetail;
