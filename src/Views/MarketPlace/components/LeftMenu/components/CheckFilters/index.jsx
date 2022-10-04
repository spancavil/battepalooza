import { filterObject } from "../../../../../../Utils/objectUtilities";

import styles from "./styles.module.scss";

const CheckFilters = ({ onChange, filters, filterType}) => {
  const filtersCloneCount = filterObject(filters, filterType);

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

export default CheckFilters;
