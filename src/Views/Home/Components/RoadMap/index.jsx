import styles from "./styles.module.scss";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const items = ["1", "2", "3"];

const RoadMap = () => {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>ROADMAP</h2>
      <div className={styles.months}>
        {months.map((month) => (
          <span>{month}</span>
        ))}
      </div>
      <div className={styles.q}>
        <div className={styles.q1}>
          <h3>Q1 2022</h3>
          <ul>
            {items.map((item) => (
              <li>{item}</li>
            ))}
          </ul>
        </div>
        <div className={styles.q2}>
          <h3>Q1 2022</h3>
          <ul>
            {items.map((item) => (
              <li>{item}</li>
            ))}
          </ul>
        </div>
        <div className={styles.q3}>
          <h3>Q1 2022</h3>
          <ul>
            {items.map((item) => (
              <li>{item}</li>
            ))}
          </ul>
        </div>
        <div className={styles.q4}>
          <h3>Q1 2022</h3>
          <ul>
            {items.map((item) => (
              <li>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default RoadMap;
