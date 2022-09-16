import { Link } from "react-router-dom";

import ProfileIcon from "../../../../Assets/svg/ProfileIcon";
import styles from "./styles.module.scss";

export const Profile = () => {
  return (
    <Link className={styles.profileContainer} to={"/account/profile"}>
      <ProfileIcon />
      <span>Profile</span>
    </Link>
  );
};
