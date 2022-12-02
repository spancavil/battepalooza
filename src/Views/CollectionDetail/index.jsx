import React, { useContext, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { NftData } from "../../Context/NftProvider";
import { UserData } from "../../Context/UserProvider";
import Background from "../../Global-Components/Background";
import nftService from "../../Services/nft.service";
import ModalRegister1 from "./Components/ModalRegister1";
import Proccessing from "./Components/Proccessing";
import ModalUnregister from "./Components/ModalUnregister";

import useModifyDetail from "../../Hooks/useModifyDetail";

import checkErrorMiddleware from "../../Utils/checkErrorMiddleware";
import fireToast from "../../Utils/sweetAlert2";
import NftDetailV2 from "../../Global-Components/NftDetailV2";
import { MaintenanceData } from "../../Context/MaintenanceProvider";
import ModalBurnNft from "./Components/ModalBurnNft";

const CollectionDetail = () => {
  const [nftSelectedRaw, setNftSelectedRaw] = useState();
  // const [loading, setLoading] = useState(false);
  const [modalUnregister, setmodalUnregister] = useState(false);
  const [modalRegister1, setmodalRegister1] = useState(false);
  const [proccesing, setProccesing] = useState(false);
  const [modalBurnNft, setModalBurnNft] = useState(false);

  const [inputPrice, setInputPrice] = useState(0);
  const [register, setRegister] = useState(false);
  const [unRegister, setUnregister] = useState(false);
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
  const { maintenance } = useContext(MaintenanceData);

  const [reloadDetail, setReloadDetail] = useState(false);

  const [fee, setFee] = useState(0);

  const { uuid } = useParams();
  const history = useHistory();

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
  /* useEffect(() => {
    setCheckMaintenance((value) => !value);
  }, [setCheckMaintenance]); */

  useEffect(() => {
    const fetchData = async () => {
      if (Object.keys(userData).length !== 0) {
        try {
          const response = await nftService.getNftCollectionDetail(
            userData.bpToken,
            userData.pid,
            uuid
          );

          console.log(response);
          const canContinue = checkErrorMiddleware(response, history);
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

  const onRegister = () => {
    if (!maintenance) setmodalRegister1(true);
  };

  const Register = () => {
    if (Number(inputPrice) > nftSelected?.nftMinimumPrice) {
      setmodalRegister1(false)
      setRegister(true)
      setProccesing(true)
    } else {
      fireToast(`Price should be greater than ${nftSelected?.nftMinimumPrice}`, 3000, "500px", "22px");
      return;
    }
  };

  const confirmUnregister = () => {
    setmodalUnregister(false)
    setUnregister(true);
    setProccesing(true);
  };

  const handleInputChange = (value) => {
    setInputPrice(parseInt(value));
  };

  return (
    <>
      <Background>
        <NftDetailV2
          goBack="/collection"
          chosenNft={nftSelected}
          onRegister={onRegister}
          unRegister={openModalUnregister}
          openModalBurn={setModalBurnNft}
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
          fee={fee}
          minimunPrice={nftSelected?.nftMinimumPrice}
        />
      )}
      {proccesing && (
        <Proccessing
          nft={nftSelected}
          setProccesing={setProccesing}
          setReloadDetail={setReloadDetail}
          register={register}
          unRegister={unRegister}
          inputPrice={inputPrice}
        />
      )}
      {modalBurnNft && (
        <ModalBurnNft
          nft={nftSelected}
          closeModal={setModalBurnNft}
          setReloadCollection={setReloadCollection}
        />
      )}
    </>
  );
};

export default CollectionDetail;
