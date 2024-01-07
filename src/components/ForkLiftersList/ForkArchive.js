import React, { useEffect, useState } from 'react';


import { priorityStarGenerator } from "../../utils/PriorityStars";
import { deleteFORK, toggleIMS, updateExtendedInfo, updateStatus } from "../../utils/dbOperations";

import { MdForklift } from "react-icons/md";
import { FaBoxArchive, FaFileArrowDown, FaPencil, FaScrewdriverWrench } from "react-icons/fa6";
import { FaTrashAlt } from "react-icons/fa";
import { HiOutlineWrenchScrewdriver } from "react-icons/hi2";
import { TiShoppingCart } from "react-icons/ti";
import { SlOptionsVertical } from "react-icons/sl";
import ReplacementModal from "../modals/ReplacementModal";
import OptionsModal from "../modals/OptionsModal";

const ForkArchive = ({serialNumber,shopNumber, date, leaveDate, prio, id, ims, extendedInfo, replacement, replacementId}) => {

    const [userExtendedInfo, setUserExtendedInfo] = useState('');
    const [extendedInfoVisibility, setExtendedInfoVisibility] = useState(false);
    const [modalVisibility, setModalVisibility] = useState(false);
    const [optionsModalVisibility, setOptionsModalVisibility] = useState(false);

    useEffect(() => {
        setUserExtendedInfo(extendedInfo);
    }, [extendedInfo]);

    const replacementModalVisibilityHandler = ()=>{
        setModalVisibility(!modalVisibility)
    }
    const optionsModalVisibilityHandler = ()=>{
        setOptionsModalVisibility(!optionsModalVisibility)
    }

    return (
        <div>
            <li>
                <div className='forkCard'>
                    {
                        optionsModalVisibility?
                        <OptionsModal
                            toggleVisible={optionsModalVisibilityHandler}
                            forkId={id}
                            replacementId={replacementId}
                        />
                        :
                        null
                    }
                    {
                        modalVisibility?
                        <ReplacementModal
                            replacement={replacement}
                            replacementId={replacementId}
                            forkId={id}
                            modalVisibilityHandler={replacementModalVisibilityHandler}
                        />
                        :
                        null
                    }
                    <div className='forkCard__ims'>
                        <div>IMS</div>
                        <input
                            type='checkbox'
                            onChange={() =>toggleIMS(id, ims)}
                            checked={ims? 'checked' : ''}
                        />
                        <FaFileArrowDown
                            className={extendedInfoVisibility ? 'forkCard__ims__icon-reversed' : 'forkCard__ims__icon'}
                            onClick={() => setExtendedInfoVisibility(!extendedInfoVisibility)}
                        />
                    </div>
                    <div className="forkCard__shop">
                        <div className='forkCard__shop__number forkCard__shop__number-coming '>
                            {shopNumber}
                            {replacement &&
                                <button
                                    className="forkList__button forkList__button-green"
                                    onClick={()=> replacementModalVisibilityHandler()}
                                >
                                    {replacement}
                                </button>
                            }
                        </div>
                        <div className='forkCard__shop__SN'>{serialNumber}</div>
                        {priorityStarGenerator(prio, id)}
                    </div>
                    <div className="forkCard__nav">
                        <div className='forkCard__nav__date'>
                            <div className="forkCard__nav__date__in">P:{date}</div>
                            <div className="forkCard__nav__date__out">W:{leaveDate}</div>
                        </div>
                        <div className='forkCard__nav__buttons'>
                            <div className='forkCard__nav__buttons__button' onClick={()=> updateStatus(id, "arrived")}><MdForklift /> </div>
                            <div className='forkCard__nav__buttons__button' onClick={()=> updateStatus(id, "wait")}><HiOutlineWrenchScrewdriver /> </div>
                            <div className='forkCard__nav__buttons__button' onClick={()=> updateStatus(id, "done")}><TiShoppingCart /> </div>
                            <div className='forkCard__nav__buttons__button trash' onClick={()=>optionsModalVisibilityHandler()}><SlOptionsVertical /> </div>

                        </div>
                    </div>
                </div>
                <div className={extendedInfoVisibility ? 'forkCard__extended' : 'forkCard__extended-closed'}>
                    {extendedInfo !== '' ?
                        <>
                            <FaPencil className="forkCard__extended__icon" onClick={(e)=>updateExtendedInfo(e,id, '')}/>
                            {userExtendedInfo}
                        </>
                        :
                        <>
                            <form onSubmit={(e) => updateExtendedInfo(e, id, userExtendedInfo)}>
                                <input
                                    type="text"
                                    value={userExtendedInfo}
                                    placeholder="dodatkowe informacje"
                                    onChange={(e) => setUserExtendedInfo(e.target.value)}
                                />
                                <button type="submit"> + </button>
                            </form>
                        </>}

                </div>
            </li>
        </div>
    );
};

export default ForkArchive;