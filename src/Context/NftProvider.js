import { createContext, useState, useEffect, useContext } from "react";
import dropService from "../Services/drop.service";
import marketService from "../Services/market.service";
import nftService from "../Services/nft.service";
import { fireAlert } from "../Utils/sweetAlert2";
import { UserData } from "./UserProvider";
import staticsService from '../Services/getstatics.service';
// import changeDropUrl from "../Utils/changeDropURL";

export const NftData = createContext({});

const NftProvider = ({ children }) => {
  const { userData } = useContext(UserData);
  const [nftMarket, setNftMarket] = useState([]);
  const [nftSelected, setNftSelected] = useState({});
  const [nftToOpen, setNftToOpen] = useState({});
  const [userCollection, setUserCollection] = useState([]);
  const [loadingUserCollection, setLoadingUserCollection] = useState(true);
  const [drops, setDrops] = useState([]);

  const [reloadMarket, setReloadMarket] = useState(false);
  const [reloadCollection, setReloadCollection] = useState(false);
  const [reloadDrops, setReloadDrops] = useState(false);

  const [nftStatic, setNftStatic] = useState([]);
  const [clanStatic, setClanStatic] = useState([]);
  const [rarityStatic, setRarityStatic] = useState([]);
  const [repIdStatic, setRepIdStatic] = useState([]);
  const [premiumStatic, setPremiumStatic] = useState([]);

  const characterMaxStats = {
    maxHealth: 3312,
    maxEnergyRecovery: 15,
    maxMoveSpeed: 11,
  };

  const weaponMaxStats = {
    maxDamage: 726,
    maxCoolDown: 40,
  };

  const BP_BASE_URL = process.env.REACT_APP_API_BATTLEPALOOZA;

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
            setLoadingUserCollection(false);
          }
        }
      } catch (error) {
        fireAlert("Oops, an error ocurred", error.message, "500px");
        setLoadingUserCollection(false);
      }
    })();
  }, [userData, reloadCollection]);

  useEffect(() => {
    //Get marketplace collection
    (async () => {
      try {
        const marketCollection = await marketService.getNftMarketplaceList();
        if (marketCollection?.error.num === 0) {
          setNftMarket(marketCollection.products);
        }
      } catch (error) {
        fireAlert("Oops, an error ocurred", error.message, "500px");
      }
    })();
  }, [reloadMarket]);

  useEffect(() => {
    //Get drops
    (async () => {
      try {
        const response = await dropService.getDrops();

        if (response?.error.num === 0) {
          // response.mainDrop.bigBannerUrl = changeDropUrl(BP_BASE_URL, response.mainDrop?.bigBannerUrl)
          // response.mainDrop.mediumBannerUrl = changeDropUrl(BP_BASE_URL, response.mainDrop?.mediumBannerUrl)
          // response.mainDrop.smallBannerUrl = changeDropUrl(BP_BASE_URL, response.mainDrop?.smallBannerUrl)
          setDrops(response)
        }
      } catch (error) {
        fireAlert("Oops, an error ocurred", error.message, "500px");
      }
    })();
  }, [reloadDrops, BP_BASE_URL]);

  // Get static JSON's data from Battlepalooza API
  useEffect(() => {
    (async () => {
      try {
        const nftStatic = await staticsService.getNftData();
        // Add BASE_URL to all links
        for (const nft of nftStatic) {
          nft.icon = BP_BASE_URL + nft.icon;
          nft.movieClip = BP_BASE_URL + nft.movieClip;
          nft.shopIcon = BP_BASE_URL + nft.shopIcon;
          nft.thumbnail = BP_BASE_URL + nft.thumbnail;
          nft.bigIcon = BP_BASE_URL + nft.bigIcon;
        }
        const staticClans = await staticsService.getClans();
        const staticRarity = await staticsService.getRarity();
        const staticRepId = await staticsService.getRepId();
        const premium = await staticsService.getPremium();
        setNftStatic(Object.values(nftStatic));
        setClanStatic(Object.values(staticClans));
        setRarityStatic(Object.values(staticRarity));
        setRepIdStatic(Object.values(staticRepId));
        setPremiumStatic(Object.values(premium));
      } catch (error) {
        fireAlert("Oops, an error ocurred", error.message, "500px");
      }
    })();
  }, [BP_BASE_URL]);

  // const nftMarketModified = useModifyList(nftMarket, nftStatic, clanStatic, rarityStatic, repIdStatic);

  return (
    <NftData.Provider
      value={{
        setNft,
        setNftForOpen,
        setReloadMarket,
        setReloadCollection,
        setReloadDrops,
        nftMarket,
        nftSelected,
        nftToOpen,
        userCollection,
        characterMaxStats,
        weaponMaxStats,
        drops,
        reloadMarket,
        reloadCollection,
        reloadDrops,
        nftStatic,
        clanStatic,
        rarityStatic,
        repIdStatic,
        premiumStatic,
        loadingUserCollection
      }}
    >
      {children}
    </NftData.Provider>
  );
};

export default NftProvider;
