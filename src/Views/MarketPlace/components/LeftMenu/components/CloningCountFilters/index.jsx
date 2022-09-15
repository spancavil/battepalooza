import { sliceObject } from "../../../../../../Utils/sliceObject";

import styles from "./styles.module.scss";

const CloningCountFilters = ({ onChange, filters }) => {
  const filtersCloneCount = sliceObject(filters, 0, 7);

  return (
    <div className={styles.filters}>
      {Object.keys(filtersCloneCount)?.map((key) => (
        <div key={key} className={styles.filter}>
          <input
            onChange={(e) => onChange(e)}
            value={filters[key]}
            type="checkbox"
            name={key}
            checked={filters[key] ?? true}
          />

          <span>{key}</span>
        </div>
      ))}
    </div>
  );
};

export default CloningCountFilters;
