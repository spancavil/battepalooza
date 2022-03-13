import { createContext, useState, useEffect, useContext } from "react";
import dropService from "../Services/drop.service";
import marketService from "../Services/market.service";
import nftService from "../Services/nft.service";
import { fireAlert } from "../Utils/sweetAlert2";
import { UserData } from "./UserProvider";
export const NftData = createContext({});

const NftProvider = ({ children }) => {

  const { userData } = useContext(UserData);
  const [nftMarket, setNftMarket] = useState([])
  const [nftSelected, setNftSelected] = useState({});
  const [nftToOpen, setNftToOpen] = useState({});
  const [userCollection, setUserCollection] = useState([]);
  const [drops, setDrops] = useState([])

  const [reloadMarket, setReloadMarket] = useState(false);
  const [reloadCollection, setReloadCollection] = useState(false);
  const [reloadDrops, setReloadDrops] = useState(false);

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

  useEffect(() => {

    (async () => {
      try {

        //Get user collection
        if (Object.keys(userData).length !== 0) {
          const userCollection = await nftService.getNftCollection(userData);
          if (userCollection.nfts) {
            setUserCollection(userCollection.nfts);
          }
        }

      } catch (error) {
        fireAlert("Oops, an error ocurred", error.message, '500px');

      }

    })()

  }, [userData, reloadCollection])

  useEffect(() => {

    //Get marketplace collection
    (async () => {
      try {
        const marketCollection = await marketService.getNftMarketplaceList()
        if (marketCollection?.error.num === 0) {
          setNftMarket(marketCollection.products)
        }

      } catch (error) {
        fireAlert("Oops, an error ocurred", error.message, '500px');
      }

    })()

  }, [reloadMarket])

  useEffect(() => {

    //Get drops
    (async () => {
      try {
        const response = await dropService.getDrops();
        console.log(response);
        if (response?.error.num === 0) {
          setDrops(response)
        }
      } catch (error) {
        fireAlert("Oops, an error ocurred", error.message, '500px');
      }
    })()

  }, [reloadDrops])

  return (
    <NftData.Provider
      value={{
        setNft, setNftForOpen, setReloadMarket, setReloadCollection, setReloadDrops,
        nftMarket, nftSelected, nftToOpen, userCollection, characterMaxStats, weaponMaxStats, drops,
        reloadMarket, reloadCollection, reloadDrops
      }}
    >
      {children}
    </NftData.Provider>
  );
};

export default NftProvider;