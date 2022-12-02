import React, { useContext } from "react";
import styles from "./styles.module.scss";
import { useHistory } from "react-router-dom";
import { NftData } from "../../../../Context/NftProvider";
import ModalV2 from "../../../../Global-Components/ModalV2";
import ButtonRounded from "../../../../Global-Components/ButtonRounded";
import ButtonAnimated from "../../../../Global-Components/ButtonAnimated";
import useTransactionNft from "../../../../Hooks/useTransactionNft";

const Proccessing = ({
  setProccesing,
  nft,
  setReloadDetail,
  register = false,
  unRegister = false,
  inputPrice = 0,
}) => {

  const history = useHistory();
  const { setReloadCollection } = useContext(NftData);

  const [status, error] = useTransactionNft({
    unregisterMarket: unRegister,
    registerMarket: register,
    nft: nft,
    inputPrice: inputPrice
  })

  const handleCloseModal = () => {
    setReloadCollection((value) => !value);
    setReloadDetail((value) => !value);
    setProccesing(false);
  };

  const handleMarket = () => {
    setReloadCollection((value) => !value);
    history.push("/marketplace");
  };

  console.log(status);

  return (
    <div className={styles.parentContainerModal}>
      <ModalV2
        title="Confirmation"
        handleClose={() => setProccesing(false)}
      >
          <h3 className={styles.textDrop}>
            {!status ?
            <>Loading...</>
            :status === "completed" 
              ?
              <>The NFT has been {register? "" : "un"}registered for sale in the Marketplace.</>
              : status === "pending"
                ? <>The NFT is being {register? "" : "un"}registered. Please wait.</>
                : <>{error}</>
            }
          </h3>
          <div className={styles.buttonAnimated}>
            <ButtonAnimated content={status} />
          </div>
          {status === "completed" 
            ? <div className={styles.buttonsContainer}>
              <ButtonRounded title="MARKETPLACE" onClick={handleMarket} />
              <ButtonRounded
                title="CONFIRM"
                onClick={() => handleCloseModal()}
              />
            </div>
            : null
          }
      </ModalV2>
    </div>
  );
};

export default Proccessing;
