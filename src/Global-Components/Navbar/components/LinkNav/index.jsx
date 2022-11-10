import { UserData } from "../../../../Context/UserProvider";
import { Link, useLocation } from "react-router-dom";
import { useContext } from "react";

import styles from "./styles.module.scss";

export const LinkNav = ({ link }) => {
  const { userData, setGameNavigate, gameNavigate } = useContext(UserData);

  const user = Object.keys(userData).length > 0;

  const { text, to, isAnchor, needAuth, isGame } = link;
  const { pathname } = useLocation();

  const checkGameNavigate = () => {
    if (to === '/') {
      setGameNavigate(true)
    } else {
      setGameNavigate(false);
    }
  }

  //Anchors not logged and anchors logged
  if (
    (isAnchor && !needAuth) ||
    (isAnchor && needAuth && user)
  ) {
    return (
      <div className={pathname.includes(to) ? styles.linkActive : styles.link}>
        <a href={to} target="_blank" rel="noopener noreferrer">
          {text}
        </a>
      </div>
    );
  }

  //Links logged and links not logged
  if ((!isAnchor && !needAuth && !isGame) || (!isAnchor && user && needAuth && !isGame)) {
    return (
      <div className={pathname === to ? styles.linkActive : styles.link} onClick={checkGameNavigate}>
        <Link to={to}>{text}</Link>
      </div>
    );
  }

  if (isGame){
    return (
      <div className={pathname === to && gameNavigate ? styles.linkActive : styles.link} onClick={checkGameNavigate}>
        <Link to={to}>{text}</Link>
      </div>
    );
  }

  return null;
};
