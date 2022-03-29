import React, { useContext, useState } from "react";
import { Redirect } from "react-router";
import { UserData } from "../../Context/UserProvider";
import Background from "../../Global-Components/Background";
import AccountData from "./Components/AccountData";
import TradeHistory from "./Components/TradeHistory";
// import AccountMenu from './Components/AccountMenu';
import styles from "./styles.module.scss";

const Account = () => {
  const [page, setPage] = useState(1);
  const [xPage, setxPage] = useState(25);
  const [input, setInput] = useState(1);

  const { userData } = useContext(UserData);

  return !userData ? (
    <Redirect to="/needlogin" />
  ) : (
    <Background>
      <div className={styles.dataContainer}>
        <AccountData />
        <TradeHistory
          page={page}
          setPage={setPage}
          xPage={xPage}
          setxPage={setxPage}
          input={input}
          setInput={setInput}
        />
      </div>
    </Background>
  );
};

export default Account;
