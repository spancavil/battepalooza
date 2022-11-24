import React, { useContext, useEffect, useState } from "react";
import { UserData } from "../../../../Context/UserProvider";
import marketService from "../../../../Services/market.service";
import styles from "./styles.module.scss";
import { logOutAmplitude } from "../../../../Utils/amplitude";
import { useHistory } from "react-router-dom";
import { fireAlertAsync } from "../../../../Utils/sweetAlert2";
import ModalV2 from "../../../../Global-Components/ModalV2";
import ButtonAnimated from "../../../../Global-Components/ButtonAnimated";
import useTransactionNft from "../../../../Hooks/useTransactionNft";

const Proccesing = ({ nftBuy, handleClose, proccessingComplete }) => {
  /* const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const [forteTxText, setForteTxText] = useState("");

  const { userData } = useContext(UserData);

  const history = useHistory(); */

  const [status, error, forteTxText] = useTransactionNft(
    {buyMarket: true},
    0,
    {},
    nftBuy,
    proccessingComplete,
    handleClose
  )

  //Paso uno, hacemos la compra, y forte nos devuelve el Id de la tx
/*   useEffect(() => {
    const buyNft = async () => {
      console.log("Trata de hacer la compra");
      //Si el forteTxText es distinto a "" significa que no tenemos que hacer la compra nuevamente
      if (status === "") {
        if (Object.keys(userData).length !== 0) {
          try {
            const response = await marketService.buyProductMarketplace(
              userData.pid,
              nftBuy.sellerPid,
              nftBuy.uniqueId,
              userData.bpToken
            );
            if (response.error.text !== "") {
              if (response.error.text.includes("authorized")) {
                fireAlertAsync(
                  "Warning",
                  "Session expired, please login again."
                ).then(() => {
                  localStorage.removeItem("userBP");
                  logOutAmplitude();
                  history.push("/");
                  //window.location.reload();
                });
              } else {
                setStatus("error");
                setError(response?.error?.text);
              }
              //No errors, the forte transaction text id is returned. With that text
              //we call the transaction status in the next step (modal register 2)
            } else {
              setForteTxText(response.forteTxId);
            }
          } catch (error) {
            setStatus("error");
            setError(error?.message);
          }
        }
      }
    };

    buyNft();
  }, [userData, setForteTxText, history, nftBuy, handleClose, status]); */

  //Paso 2, con el id de la tx vamos haciendo la consulta del status de la operación
  /* useEffect(() => {
    let forteStatusInterval;
    if (forteTxText !== "" && Object.keys(userData).length !== 0) {
      console.log(`Forteid: ${forteTxText}, Status: ${status}`);

      const getStatusForte = async () => {
        try {
          const response = await marketService.getTransactionStatus(
            userData.pid,
            forteTxText,
            userData.bpToken
          );
          if (response.error.text !== "") {
            if (response.error.text.includes("authorized")) {
              fireAlertAsync(
                "Warning",
                "Session expired, please login again."
              ).then(() => {
                localStorage.removeItem("userBP");
                logOutAmplitude();
                history.push("/");
                window.location.reload();
              });
            } else {
              setStatus("error");
              setError(response?.error?.text);
            }
          } else {
            //Response OK, no errors
            setStatus(response.status);
          }
        } catch (error) {
          setStatus("error");
          setError(error?.message);
        }
      };

      //We call the status of the transaction in forte each 0.5 secs
      forteStatusInterval = setInterval(getStatusForte, 500);
      if (status !== "pending" && status !== "") {
        clearInterval(forteStatusInterval);
        setTimeout(() => {
          proccessingComplete();
        }, 5000);
      }
    }
    //Interval clear at component will unmount
    return () => {
      clearInterval(forteStatusInterval);
    };
  }, [
    forteTxText,
    userData,
    history,
    status,
    handleClose,
    proccessingComplete,
  ]); */

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
              {nftBuy?.packName} is being transferred. Please wait while the
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
