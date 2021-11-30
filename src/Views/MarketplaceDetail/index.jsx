import React, { useState } from 'react'
import Background from '../../Global-Components/Background'
import Checkout from './components/Checkout'
import NftDetail from './components/NftDetail'

const MarketplaceDetail = () => {

    const [nftBuy, setNftBuy] = useState({});

    const setBuy = () => {

    }

    console.log(nftBuy);

    return (
        <Background>
            <NftDetail setNft = {(nftSelected) = setBuy}/>
            {/* <Checkout nftBuy/> */}
            
        </Background>
    )
}

export default MarketplaceDetail
