import React from "react";
import Modal from "../../../../Global-Components/Modal";

import styles from "./styles.module.scss";

const Clone = ({ setClone }) => {
  return (
    <Modal title={"Clone Information"} handleClose={setClone}>
      <div className={styles.container}>
        <div className={styles.generation}>
          <div className={styles.title}>
            <h3>Older generation</h3>
            <hr />
          </div>
          <div className={styles.data}>
            {[0, 1].map(() => (
              <div className={styles.item}>
                <div className={styles.content}>
                  <div className={styles.img} />
                  <p>#Serial number</p>
                  <span>NFT name</span>
                </div>
                <div className={styles.line} />
              </div>
            ))}
          </div>
        </div>

        <div className={styles.generation}>
          <div className={styles.title}>
            <h3>Same generation</h3>
            <hr />
          </div>
          <div className={styles.data}>
            {[0, 1].map(() => (
              <div className={styles.item}>
                <div className={styles.content}>
                  <div className={styles.img} />
                  <p>#Serial number</p>
                  <span>NFT name</span>
                </div>
                <div className={styles.line} />
              </div>
            ))}
          </div>
        </div>

        <div className={styles.generation}>
          <div className={styles.title}>
            <h3>Lower generation</h3>
            <hr />
          </div>
          <div className={styles.data}>
            {[0, 1].map(() => (
              <div className={styles.item}>
                <div className={styles.content}>
                  <div className={styles.img} />
                  <p>#Serial number</p>
                  <span>NFT name</span>
                </div>
                <div className={styles.line} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default Clone;
