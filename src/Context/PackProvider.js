import { createContext, useState, useEffect, useContext } from "react";
import image1 from "../Assets/sprites/cardpack01.png";
import image2 from "../Assets/sprites/cardpack02.png";
import image4 from "../Assets/sprites/cardpack04.png";
import packService from "../Services/pack.service";
import { fireAlert } from "../Utils/sweetAlert2";
import { MaintenanceData } from "./MaintenanceProvider";
import { UserData } from "./UserProvider";

export const PackData = createContext({});

const PackDataProvider = ({ children }) => {

  const { userData } = useContext(UserData);
  const { setMaintenance } = useContext(MaintenanceData);

  const [packs, setPacks] = useState([]);
  const [packSelected, setPackSelected] = useState({});
  const [packToOpen, setPackToOpen] = useState({});
  const [packData, setPackData] = useState(null);
  const [txResult, setTxResult] = useState({});

  const PACKS_AVAILABLE_TO_BUY = ['x1', 'x5', 'x10'];

  const setPack = (pack) => {
    setPackSelected(pack);
  };

  const setPackForOpen = (pack) => {
    setPackToOpen(pack);
  };

  const setTxResultPackBuy = (tx) => {
    setTxResult(tx);
  } 

  useEffect(() => {
    //Cards hardcoded
    setPacks([
      {
        id: 1,
        imgSrc: image1,
        description: {
          text1: "Rare Series 1 Release",
          text2: "1 - DROP 1",
          text3: "2,00 PACK",
        },
        content: ["1 rare skin", "2 common skin"],
        price: 100000,
        stock: 300,
        soldOut: false,
        sale: true,
      },
      {
        id: 2,
        imgSrc: image2,
        description: {
          text1: "Rare Series 1 Release",
          text2: "1 - DROP 1",
          text3: "2,00 PACK",
        },
        content: ["1 rare skin", "2 common skin"],
        price: 200000,
        stock: 255,
        soldOut: true,
        sale: false,
      },
      {
        id: 4,
        imgSrc: image4,
        description: {
          text1: "Rare Series 1 Release",
          text2: "1 - DROP 1",
          text3: "2,00 PACK",
        },
        content: ["1 rare skin", "2 common skin"],
        price: 300000,
        stock: 450,
        soldOut: false,
        sale: false,
      },
      {
        id: 3,
        imgSrc: image2,
        description: {
          text1: "Rare Series 1 Release",
          text2: "1 - DROP 1",
          text3: "2,00 PACK",
        },
        content: ["1 rare skin", "2 common skin"],
        price: 200000,
        stock: 255,
        soldOut: true,
        sale: false,
      },
    ]);
    (async () => {
      //Get user packs
      try {
          const packData = await packService.getNftPackInfo()
          if (packData?.maintenance) {
            setMaintenance(packData.maintenance);
          }

          if (!packData.maintenance) {
            setMaintenance(false)
          }

          if (packData?.error?.num === 0) {
            setPackData(packData)
          } else {
            fireAlert("Oops, an error ocurred", packData?.error?.message, "500px");
          }
        
      } catch (error) {
        fireAlert("Oops, an error ocurred", error.message, "500px");
      }

    })()
  }, [userData, setMaintenance]);

  return (
    <PackData.Provider
      value={{ setPack, setPackForOpen, setTxResultPackBuy, packs, packSelected, packToOpen, packData, txResult, PACKS_AVAILABLE_TO_BUY }}
    >
      {children}
    </PackData.Provider>
  );
};

export default PackDataProvider;
