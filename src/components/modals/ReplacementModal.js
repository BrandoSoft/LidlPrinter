import React from 'react';
import './ModalCSS.scss'
import { returnReplacementForkToAvailable } from "../../utils/dbOperations";

const ReplacementModal = ({replacement, replacementId, forkId, modalVisibilityHandler}) => {

    console.log('replacement', replacement)
    console.log('id', replacementId)

    return (
        <div className="modal">
          <div>Czy wózek {replacement} wrócił do magazynu?</div>
            <div>
                <button
                    onClick={()=> {
                        returnReplacementForkToAvailable(replacementId, forkId)
                        modalVisibilityHandler()
                    }}
                >tak</button>
                <button onClick={modalVisibilityHandler}>nie</button>
            </div>
        </div>
    );
};

export default ReplacementModal;