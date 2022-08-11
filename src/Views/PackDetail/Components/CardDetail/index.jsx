import React, { useContext, useEffect, useState } from "react";
import styles from "./styles.module.scss";
import { useParams } from "react-router";
import { PackData } from "../../../../Context/PackProvider";
import Button from "../../../../Global-Components/Button";
import fireToast, {
  fireAlert,
  fireAlertAsync,
} from "../../../../Utils/sweetAlert2";
import { UserData } from "../../../../Context/UserProvider";
import walletService from "../../../../Services/wallet.service";
import { logOutAmplitude } from "../../../../Utils/amplitude";
import { useHistory } from "react-router-dom";

const CardDetail = () => {
  const { setPack, packData } = useContext(PackData);
  const { id } = useParams();
  const [pack, setSelectedPack] = useState();
  const { userData } = useContext(UserData);
  const history = useHistory();

  console.log(id);

  useEffect(() => {
    const selectedPack = packData?.nftPackProducts?.find(
      (pack) => pack?.id === id
    );
    console.log({ selectedPack });
    setSelectedPack(selectedPack);
    setPack(selectedPack);
  }, [id, packData, setPack]);

  const getTransactions = async () => {
    const response = await walletService.getWalletCryptoTransactions(
      userData.bpToken,
      userData.pid
    );
    //Obtenemos todas las transacciones
    const { transactions } = response;

    //En caso que hayan transacciones
    if (transactions?.length) {
      const sortedTx = response?.transactions.sort((a, b) => {
        if (a.created > b.created) return 1;
        if (a.created < b.created) return -1;
        return 0;
      });
      console.log(sortedTx);
      //Obtenemos la última transacción (que es la que debemos ir haciendo poll para consultar el estado)
      const lastTx = sortedTx.pop();
      await fireAlertAsync(
        "Last transaction",
        `Your last transaction id is: ${lastTx?.orderId}`,
        "500px"
      );
      history.push("/open-pack");

      //Si no hay tx devolvemos a Home
    } else {
      await fireAlertAsync("No transactions registered", "", "500px");
      history.push("/");
    }
  };

  const handleBuy = async () => {
    if (Object.keys(userData).length !== 0) {
      try {
        const response = await walletService.getWalletToken(
          userData.bpToken,
          userData.email,
          userData.pid
        );
        console.log(response);
        if (response.error.num !== 0) {
          if (response.error.text.includes("authorized")) {
            fireAlertAsync("Session expired, please login again.").then(() => {
              localStorage.removeItem("userBP");
              logOutAmplitude();
              history.push("/");
              window.location.reload();
            });
          } else {
            fireAlert("Oops, an error ocurred", response.error.text, "500px");
          }
          //Everything OK
        } else {
          const { token } = response;
          const popup = window.open(
            `${process.env.REACT_APP_NWAY_URL}token=${token}&${process.env.REACT_APP_NWAY_URL_TITLE}`,
            "Wallet payment",
            "top=50,left= 200,width=800,height=620"
          );

          //Intervalo para detectar el cierre del popup
          const popupTick = setInterval(() => {
            if (popup.closed) {
              console.log("se cerro la window");
              clearInterval(popupTick);
              getTransactions();
            }
          }, 500);
        }
      } catch (error) {
        fireAlert("Oops, an error ocurred", error.message, "500px");
      }
    } else {
      fireToast("Need login", 1200, "300px");
    }
  };

  console.log({ pack });

  return (
    <>
      {pack && (
        <div className={styles.card}>
          <div className={styles.imgContainer}>
            <img src={pack?.thumbnailUrl} alt="pack" />
          </div>
          <div className={styles.text}>
            <h3 className={styles.rare}>
              {pack?.detailTxt} <br /> {pack?.leftAmount} Pack Left
            </h3>
            <p>You will be able to obtain the following through this pack:</p>
            <h3 className={styles.price}>Price {pack?.price} NCoin</h3>
            <Button onClick={handleBuy} title={"BUY"} />
          </div>
        </div>
      )}
    </>
  );
};

export default CardDetail;
