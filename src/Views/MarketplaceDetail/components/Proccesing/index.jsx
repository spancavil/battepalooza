import React, { useContext, useEffect, useState } from 'react'
import { UserData } from '../../../../Context/UserProvider';
import Modal from '../../../../Global-Components/Modal';
import marketService from '../../../../Services/market.service';
import styles from './styles.module.scss';
import { logOutAmplitude } from '../../../../Utils/amplitude';
import { useHistory } from 'react-router-dom';
import { fireAlertAsync } from '../../../../Utils/sweetAlert2';

const Proccesing = ({ nftBuy, handleClose, proccessingComplete }) => {

  const [status, setStatus] = useState("");
  const [forteTxText, setForteTxText] = useState("");

  const { userData } = useContext(UserData);

  const history = useHistory();
  //Paso uno, hacemos la compra, y forte nos devuelve el Id de la tx
  useEffect(() => {
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
              userData.bpToken,
            )
            if (response.error.text !== "") {
              if (response.error.text.includes("authorized")) {
                fireAlertAsync("Warning", "Session expired, please login again.")
                  .then(() => {
                    localStorage.removeItem("userBP");
                    logOutAmplitude();
                    history.push("/");
                    //window.location.reload();
                  })

              } else {
                fireAlertAsync("Oops, an error ocurred", response.error.text, '500px')
                  .then(() => {
                    handleClose()
                  });
              }
              //No errors, the forte transaction text id is returned. With that text
              //we call the transaction status in the next step (modal register 2)
            } else {
              setForteTxText(response.forteTxId);
            }

          } catch (error) {
            fireAlertAsync("Oops, an error ocurred", error?.message, '500px')
              .then(() => {
                handleClose()
              })
          }
        }
      }

    }

    buyNft()

  }, [userData, setForteTxText, history, nftBuy, handleClose, status])

  //Paso 2, con el id de la tx vamos haciendo la consulta del status de la operación
  useEffect(() => {
    let forteStatusInterval;
    if (forteTxText !== "" && Object.keys(userData).length !== 0) {
      console.log(`Forteid: ${forteTxText}, Status: ${status}`);

      const getStatusForte = async () => {
        try {
          const response = await marketService.getTransactionStatus(
            userData.pid,
            forteTxText,
            userData.bpToken,
          )
          if (response.error.text !== "") {
            if (response.error.text.includes("authorized")) {
              fireAlertAsync("Warning", "Session expired, please login again.")
                .then(() => {
                  localStorage.removeItem("userBP");
                  logOutAmplitude();
                  history.push("/");
                  window.location.reload();
                })
            } else {
              setStatus("Oops, an error ocurred:" + response.error.text);
              setTimeout(() => {
                handleClose();
              }, 3000)
            }
          } else {
            //Response OK, no errors
            //console.log(`Status on proccessing: ${response.status}`);
            setStatus(response.status);
          }
        } catch (error) {
          setStatus("Oops, an error ocurred: " + error.message);
          setTimeout(() => {
            handleClose();
          }, 3000)
        }
      }

      //We call the status of the transaction in forte each 0.5 secs
      forteStatusInterval = setInterval(getStatusForte, 500);
      if (status !== "pending" && status !== "") {
        clearInterval(forteStatusInterval)
        setTimeout(() => {
          proccessingComplete()
        }, 2000)
      }
    }
    //Interval clear at component will unmount
    return () => {
      clearInterval(forteStatusInterval);
    }
  }, [forteTxText, userData, history, status, handleClose, proccessingComplete])

  return (
    <div className={styles.parentContainerModal}>
      <Modal title="Proccesing" handleClose={handleClose}>
        <h3 className={styles.textDrop}> {nftBuy.itemName} is being transferred. Please wait while the transfer is being completed
        </h3>
        <h3 className={styles.textDrop}>Status: {status}</h3>
        <img src={nftBuy.thumbnailUrl} alt="nftToBuy"
          style={{
            paddingBottom: 15
          }}
        />
      </Modal>
    </div>
  )
}

export default Proccesing
