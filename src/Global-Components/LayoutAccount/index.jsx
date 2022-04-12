import { useContext } from "react";
import { Redirect } from "react-router-dom";
import { UserData } from "../../Context/UserProvider";

import Background from "../Background";
import Sections from "./Sections";

import styles from './styles.module.scss'

const LayoutAccount = ({ children }) => {
  const { userData } = useContext(UserData);

  return !userData ? (
    <Redirect to="/needlogin" />
  ) : (
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
