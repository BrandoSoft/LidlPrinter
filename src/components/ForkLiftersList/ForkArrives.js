import React, { useEffect, useState } from 'react';

import { HiOutlineWrenchScrewdriver } from "react-icons/hi2";
import { TiShoppingCart } from "react-icons/ti";

import './ForkListCSS.css'
import { toggleIMS, updateExtendedInfo, updateStatus } from "../../utils/dbOperations";
import { priorityStarGenerator } from "../../utils/PriorityStars";
import { FaFileArrowDown, FaPencil } from "react-icons/fa6";
const ForkArrives = ({serialNumber,shopNumber, date, leaveDate, prio, id, ims, extendedInfo}) => {

    const [userExtendedInfo, setUserExtendedInfo] = useState('');
    const [extendedInfoVisibility, setExtendedInfoVisibility] = useState(false);

    useEffect(() => {
        setUserExtendedInfo(extendedInfo);
    }, [extendedInfo]);

    return (
        <div>
            <li>
                <div className='forkCard'>
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
                        <div className='forkCard__shop__number'>
                            {shopNumber}
                            <button className="forkList__button">Z1</button>
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
                            <div className='forkCard__nav__buttons__button' onClick={()=> updateStatus(id, "wait")}><HiOutlineWrenchScrewdriver /></div>
                            <div className='forkCard__nav__buttons__button' onClick={()=> updateStatus(id, "done")}><TiShoppingCart  /></div>
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

export default ForkArrives;