import React from "react";
import { Redirect } from "react-router";
import Background from "../../Global-Components/Background";
import SocialMedia from "../Home/Components/SocialMedia";
import CardDetail from "./Components/CardDetail";
import styles from "./styles.module.scss";

/* NO SE ESTA USANDO ESTE COMPONENTE, E IBA EN LA RUTA /packs/:id */
const PackDetail = () => {
  const userStorage = JSON.parse(localStorage.getItem("userBP"));

  return (
    <Background>
      <div className={styles.container}>
        <CardDetail />
      </div>
      <SocialMedia />
    </Background>
  );
};

export default PackDetail;
