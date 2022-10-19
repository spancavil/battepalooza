import { sendAmplitudeData } from "../../../../Utils/amplitude";
import { UserData } from "../../../../Context/UserProvider";
import { useContext, useEffect, useState } from "react";
import { separator } from "../../../../Utils/separator";
import { useHistory } from "react-router-dom";

import checkErrorMiddleware from "../../../../Utils/checkErrorMiddleware";
import authService from "../../../../Services/auth.service";
import NCoin from "../../../../Assets/img/icon-ncoin.png";
import styles from "./styles.module.scss";
import ReloadForte from "../ReloadForte";
import { MaintenanceData } from "../../../../Context/MaintenanceProvider";

export const Ncoins = () => {
  const [loadingBalance, setLoadingBalance] = useState(false);
  const [countReload, setCountReload] = useState(0);
  const [disabled, setDisabled] = useState(false);
  const [coins, setCoins] = useState();

  const { userData, setCoin } = useContext(UserData);
  const { setMaintenance } = useContext(MaintenanceData);

  const history = useHistory();

  useEffect(() => {
    let response;
    const fetchData = async () => {
      setLoadingBalance(true);
      response = await authService.getForteBalance(userData);
      if (response?.maintenance) {
        setMaintenance(response.maintenance);
      }
      const canContinue = checkErrorMiddleware(response, history);
      if (canContinue) {
        setCoins(separator(response.coin));
        setCoin(response.coin);
        setLoadingBalance(false);
      }
    };
    userData.email && fetchData();
  }, [userData, setCoin, history, countReload, disabled, setMaintenance]);

  const handleFortePayload = async () => {
    let site = "Buy More";
    const properties = {
      clicked: site,
      page: site,
    };
    sendAmplitudeData("Click", properties);
    const response = await authService.getFortePayload(userData);
    if (response?.maintenance) {
      setMaintenance(response.maintenance);
    }
    const canContinue = checkErrorMiddleware(response, history);
    if (canContinue) {
      window.open(response.redirectTo);
    }
  };

  const reloadForte = () => {
    if (disabled === false) {
      setCountReload(countReload + 1);
      setDisabled(true);
      setTimeout(() => setDisabled(false), 5000);
    } else {
      return;
    }
  };

  return (
    <div className={styles.ncoins}>
      <p>{coins} NCoin</p>
      <img className={styles.ncoinImg} src={NCoin} alt="NCoin" />
      <ReloadForte
        handleClick={reloadForte}
        clase={loadingBalance ? "reload" : "normal"}
      />
      <button className={styles.buyMore} onClick={handleFortePayload}>
        <span>BUY MORE</span>
      </button>
    </div>
  );
};
