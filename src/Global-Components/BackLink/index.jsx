import { Link } from "react-router-dom";
import styles from "./styles.module.scss";

const BackLink = ({ to, content }) => {
  return (
    <div className={styles.backLink}>
      <Link to={to}>&lt; {content}</Link>
    </div>
  );
};

export default BackLink;
