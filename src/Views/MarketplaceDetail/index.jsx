import React, {useState, useContext} from 'react';
import {useHistory} from 'react-router';
import {NftData} from '../../Context/NftProvider';
import Background from '../../Global-Components/Background';
import Checkout from './components/Checkout';
import Complete from './components/Complete';
import NftDetail from './components/NftDetail';
import Proccesing from './components/Proccesing';

const MarketplaceDetail = () => {
  const history = useHistory ();
  const {nfts} = useContext (NftData);

  const [nftBuy, setNftBuy] = useState ({});
  const [checkout, setCheckout] = useState (false);
  const [proccesing, setProccesing] = useState (false);
  const [buyComplete, setBuyComplete] = useState (false);

  const setBuy = nftSelected => {
    setNftBuy (nftSelected);
    setCheckout (true);
  };

  const processingComplete = estado => {
    setCheckout (false);
    setProccesing (false);
    setBuyComplete (true);
  };

  console.log (nfts);

  return (
    <Background>
      <NftDetail setNft={nftSelected => setBuy (nftSelected)} nfts={nfts} />
      {checkout &&
        <Checkout
          nftBuy={nftBuy}
          nftProccesing={setProccesing}
          handleClose={setCheckout}
        />}
      {proccesing &&
        <Proccesing nftBuy={nftBuy} handleClose={processingComplete} />}
      {buyComplete &&
        <Complete
          title={nftBuy.title1}
          goCollection={() => history.push ('/collection')}
          goMarketPlace={() => history.push ('/marketPlace')}
        />}
    </Background>
  );
};

export default MarketplaceDetail;
