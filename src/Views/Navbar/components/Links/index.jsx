import { links } from "../../helpers/utilsNav";
import { LinkNav } from "../LinkNav";

import styles from "./styles.module.scss";

export const Links = () => {
  return (
    <div className={styles.links}>
      {links.map((link) => (
        <LinkNav key={link.to} link={link} />
      ))}
    </div>
  );
};
