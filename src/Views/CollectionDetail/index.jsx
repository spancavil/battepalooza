import React, { useContext, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { NftData } from "../../Context/NftProvider";
import { UserData } from "../../Context/UserProvider";
import Background from "../../Global-Components/Background";
import nftService from "../../Services/nft.service";

import useModifyDetail from "../../Hooks/useModifyDetail";

import checkErrorMiddleware from "../../Utils/checkErrorMiddleware";
import NftDetail from "../MarketplaceDetailV2/components/NftDetail";

const CollectionDetail = () => {
  const [nftSelectedRaw, setNftSelectedRaw] = useState();
/*   const [loading, setLoading] = useState(false);
  const [modalUnregister, setmodalUnregister] = useState(false);
  const [modalRegister1, setmodalRegister1] = useState(false); */
/*   const [modalRegister2, setmodalRegister2] = useState(false); */
/* 
  const [inputPrice, setInputPrice] = useState(0); */
/*   const [forteTxText, setForteTxText] = useState("");
  const [position, setPosition] = useState({ positionX: "", positionY: "" });
  const [premium, setPremium] = useState(false); */

  const { userData } = useContext(UserData);
  const {
   

    nftStatic,
    clanStatic,
    rarityStatic,
    repIdStatic,
    premiumStatic,
  } = useContext(NftData);
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
  console.log(nftSelected);

  useEffect(() => {
    const fetchData = async () => {
      if (Object.keys(userData).length !== 0) {
        try {
          const response = await nftService.getNftCollectionDetail(
            userData.bpToken,
            userData.pid,
            uuid
          );
          const canContinue = checkErrorMiddleware(response, history);
          if (canContinue) {
            setNftSelectedRaw(response.nft);
          }
        } catch (error) {
          alert(error.message);
        }
      }
    };
    userData.email && fetchData();
  }, [uuid, userData, history]);

/*   const openModalUnregister = () => {
    setmodalUnregister(true);
  };

  const openModalRegister1 = () => {
    sendAmplitudeData("Collection place for sale request");
    setmodalRegister1(true);
  }; */

/*   const goBack = () => {
    history.goBack();
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
  }; */

/*   const confirmUnregister = () => {
    const unRegisterNft = async () => {
      try {
        //Necesitamos obtener el NFT del market porque de ahí sacamos el uniqueId de Forte
        const nftFromMarket = nftMarket.find(
          (nft) =>
            nft.itemName === nftSelected.itemName &&
            nft.sellerPid === userData.pid &&
            nft.serial === nftSelected.serial
        );
        const response = await marketService.cancelSellingMarketplace(
          userData.pid,
          nftFromMarket.uniqueId,
          userData.bpToken
        );

        const canContinue = checkErrorMiddleware(response, history);
        if (canContinue) {
          console.log(response);
          setForteTxText(response.forteTxId);
          setmodalUnregister(false);
          setmodalRegister2(true);
        }
      } catch (error) {
        fireAlert("Oops, an error ocurred", error.message, "500px");
      }
    };
    unRegisterNft();
  }; */

/*   const handleMarket = () => {
    setReloadMarket((value) => !value);
    setReloadCollection((value) => !value);
    history.push("/marketplace");
  };

  const handleInputChange = (value) => {
    setInputPrice(parseInt(value));
  }; */

  /*   const handleShowClone = () => {
    console.log("show clone info");
  } */


  return (
    <Background>
      <NftDetail goBack="/collection" chosenNft={nftSelected} />
    </Background>
  );
};

export default CollectionDetail;
