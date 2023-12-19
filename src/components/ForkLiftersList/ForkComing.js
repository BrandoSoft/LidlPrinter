import React, { useEffect, useState } from 'react';


import './ForkListCSS.css'
import { updateExtendedInfo, updateStatus } from "../../utils/dbOperations";
import { priorityStarGenerator } from "../../utils/PriorityStars";
import { FaFileArrowDown, FaPencil } from "react-icons/fa6";
import { MdForklift } from "react-icons/md";
const ForkComing = ({serialNumber,shopNumber, date, leaveDate, prio, id, ims, extendedInfo}) => {

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
                        <FaFileArrowDown
                            className={extendedInfoVisibility ? 'forkCard__ims__icon-reversed' : 'forkCard__ims__icon'}
                            onClick={() => setExtendedInfoVisibility(!extendedInfoVisibility)}
                        />
                    </div>
                    <div className="forkCard__shop forkCard__shop-coming">
                        <div className='forkCard__shop__number forkCard__shop__number-coming '>
                            {shopNumber}
                            <button className="forkList__button forkList__button-green">Z1</button>
                        </div>
                        <div className='forkCard__shop__SN'>{serialNumber}</div>
                        {priorityStarGenerator(prio, id)}
                    </div>
                    <div className="forkCard__nav">
                        <div className='forkCard__nav__buttons'>

                            <div className='forkCard__nav__buttons__button' onClick={() => updateStatus(id, "arrivedFromComing")}><MdForklift /></div>
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

export default ForkComing;