import React, { useEffect, useState, useContext } from "react";
import styles from "./styles.module.scss";
import marketService from "../../../../Services/market.service";
import { useHistory } from "react-router-dom";
import { NftData } from "../../../../Context/NftProvider";
import checkErrorMiddleware from "../../../../Utils/checkErrorMiddleware";
import ModalV2 from "../../../../Global-Components/ModalV2";
import ButtonRounded from "../../../../Global-Components/ButtonRounded";
import ButtonAnimated from "../../../../Global-Components/ButtonAnimated";

const ModalRegister2 = ({
  setmodalRegister2,
  handleMarket,
  forteTxText,
  bpToken,
  pid,
  setReloadDetail,
}) => {
  const [status, setStatus] = useState("");
  const [transactionType, setTransactionType] = useState("");
  const history = useHistory();
  const { setReloadCollection } = useContext(NftData);

  useEffect(() => {
    const getStatusForte = async () => {
      console.log(`Forteid: ${forteTxText}, Status: ${status}`);

      try {
        const response = await marketService.getTransactionStatus(
          pid,
          forteTxText,
          bpToken
        );
        const canContinue = checkErrorMiddleware(response, history);
        if (canContinue) {
          //Response OK, no errors
          setStatus(response.status);
          setTransactionType(response.txType);
        }
      } catch (error) {
        setStatus("Oops, an error ocurred", error.message, "500px");
      }
    };

    //We call the status of the transaction in forte each 0.5 secs
    const forteStatusInterval = setInterval(getStatusForte, 500);
    if (status !== "pending" && status !== "") {
      clearInterval(forteStatusInterval);
    }
    //Interval clear at component will unmount
    return () => {
      clearInterval(forteStatusInterval);
    };
  }, [forteTxText, status, bpToken, history, pid]);

  const handleCloseModal = () => {
    setReloadCollection((value) => !value);
    setReloadDetail((value) => !value);
    setmodalRegister2(false);
  };

  return (
    <div className={styles.parentContainerModal}>
      <ModalV2
        title="Confirmation"
        handleClose={() => setmodalRegister2(false)}
      >
        {status === "completed" ? (
          <>
            <h3 className={styles.textDrop}>
              The NFT has been {transactionType.includes("delete") && "un"}
              registered for sale in the Marketplace
            </h3>
            <div className={styles.buttonsContainer}>
              <ButtonRounded title="MARKETPLACE" onClick={handleMarket} />
              <ButtonRounded
                title="CONFIRM"
                onClick={() => handleCloseModal()}
              />
            </div>
          </>
        ) : (
          <div className={styles.buttonAnimated}>
            <ButtonAnimated content={status} />
          </div>
        )}
      </ModalV2>
    </div>
  );
};

export default ModalRegister2;
