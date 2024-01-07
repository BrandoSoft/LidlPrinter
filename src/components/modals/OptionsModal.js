import React from 'react';
import './ModalCSS.scss'
import { FaTrashAlt } from "react-icons/fa";
import { deleteFORK } from "../../utils/dbOperations";

const OptionsModal = ({toggleVisible, forkId, replacementId}) => {
    return (
        <div className="modal" onClick={toggleVisible}>
        <div className="modal__options__icons">
            <FaTrashAlt
                onClick={()=>deleteFORK(forkId, replacementId)}
                className="forkCard__extended__icon trash"
            />
        </div>
        </div>
    );
};

export default OptionsModal;