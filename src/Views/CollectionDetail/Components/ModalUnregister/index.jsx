import React from 'react';
import Modal from '../../../../Global-Components/Modal';
import styles from './styles.module.scss';
import Button from '../../../../Global-Components/Button';

const ModalUnregister = ({setmodalUnregister, confirmUnregister, name}) => {
    return (
        <div className={styles.parentContainerModal}>
            <Modal
                title="Confirmation"
                handleClose={() => setmodalUnregister(false)}
            >
                <h3 className={styles.textDrop}>
                    Will you unregister {name} from the marketplace?
                </h3>
                <div
                    style={{
                        width: "100%",
                        paddingTop: "10px",
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "center",
                        paddingBottom: "25px",
                        gap: '20px',
                    }}
                >
                    <Button
                        modal={true}
                        title="CONFIRM"
                        width="176px"
                        onClick={confirmUnregister}
                    />
                    <Button
                        modal = {true}
                        title="CANCEL"
                        width="176px"
                        onClick={()=> setmodalUnregister(false)}
                    />
                </div>
            </Modal>
        </div>
    )
};

export default ModalUnregister;
