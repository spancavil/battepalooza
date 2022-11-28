import { useState } from "react";
import { useHistory } from "react-router-dom";
import ButtonAnimated from "../../../../Global-Components/ButtonAnimated";
import ButtonRounded from "../../../../Global-Components/ButtonRounded";
import ModalV2 from "../../../../Global-Components/ModalV2";
import useTransactionNft from "../../../../Hooks/useTransactionNft";

import styles from "./styles.module.scss";

const ModalBurnNft = ({ closeModal, nft, setReloadCollection }) => {
  const [trigger, setTrigger] = useState(false);
  const [status, error] = useTransactionNft({
    burnNft: true,
    nft: nft,
    trigger,
  });

  console.log(status);

  const history = useHistory();

  const onClose = () => {
    if (status === "completed") {
      setReloadCollection((value) => !value);
      history.push("/collection");
    }
    if (!trigger) {
      closeModal(false);
    }
  };

  const onConfirm = () => {
    setTrigger(true);
  };

  return (
    <div className={styles.parentContainerModal}>
      <ModalV2 title="Burn NFT" handleClose={onClose}>
        <h3 className={styles.textDrop}>
          {!status && !trigger ? (
            "Are you sure to burn this NFT?"
          ) : status === "pending" ? (
            <>
              {nft?.itemName} is being burned. Please wait while the burn
              process completes.
            </>
          ) : status === "completed" ? (
            <>
              {nft?.itemName} burn process completed. You can close this window.
            </>
          ) : (
            <>{error}</>
          )}
        </h3>
        {!trigger ? (
          <div className={styles.buttonsContainer}>
            <ButtonRounded title="CONFIRM" onClick={onConfirm} />
            <ButtonRounded title="CANCEL" onClick={onClose} />
          </div>
        ) : (
          <div className={styles.buttonAnimatedContainer}>
            <ButtonAnimated content={status} onClick={onClose} />
          </div>
        )}
      </ModalV2>
    </div>
  );
};

export default ModalBurnNft;
