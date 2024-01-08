import React from 'react';

import './ModalCSS.scss'
import { swapReplacementFork } from "../../utils/dbOperations";

const ReplacementListModal = ({replacementList, hide, originalReplacement, originalReplecementId, originalForkId, toggleVisible}) => {
    return (
        <div className='replacementListModal'>
            {replacementList.sort((a, b) => {
                const orderA = parseInt(a.order);
                const orderB = parseInt(b.order);
                if (orderA < orderB) {
                    return -1;
                }
                if (orderA > orderB) {
                    return 1;
                }
                return 0;
            }).map((e, index) => {
                if (!e.isTaken) {

                    return (
                        <button key={index} className="forkList__button" onClick={()=>{

                            swapReplacementFork(originalReplecementId, e.rId, originalForkId, e.name)
                            hide()
                            toggleVisible()
                            }}>
                            {e.name}
                        </button>
                    );
                }
                return null;
            })}
            <button className="forkList__button wide-button">Usuń</button>
            <button className="forkList__button wide-button" onClick={hide}>Zamknij</button>
        </div>
    );
};

export default ReplacementListModal;