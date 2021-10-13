import { createContext, useState, useEffect } from "react";
import img from "../Assets/sprites/cardnft01.png";

export const NftData = createContext({});

const NftProvider = ({ children }) => {
  const [nfts, setNfts] = useState([]);
  const [nftSelected, setNftSelected] = useState({});
  const [nftToOpen, setNftToOpen] = useState({});

  const setNft = (nft) => {
    setNftSelected(nft);
  };

  const setNftForOpen = (nft) => {
    setNftToOpen(nft);
  };

  useEffect(() => {
    //Nft hardcoded
    setNfts([
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
    ]);
  }, []);

  return (
    <NftData.Provider
      value={{ setNft, setNftForOpen, nfts, nftSelected, nftToOpen }}
    >
      {children}
    </NftData.Provider>
  );
};

export default NftProvider;
