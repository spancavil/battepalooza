import { useContext, useEffect, useState } from "react";
import { UserData } from "../../../../Context/UserProvider";
import styles from "./styles.module.scss";
import { logOutAmplitude } from "../../../../Utils/amplitude";
import { useHistory } from "react-router-dom";
import { fireAlertAsync } from "../../../../Utils/sweetAlert2";
import dropService from "../../../../Services/drop.service";
import { PackData } from "../../../../Context/PackProvider";
import ModalV2 from "../../../../Global-Components/ModalV2";
import ButtonAnimated from "../../../../Global-Components/ButtonAnimated";

const Proccesing = ({ packBuy, handleClose, processingComplete, quantity }) => {
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const [forteTxText, setForteTxText] = useState("");
  const [step1, setStep1] = useState(true); //buyShop
  const [step2, setStep2] = useState(false); //getBlockchainTxStatus
/*   const [step3, setStep3] = useState(false); 
  const [step4, setStep4] = useState(false); //getBlockchainTxStatus */

  const { userData } = useContext(UserData);
  const { setTxResultPackBuy } = useContext(PackData);

  const history = useHistory();
  //Paso uno, hacemos la compra, y la API nos devuelve el Id de la tx
  //para consultar en Forte
  useEffect(() => {
    const buyShopNft = async () => {
      //Solo entra en caso de estar en el paso 1
      if (step1) {
        console.log("Step 1. BuyShopNft");
        if (Object.keys(userData).length !== 0) {
          try {
            console.log(quantity);
            const response = await dropService.buyShop(
              packBuy.id,
              userData.pid,
              quantity,
              userData.bpToken,
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
                });
              } else {
                setStatus("error");
                setError(response?.error?.text);
              }
              //Si no hay errores seteamos el forteTxId para el paso 2.
            } else {
              setForteTxText(response.forteTxId);
              setStep1(false);
              setStep2(true);
            }
          } catch (error) {
            setStatus("error");
            setError(error?.message);
          }
        }
      }
    };

    buyShopNft();
  }, [
    userData,
    setForteTxText,
    history,
    packBuy,
    step1,
    quantity,
  ]);

  //Paso tres, hacemos la compra con el texto que nos había devuelto en el paso 1
  //Lueg Forte nos devuelve un NUEVO texto con el Id de la tx
/*   useEffect(() => {
    if (step3) {
      const buyShop = async () => {
        console.log("Step 3. Buy shop");
        console.log(`Forteid: ${forteTxText}, Status: ${status}`);

        if (
          Object.keys(userData).length !== 0 &&
          status.includes("waitNextTx")
        ) {
          try {
            const response = await dropService.buyShop(
              forteTxText,
              userData.pid,
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
                /* fireAlertAsync(
                  "Oops, an error ocurred",
                  response.error.text,
                  "500px"
                ).then(() => {
                  handleClose();
                });
              }
            } else {
              //Si no hay errores setteamos el NUEVO forteTxId para el paso 4.
              setStep3(false);
              setStep4(true);
              setForteTxText(response.forteTxId);
            }
          } catch (error) {
            setStatus("error");
            setError(error?.message);
            /* fireAlertAsync(
              "Oops, an error ocurred",
              error?.message,
              "500px"
            ).then(() => {
              handleClose();
            });
          }
        }
      };

      buyShop();
    }
  }, [
    userData,
    setForteTxText,
    history,
    handleClose,
    step3,
    status,
    forteTxText,
  ]); */

  //Paso 2
  //Con el id de la tx vamos haciendo la consulta del status de la operación en la blockchain.
  useEffect(() => {
    let forteStatusInterval;
    if (
      forteTxText !== "" &&
      Object.keys(userData).length !== 0 &&
      step2
    ) {
      console.log(
        `Step 2. Get forte tx. Step2: ${step2}`
      );
      console.log(`Forteid: ${forteTxText}, Status: ${status}`);

      const getStatusForte = async () => {
        try {
          const response = await dropService.getTransactionStatus(
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
              /* setStatus("Oops, an error ocurred:" + response.error.text); */
              setTimeout(() => {
                handleClose();
              }, 3000);
            }
          } else {
            //Response OK, no errors
            //console.log(`Status on proccessing: ${response.status}`);
            setStatus(response.status);
            if (response.status === "completed") {
              console.log(response);
              setTxResultPackBuy(response?.txResult);
            }
          }
        } catch (error) {
          setStatus("error");
          setError(error?.message);
          /* setStatus("Oops, an error ocurred: " + error.message); */
          setTimeout(() => {
            handleClose();
          }, 3000);
        }
      };

      //We call the status of the transaction in forte each 0.5 secs
      forteStatusInterval = setInterval(getStatusForte, 500);
      setTimeout(() => {
        if (status !== "pending" && status !== "") {
          clearInterval(forteStatusInterval);
          if (step2 && status === "completed") {
            setTimeout(() => {
              processingComplete();
            }, 3000);
          }
        }
      }, 1000);
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
    processingComplete,
    step2,
    setTxResultPackBuy,
    error?.message,
  ]);

  console.log({ status, error });

  return (
    <div className={styles.parentContainerModal}>
      {/* Evitar el cerrado durante el proceso */}
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
