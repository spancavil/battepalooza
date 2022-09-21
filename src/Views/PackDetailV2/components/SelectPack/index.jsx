import { useState } from "react";
import OrdersIcon from "../../../../Assets/svg/OrdersIcon";
import Order from "./Order";
import styles from "./styles.module.scss";

const SelectPack = ({ packs, setPackQuantity, packQuantity }) => {

    const [hideOrderBy, setHideOrderBy] = useState(true);

    const handleChange = (value) => {
        setPackQuantity(value)
    };

    return (
        <div
            className={styles.ordersContainer}
            onClick={() => setHideOrderBy(!hideOrderBy)}
        >
            <div className={styles.container}>
                <div
                    className={
                        hideOrderBy ? styles.orderClose : styles.orderOpen
                    }
                >
                    <span>{packQuantity}</span>
                    <OrdersIcon />
                </div>
                {!hideOrderBy && (
                    <div className={styles.orders}>
                        {packs.map((pack) => {
                            return (
                                <Order
                                    name={pack}
                                    onClick={handleChange}
                                    key={pack}
                                />
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
};

export default SelectPack;
