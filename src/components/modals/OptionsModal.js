import React from 'react';
import './ModalCSS.scss'
import { FaTrashAlt } from "react-icons/fa";
import { deleteFORK } from "../../utils/dbOperations";
import { FaArrowRightArrowLeft } from "react-icons/fa6";

const OptionsModal = ({toggleVisible, forkId, replacementId}) => {

    return (
        <div className="modal" onClick={toggleVisible}>
            <div className="modal__container">
                <div className="modal__option">
                    <div className="modal__option__icon">
                        <FaTrashAlt onClick={()=>deleteFORK(forkId, replacementId)}/>
                    </div>
                    <div className="modal__option__title">Zmień Sklep</div>
                </div>
                <div className="modal__option">
                    <div className="modal__option__icon">
                        <FaTrashAlt/>
                    </div>
                    <div className="modal__option__title">Zmień nr seryjny</div>
                </div>
                <div className="modal__option">
                    <div className="modal__option__icon">
                        <FaTrashAlt onClick={()=>deleteFORK(forkId, replacementId)}/>
                    </div>
                    <div className="modal__option__title">Zmień zastępczy</div>
                </div>
                <div className="modal__option" onClick={()=>deleteFORK(forkId, replacementId)}>
                    <div className="modal__option__icon">
                        <FaTrashAlt/>
                    </div>
                    <div className="modal__option__title">Usuń wózek </div>
                </div>
            </div>
            <div className='modal__return'>
                <FaArrowRightArrowLeft />
            </div>
        </div>

    );
};

export default OptionsModal;