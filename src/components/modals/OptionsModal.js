import React, { useState } from 'react';
import './ModalCSS.scss'
import { FaTrashAlt } from "react-icons/fa";
import { deleteFORK } from "../../utils/dbOperations";
import { FaArrowRightArrowLeft } from "react-icons/fa6";
import ReplacementListModal from "./ReplacementListModal";
import ChangeNumberModal from "./ChangeNumberModal";

const OptionsModal = ({toggleVisible, forkId, replacementId, replacementList, replacement}) => {

    const [replacementListModalVisible, setReplacementListModalVisible] = useState(false)
    const [changeNumberModalVisible, setChangeNumberModalVisible] = useState(false)

    const hideReplacementListModalVisible = () => {
        setReplacementListModalVisible(false)
    }


    return (
        <div className="modal">
            {replacementListModalVisible &&
                <ReplacementListModal
                    replacementList={replacementList}
                    hide={hideReplacementListModalVisible}
                    originalReplacement={replacement}
                    originalForkId={forkId}
                    originalReplecementId={replacementId}
                    toggleVisible={toggleVisible}
                />}
            {changeNumberModalVisible &&
            <ChangeNumberModal
            toggleVisible={toggleVisible}
            originalForkId={forkId}
            />
            }
            <div className="modal__container">
                <div className="modal__option">
                    <div className="modal__option__icon">
                        <FaTrashAlt onClick={()=>deleteFORK(forkId, replacementId)}/>
                    </div>
                    <div className="modal__option__title">Zmień Sklep</div>
                </div>
                <div className="modal__option" onClick={()=>setChangeNumberModalVisible(true)}>
                    <div className="modal__option__icon">
                        <FaTrashAlt/>
                    </div>
                    <div className="modal__option__title">Zmień nr seryjny</div>
                </div>
                <div className="modal__option" onClick={()=>setReplacementListModalVisible(true)}>
                    <div className="modal__option__icon">
                        <FaTrashAlt/>
                    </div>
                    <div className="modal__option__title">Zmień zastępczy</div>
                </div>
                <div className="modal__option" onClick={()=>deleteFORK(forkId, replacementId)}>
                    <div className="modal__option__icon">
                        <FaTrashAlt/>
                    </div >
                    <div className="modal__option__title">Usuń wózek </div>
                </div>
            </div>
            <div className='modal__return' onClick={toggleVisible}>
                <FaArrowRightArrowLeft
                />
            </div>
        </div>

    );
};

export default OptionsModal;