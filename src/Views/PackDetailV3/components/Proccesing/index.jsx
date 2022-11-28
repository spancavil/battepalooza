import React from "react";
import styles from "./styles.module.scss";
import ModalV2 from "../../../../Global-Components/ModalV2";
import ButtonAnimated from "../../../../Global-Components/ButtonAnimated";
import useTransactionNft from "../../../../Hooks/useTransactionNft";

const Proccesing = ({ packBuy, handleClose, processingComplete, quantity }) => {
  const [status, error] = useTransactionNft({
    buyPack: true,
    packBuy: packBuy,
    quantity: quantity,
    handleClose: handleClose,
    processingComplete: processingComplete,
  });

  console.log(status)

  return (
    <div className={styles.parentContainerModal}>
      <ModalV2
        title={
          status !== "error" && status !== "failed" && status !== "completed"
            ? "Processing"
            : status
        }
      >
        <h3 className={styles.textDrop}>
          {status !== "error" && status !== "failed" ? (
            <>
              {packBuy.packName} is being transferred. Please wait while the
              transfer is being completed
            </>
          ) : (
            <>{error}</>
          )}
        </h3>
        <div className={styles.buttonContainer}>
          <ButtonAnimated content={status} onClick={handleClose} />
        </div>
      </ModalV2>
    </div>
  );
};

export default Proccesing;
