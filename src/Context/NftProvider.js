import { createContext, useState, useEffect, useContext } from "react";
import nftService from "../Services/nft.service";
import { UserData } from "./UserProvider";
export const NftData = createContext({});

const NftProvider = ({ children }) => {

  const {userData} = useContext(UserData);
  const [nfts, setNfts] = useState([]);
  const [userNft, setUserNft] = useState([])
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

  const setNftPrice = (nft, priceAssigned, seller, sale) => {
    const nftToSet = userCollection.find(element => element.uuid === nft.uuid);
    //Asignación de parámetros
    Object.defineProperty(nftToSet, 'price', {
      configurable: true,
      enumerable: true,
      writable: true,
      value: priceAssigned,
    })
    Object.defineProperty(nftToSet, 'seller', {
      configurable: true,
      enumerable: true,
      writable: true,
      value: seller,
    })
    Object.defineProperty(nftToSet, 'inMarket', {
      configurable: true,
      enumerable: true,
      writable: true,
      value: sale,
    })

    Object.defineProperty(nft, 'price', {
      configurable: true,
      enumerable: true,
      writable: true,
      value: priceAssigned,
    })
    Object.defineProperty(nft, 'seller', {
      configurable: true,
      enumerable: true,
      writable: true,
      value: seller,
    })
    Object.defineProperty(nft, 'inMarket', {
      configurable: true,
      enumerable: true,
      writable: true,
      value: sale,
    })
    setUserNft([...userCollection]);
    return (nft)
  }

  useEffect (()=> {

    (async() => {

      if (Object.keys(userData).length !== 0){
        const userCollection = await nftService.getNftCollection(userData);
        //Luego este setUserCollection debería settearse con los datos reales que vienen de la API
        if (userCollection.nfts){
          setUserCollection(userCollection.nfts);
        }
      }

    })()

  }, [userData])

  useEffect(() => {

    (async ()=>{
      const nfts = await nftService.getNfts();

      //Seteamos los NFT del usuario (hardcoded)
      setUserNft([{...nfts[2]} , {...nfts[4]}])

      setNfts(nfts);
    })()
    //Nft hardcoded
    /* setNfts([
      {
        id: 1,
        imgSrc: img,
        description: {
          text1: "Series 1",
          text2: "Tron Warrior",
        },
        content: ["1 rare skin", "2 common skin"],
        price: 100000,
        stock: 300,
        soldOut: false,
        sale: false,
      },
      {
        id: 2,
        imgSrc: img,
        description: {
          text1: "Series 1",
          text2: "Tron Warrior",
        },
        content: ["1 rare skin", "2 common skin"],
        price: 100000,
        stock: 300,
        soldOut: false,
        sale: true,
      },
      {
        id: 3,
        imgSrc: img,
        description: {
          text1: "Series 1",
          text2: "Tron Warrior",
        },
        content: ["1 rare skin", "2 common skin"],
        price: 100000,
        stock: 300,
        soldOut: false,
        sale: false,
      },
      {
        id: 4,
        imgSrc: img,
        description: {
          text1: "Series 1",
          text2: "Tron Warrior",
        },
        content: ["1 rare skin", "2 common skin"],
        price: 100000,
        stock: 300,
        soldOut: false,
        sale: true,
      },
    ]); */

  }, []);

  return (
    <NftData.Provider
      value={{ setNft, setNftForOpen, setNftPrice,
        nfts, userNft, nftSelected, nftToOpen, userCollection, characterMaxStats, weaponMaxStats}}
    >
      {children}
    </NftData.Provider>
  );
};

export default NftProvider;