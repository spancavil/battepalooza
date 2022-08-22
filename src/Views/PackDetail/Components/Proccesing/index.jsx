import React, { useContext, useEffect, useState } from 'react'
import { UserData } from '../../../../Context/UserProvider';
import Modal from '../../../../Global-Components/Modal';
import styles from './styles.module.scss';
import { logOutAmplitude } from '../../../../Utils/amplitude';
import { useHistory } from 'react-router-dom';
import { fireAlertAsync } from '../../../../Utils/sweetAlert2';
import dropService from '../../../../Services/drop.service';

const Proccesing = ({ packBuy, handleClose, processingComplete }) => {

  const [status, setStatus] = useState("");
  const [forteTxText, setForteTxText] = useState("");
  const [step1, setStep1] = useState(true); //payCoin
  const [step2, setStep2] = useState(false); //getBlockchainTxStatus
  const [step3, setStep3] = useState(false); //buyShop
  const [step4, setStep4] = useState(false); //getBlockchainTxStatus

  const { userData } = useContext(UserData);

  const history = useHistory();
  //Paso uno, hacemos la compra, y forte nos devuelve el Id de la tx
  useEffect(() => {

    const payCoin = async () => {
      //Solo entra en caso de estar en el paso 1
      if (step1) {
        console.log("Step 1. PayNcoin");
        if (Object.keys(userData).length !== 0) {
          try {
            const response = await dropService.payCoin(
              userData.pid,
              packBuy.id,
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
            //Si no hay errores seteamos el forteTxId para el paso 2.
            } else {
              setForteTxText(response.forteTxId);
              setStep1(false);
              setStep2(true)
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

    payCoin()

  }, [userData, setForteTxText, history, packBuy, handleClose, step1])

  //Paso tres, hacemos la compra con el texto que nos había devuelto en el paso 1
  //Lueg Forte nos devuelve un NUEVO texto con el Id de la tx
  useEffect(() => {

    if (step3) {
      const buyShop = async () => {
        console.log("Step 3. Buy shop");
        console.log(`Forteid: ${forteTxText}, Status: ${status}`);

        if (Object.keys(userData).length !== 0 && status.includes("waitNextTx")) {
          try {
            const response = await dropService.buyShop(
              forteTxText,
              userData.pid,
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

            } else {
              //Si no hay errores setteamos el NUEVO forteTxId para el paso 4.
              setStep3(false);
              setStep4(true);
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

      buyShop()

    }

  }, [userData, setForteTxText, history, handleClose, step3, status, forteTxText])

  //Paso 2 o paso 4
  //Con el id de la tx vamos haciendo la consulta del status de la operación en la blockchain.
  useEffect(() => {

    let forteStatusInterval;
    if (forteTxText !== "" && Object.keys(userData).length !== 0 && (step2 || step4)) {
      console.log(`Step 2 or 4. Get forte tx. Step2: ${step2}, Step4: ${step4}`);
      console.log(`Forteid: ${forteTxText}, Status: ${status}`);

      const getStatusForte = async () => {
        try {
          const response = await dropService.getTransactionStatus(
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
      setTimeout(() => {
        if (status !== "pending" && status !== "") {
          clearInterval(forteStatusInterval)
          if (step2) {
            setStep2(false)
            setStep3(true)
          }
          if (step4 && status === "completed") {
            setTimeout(() => {
              processingComplete()
            }, 3000)
          }
        }
      }, 1000)
    }
    //Interval clear at component will unmount
    return () => {
      clearInterval(forteStatusInterval);
    }
  }, [forteTxText, userData, history, status, handleClose, processingComplete, step2, step4])

  return (
    <div className={styles.parentContainerModal}>
      {/* Evitar el cerrado durante el proceso */}
      <Modal title="Proccesing" handleClose={ (status !== ("pending" || "")) && step4 ? handleClose : null}>
        <h3 className={styles.textDrop}> {packBuy.packName} is being transferred. Please wait while the transfer is being completed
        </h3>
        <h3 className={styles.textDrop}>Status: {status}</h3>
        <img src={packBuy.thumbnailUrl} alt="nftToBuy"
          style={{
            paddingBottom: 15
          }}
        />
      </Modal>
    </div>
  )
}

export default Proccesing
