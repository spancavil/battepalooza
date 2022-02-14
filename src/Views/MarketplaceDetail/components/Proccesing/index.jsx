<<<<<<< HEAD
import React, { useEffect } from 'react'
=======
import React, { useContext, useEffect, useState } from 'react'
import { UserData } from '../../../../Context/UserProvider';
>>>>>>> Integration with API (collection detail, unregister from market and buy in marketplace)
import Modal from '../../../../Global-Components/Modal';
import marketService from '../../../../Services/market.service';
import styles from './styles.module.scss';
<<<<<<< HEAD
import { sendAmplitudeData } from '../../../../Utils/amplitude';

const Proccesing = ({nftBuy, handleClose}) => {

  useEffect(()=> {
    setTimeout(()=> {
      //Hardcodeamos el time. Acá iría la llamada a la API
      handleClose(false);
      sendAmplitudeData('Buy Confirmation Marketplace')
    }, 2000)
  }, [handleClose])

    return (
        <div className={styles.parentContainerModal}>
          <Modal title="Proccesing" handleClose={()=>("No hace nada")}>
            <h3 className={styles.textDrop}> {nftBuy.itemName} is being transferred. Please wait while the transfer is being completed
            </h3>
            <img src={nftBuy.thumbnailUrl} alt="nftToBuy"
            style={{
              paddingBottom: 15
            }}
            />
          </Modal>
        </div>
    )
=======
import { logOutAmplitude } from '../../../../Utils/amplitude';
import { useHistory } from 'react-router-dom';
import fireToast, { fireAlertAsync } from '../../../../Utils/sweetAlert2';
import { fireAlert } from '../../../../Utils/sweetAlert2';

const Proccesing = ({nftBuy, handleClose}) => {

  const [status, setStatus] = useState("");
  const [forteTxText, setForteTxText] = useState("");

  const {userData} = useContext(UserData);

  const history = useHistory();
  //Paso uno, hacemos la compra, y forte nos devuelve el Id de la tx
  useEffect(()=> {
    const buyNft = async () => {
      if (Object.keys(userData).length !== 0){
        console.log("Holaaa!");
        console.log(userData);
        try {
          const response = await marketService.buyProductMarketplace(
            userData.pid,
            nftBuy.sellerPid,
            nftBuy.uniqueId,
            userData.bpToken,
          )
          console.log(response);
          if (response.error.text !== "") {
            if (response.error.text.includes("authorized")) {
              fireAlertAsync("Warning","Session expired, please login again.")
              .then(()=> {
                localStorage.removeItem("userBP");
                logOutAmplitude();
                history.push("/");
                //window.location.reload();
              })

            } else {
              fireAlert("Oops, an error ocurred", response.error.text, '500px');
            }
          //No errors, the forte transaction text id is returned. With that text
          //we call the transaction status in the next step (modal register 2)
          } else {
            console.log(`Response on buy: ${response}`);
            setForteTxText(response.forteTxId);
          }
          
        } catch (error) {
          fireAlert("Oops, an error ocurred", error.message, '500px');
        }
      }
      
    }
    buyNft()

  }, [userData, setForteTxText, history, nftBuy])

  //Paso 2, con el id de la tx vamos haciendo la consulta del status de la operación
  useEffect(()=> {
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
              fireToast("Session expired, please login again.");
              localStorage.removeItem("userBP");
              logOutAmplitude();
              history.push("/");
              window.location.reload();
            } else {
              setStatus("Oops, an error ocurred", response.error.text, '500px');
            }
          } else {
          //Response OK, no errors
            console.log(`Status on proccessing: ${response.status}`);
            setStatus(response.status);
          }
        } catch (error) {
          setStatus("Oops, an error ocurred", error.message, '500px');
        }
      }

    //We call the status of the transaction in forte each 0.5 secs
    forteStatusInterval = setInterval(getStatusForte, 500);
      if (status === "completed") {
        clearInterval(forteStatusInterval)
      }
    }
    //Interval clear at component will unmount
    return ()=> {
      clearInterval(forteStatusInterval)
    }
  }, [forteTxText, userData, history, status])

  /* setTimeout(()=> {
    //Hardcodeamos el time
    handleClose(false);
  }, 2000) */

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
>>>>>>> Integration with API (collection detail, unregister from market and buy in marketplace)
}

export default Proccesing
