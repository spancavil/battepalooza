import { UserData } from "../../../../Context/UserProvider";
import { Link, useLocation } from "react-router-dom";
import { useContext } from "react";

import styles from "./styles.module.scss";

export const LinkNav = ({ link }) => {
  const { userData } = useContext(UserData);

  const user = Object.keys(userData).length > 0;

  const { text, to, isAnchor, needAuth, notRedirect } = link;
  const { pathname } = useLocation();

  //Anchors not logged and anchors logged
  if (
    (isAnchor && !needAuth && !notRedirect) ||
    (isAnchor && needAuth && !notRedirect && user)
  ) {
    return (
      <div className={pathname.includes(to) ? styles.linkActive : styles.link}>
        <a href={to} target="_blank" rel="noopener noreferrer">
          {text}
        </a>
      </div>
    );
  }

  if (isAnchor && notRedirect) {
    return (
      <div className={pathname.includes(to) ? styles.linkActive : styles.link}>
        <a href={to}>{text}</a>
      </div>
    );
  }

  //Links logged and links not logged
  if ((!isAnchor && !needAuth) || (!isAnchor && user && needAuth)) {
    return (
      <div className={pathname.includes(to) ? styles.linkActive : styles.link}>
        <Link to={to}>{text}</Link>
      </div>
    );
  }

  return null;
};
