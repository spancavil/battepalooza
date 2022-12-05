import React from "react";
import styles from "./styles.module.scss";
import useTransactionNft from "../../../../Hooks/useTransactionNft";
import ModalV2 from "../../../../Global-Components/ModalV2";
import ButtonAnimated from "../../../../Global-Components/ButtonAnimated";

const Proccesing = ({ nftBuy, handleClose, proccessingComplete }) => {
    const [status, error] = useTransactionNft({
        buyMarket: true,
        nft: nftBuy,
        processingComplete: proccessingComplete,
        handleClose: handleClose,
    });

    console.log(status, error);

    return (
        <div className={styles.parentContainerModal}>
            <ModalV2
                title={
                    status !== "error" && status !== "completed"
                        ? "Processing"
                        : status
                }
            >
                <h3 className={styles.textDrop}>
                    {status !== "error" ? (
                        <span>
                            {nftBuy?.packName} is being transferred. Please wait
                            while the transfer is being completed
                        </span>
                    ) : (
                        <span>{error}</span>
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
