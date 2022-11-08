import { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { UserData } from "../../Context/UserProvider";

import Background from "../Background";
import Sections from "./Sections";

import styles from './styles.module.scss'

const LayoutAccount = ({ children }) => {
  const { userData } = useContext(UserData);
  const history = useHistory()

  useEffect(()=> {
    if (!userData?.bpToken) history.push('/')
  }, [history, userData])

  return (
    <Background>
      <div className={styles.accountContainer}>
        <Sections />
        <div className={styles.dataContainer}>
          {children}
        </div>
      </div>
    </Background>
  );
};

export default LayoutAccount;
