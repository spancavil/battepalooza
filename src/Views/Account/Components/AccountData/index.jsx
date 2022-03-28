import React, { useContext, useEffect, useState } from "react";
import styles from "./styles.module.scss";
import nCoin from "../../../../Assets/img/icon-ncoin.png";
import { UserData } from "../../../../Context/UserProvider";
import { separator } from "../../../../Utils/separator";
import generateDate from "../../../../Utils/createDate";
import { useHistory } from "react-router";
import authService from "../../../../Services/auth.service";
import { logOutAmplitude } from "../../../../Utils/amplitude";
import { fireAlertAsync } from "../../../../Utils/sweetAlert2";

// Por ahora esta Hardcodeado pero cuando
// tengamos la api hay que crear los estados
// y las funciones

const AccountData = () => {
  const { userData, setCoin } = useContext(UserData);
  const [monedas, setMonedas] = useState(0);

  const history = useHistory();

  useEffect(() => {
    let response;
    const fetchData = async () => {
      response = await authService.getForteBalance(userData);
      if (response.error.text.includes("authorized")) {
        fireAlertAsync("Warning", "Session expired, please login again.").then(
          () => {
            localStorage.removeItem("userBP");
            logOutAmplitude();
            history.push("/");
            window.location.reload();
          }
        );
      }
      setMonedas(separator(response.coin));
      setCoin(response.coin);
    };
    userData.email && fetchData();
  }, [userData, setCoin, history]);

  return (
    <div className={styles.container}>
      <p className={styles.info}>My information</p>
      <h4 className={styles.title}>PID - {userData.pid}</h4>
      <p className={styles.joined}>
        Joined {generateDate(userData.created_at)}
      </p>
      <p className={styles.linked}>{userData.email}</p>
      <div className={styles.nCoin}>
        <span>{monedas} NCoin</span>
        <img className={styles.img} src={nCoin} alt="nCoin" />
      </div>
    </div>
  );
};

export default AccountData;
