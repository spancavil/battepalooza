import { createContext, useState, useEffect, useContext } from "react";
import marketService from "../Services/market.service";
import nftService from "../Services/nft.service";
import { UserData } from "./UserProvider";
export const NftData = createContext({});

const NftProvider = ({ children }) => {

  const {userData} = useContext(UserData);
  const [nftMarket, setNftMarket] = useState([])
  const [nftSelected, setNftSelected] = useState({});
  const [nftToOpen, setNftToOpen] = useState({});
  const [userCollection, setUserCollection] = useState([]);
  const characterMaxStats = {
    maxHealth: 3312,
    maxEnergyRecovery: 15,
    maxMoveSpeed: 11,
  } 

  const weaponMaxStats = {
    maxDamage: 726,
    maxCoolDown: 40,
  }

  const setNft = (nft) => {
    setNftSelected(nft);
  };

  const setNftForOpen = (nft) => {
    setNftToOpen(nft);
  };

  useEffect (()=> {

    (async() => {

      

      //Get user collection
      if (Object.keys(userData).length !== 0){
        const userCollection = await nftService.getNftCollection(userData);
        if (userCollection.nfts){
          setUserCollection(userCollection.nfts);
        }
      }

    })()

  }, [userData])

  useEffect(()=> {

    //Get marketplace collection
    ( async ()=> {
      const marketCollection = await marketService.getNftMarketplaceList()
      if (marketCollection?.error.num === 0) {
        setNftMarket(marketCollection.products)
      }

    })()

  }, [])


  return (
    <NftData.Provider
      value={{ setNft, setNftForOpen,
        nftMarket, nftSelected, nftToOpen, userCollection, characterMaxStats, weaponMaxStats}}
    >
      {children}
    </NftData.Provider>
  );
};

export default NftProvider;