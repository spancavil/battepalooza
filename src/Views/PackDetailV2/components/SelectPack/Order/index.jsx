import styles from "./styles.module.scss";

const Order = ({ name, onClick }) => {
  return (
    <div className={styles.order} onClick={() => onClick(name)}>
      <span>{name}</span>
    </div>
  );
};

export default Order;
