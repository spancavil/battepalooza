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

  const setNft = (nft) => {
    setNftSelected(nft);
  };

  const setNftForOpen = (nft) => {
    setNftToOpen(nft);
  };

  const setNftPrice = (nft, priceAssigned, seller, sale) => {
    console.log('Entro a nft Price')
    const nftToSet = userNft.find(element => element.id === nft.id);
    console.log(nftToSet)
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
    setUserNft([...userNft]);
  }

  useEffect (()=> {

    (async() => {

      if (Object.keys(userData).length !== 0){
        console.log("Get collection on provider");
        const userCollection = await nftService.getNftCollection(userData);
        console.log(userCollection);

        //Luego este setUserCollection debería settearse con los datos reales que vienen de la API
        setUserCollection([]);
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
      value={{ setNft, setNftForOpen, setNftPrice, nfts, userNft, nftSelected, nftToOpen, userCollection}}
    >
      {children}
    </NftData.Provider>
  );
};

export default NftProvider;