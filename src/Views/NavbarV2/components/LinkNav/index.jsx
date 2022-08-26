import { UserData } from "../../../../Context/UserProvider";
import { Link, useLocation } from "react-router-dom";
import { useContext } from "react";

import styles from "./styles.module.scss";

export const LinkNav = ({ link }) => {
  const { userData } = useContext(UserData);

  const user = Object.keys(userData).length > 0;

  const { text, to, isAnchor, needAuth } = link;
  const { pathname } = useLocation();

  if (isAnchor) {
    return (
      <div className={pathname.includes(to) ? styles.linkActive : styles.link}>
        <a href={to} target="_blank" rel="noopener noreferrer">
          {text}
        </a>
      </div>
    );
  }

  if (!isAnchor && user && needAuth) {
    return (
      <div className={pathname.includes(to) ? styles.linkActive : styles.link}>
        <Link to={to}>{text}</Link>
      </div>
    );
  }

  return !isAnchor && !needAuth ? (
    <div className={pathname.includes(to) ? styles.linkActive : styles.link}>
      <Link to={to}>{text}</Link>
    </div>
  ) : null;
};
