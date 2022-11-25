import React from "react";
import styles from "./styles.module.scss";
import ModalV2 from "../../../../Global-Components/ModalV2";
import ButtonAnimated from "../../../../Global-Components/ButtonAnimated";
import useTransactionNft from "../../../../Hooks/useTransactionNft";

const Proccesing = ({ packBuy, handleClose, processingComplete }) => {
  const [status, error] = useTransactionNft({
    buyPack: true,
    packBuy: packBuy,
    handleClose: handleClose,
    processingComplete: processingComplete,
  });

  return (
    <div className={styles.parentContainerModal}>
      <ModalV2
        title={
          status !== "error" && status !== "completed" ? "Processing" : status
        }
      >
        <h3 className={styles.textDrop}>
          {status !== "error" ? (
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
