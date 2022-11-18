import React, { useContext, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { NftData } from "../../Context/NftProvider";
import { UserData } from "../../Context/UserProvider";
import Background from "../../Global-Components/Background";
import nftService from "../../Services/nft.service";
import ModalRegister1 from "./Components/ModalRegister1";
import ModalRegister2 from "./Components/ModalRegister2";
import ModalUnregister from "./Components/ModalUnregister";

import useModifyDetail from "../../Hooks/useModifyDetail";

import checkErrorMiddleware from "../../Utils/checkErrorMiddleware";
import marketService from "../../Services/market.service";
import fireToast, { fireAlert } from "../../Utils/sweetAlert2";
import { sendAmplitudeData } from "../../Utils/amplitude";
import NftDetailV2 from "../../Global-Components/NftDetailV2";
import { MaintenanceData } from "../../Context/MaintenanceProvider";

const CollectionDetail = () => {
  const [nftSelectedRaw, setNftSelectedRaw] = useState();
  // const [loading, setLoading] = useState(false);
  const [modalUnregister, setmodalUnregister] = useState(false);
  const [modalRegister1, setmodalRegister1] = useState(false);
  const [modalRegister2, setmodalRegister2] = useState(false);

  const [inputPrice, setInputPrice] = useState(0);
  const [forteTxText, setForteTxText] = useState("");
  /* const [position, setPosition] = useState({ positionX: "", positionY: "" });
    const [premium, setPremium] = useState(false); */

  const { userData } = useContext(UserData);
  const {
    nftStatic,
    clanStatic,
    rarityStatic,
    repIdStatic,
    premiumStatic,
    setReloadCollection,
  } = useContext(NftData);
  const { maintenance, setCheckMaintenance} = useContext(MaintenanceData)

  const [reloadDetail, setReloadDetail] = useState(false);

  const [fee, setFee] = useState(0);

  const { uuid } = useParams();
  const history = useHistory();
  /* 
  const desktop = useMediaQuery("(min-width: 799px) and (max-width: 1199px)");
  const hd = useMediaQuery("(min-width: 1200px)"); */

  /*   useEffect(() => {
    setLoading(true);
  }, []); */

  /*   const handleShowPremium = (e) => {
    console.log(e);
    setPosition({
      positionY: e.nativeEvent.offsetY,
    });
    setPremium(true);
  }; */

  //Modify data from JSON statics
  const nftSelected = useModifyDetail(
    nftSelectedRaw,
    nftStatic,
    clanStatic,
    rarityStatic,
    repIdStatic,
    premiumStatic
  );

  //Fire check maintenance
  useEffect(()=> {
    setCheckMaintenance(value => !value)
  }, [setCheckMaintenance])

  console.log(nftSelected);
  console.log(fee);

  useEffect(() => {
    const fetchData = async () => {
      if (Object.keys(userData).length !== 0) {
        try {
          const response = await nftService.getNftCollectionDetail(
            userData.bpToken,
            userData.pid,
            uuid
          );
          const canContinue = checkErrorMiddleware(response, history)
          if (canContinue) {
            setNftSelectedRaw(response.nft);
            setFee(response.feeRate);
          }
        } catch (error) {
          alert(error.message);
        }
      }
    };
    userData.email && fetchData();
  }, [uuid, userData, history, reloadDetail]);

  const openModalUnregister = () => {
    if (!maintenance) setmodalUnregister(true);
  };

  /*     const goBack = () => {
        history.goBack();
    }; */

  const onRegister = () => {
    if (!maintenance) setmodalRegister1(true);
  };

  const Register = () => {
    if (Number(inputPrice) > 10000) {
      const registerNft = async () => {
        try {
          const response = await marketService.registerProductMarketplace(
            userData.pid,
            nftSelected.uuid,
            inputPrice,
            userData.bpToken
          );

          const canContinue = checkErrorMiddleware(response, history);
          if (canContinue) {
            sendAmplitudeData("Collection place for sale confirm");
            setForteTxText(response.forteTxId);
            setmodalRegister1(false);
            setmodalRegister2(true);
          }
        } catch (error) {
          fireAlert("Oops, an error ocurred", error.message, "500px");
        }
      };

      registerNft();
    } else {
      fireToast("Price should be greater than 10000", 3000, "500px", "22px");
      return;
    }
  };

  const confirmUnregister = () => {
    const unRegisterNft = async () => {
      try {
        //Necesitamos obtener el NFT del market porque de ahí sacamos el uniqueId de Forte
        //Edit: ya no es necesario obtener esta info del marketplace
        /* console.log({nftMarket});
        const nftFromMarket = nftMarket.find(
          (nft) =>
            nft.itemName === nftSelected.itemName &&
            nft.sellerPid === userData.pid &&
            nft.serial === nftSelected.serial
        ); */

        const response = await marketService.cancelSellingMarketplace(
          userData.pid,
          nftSelected.uniqueId,
          userData.bpToken
        );

        const canContinue = checkErrorMiddleware(response, history);
        if (canContinue) {
          setForteTxText(response.forteTxId);
          setmodalUnregister(false);
          setmodalRegister2(true);
        }
      } catch (error) {
        fireAlert("Oops, an error ocurred", error.message, "500px");
      }
    };
    unRegisterNft();
    setReloadDetail(value => !value)
  };

  const handleMarket = () => {
    setReloadCollection((value) => !value);
    history.push("/marketplace");
  };

  const handleInputChange = (value) => {
    setInputPrice(parseInt(value));
  };

  /*   const handleShowClone = () => {
    console.log("show clone info");
  } */

  return (
    <>
      <Background>
        <NftDetailV2
          goBack="/collection"
          chosenNft={nftSelected}
          onRegister={onRegister}
          unRegister={openModalUnregister}
        />
      </Background>
      {modalUnregister && (
        <ModalUnregister
          setmodalUnregister={setmodalUnregister}
          confirmUnregister={confirmUnregister}
          name={nftSelected.itemName}
        />
      )}
      {modalRegister1 && (
        <ModalRegister1
          setmodalRegister1={setmodalRegister1}
          handleInputChange={handleInputChange}
          Register={Register}
          inputPrice={inputPrice}
        />
      )}
      {modalRegister2 && (
        <ModalRegister2
          setmodalRegister2={setmodalRegister2}
          handleMarket={handleMarket}
          setReloadDetail={setReloadDetail}
          forteTxText={forteTxText}
          bpToken={userData.bpToken}
          pid={userData.pid}
        />
      )}
    </>
  );
};

export default CollectionDetail;
