import React, { useState } from 'react';

import { TiShoppingCart } from "react-icons/ti";
import { FaBoxArchive } from "react-icons/fa6";
import { MdForklift } from "react-icons/md";
import { FaFileArrowDown } from "react-icons/fa6";

import './ForkListCSS.css'
import { priorityStarGenerator } from "../../utils/PriorityStars";
import { toggleIMS, updateStatus } from "../../utils/dbOperations";


const ForkArrives = ({serialNumber,shopNumber, date, leaveDate, prio, id, ims}) => {

    const [extendedInfo, setExtendedInfo] = useState('');
    const [extendedInfoVisibility, setExtendedInfoVisibility] = useState(true)

    return (
        <div>
            <li>
                <div className='forkCard'>
                    <div className='forkCard__ims'>
                        <div>IMS</div>
                        <input type='checkbox' onChange={() =>toggleIMS(id, ims)} checked={ims? 'checked' : ''}/>
                        <FaFileArrowDown
                            className={extendedInfoVisibility ? 'forkCard__ims__icon-reversed' :'forkCard__ims__icon'}
                            onClick={()=> setExtendedInfoVisibility(!extendedInfoVisibility)}
                        />
                    </div>
                    <div className="forkCard__shop">
                        <div className='forkCard__shop__number'>{shopNumber}</div>
                        <div className='forkCard__shop__SN'>{serialNumber}</div>
                        {priorityStarGenerator(prio, id)}
                    </div>
                    <div className="forkCard__nav">
                        <div className='forkCard__nav__date'>
                            <div className="forkCard__nav__date__in">P:{date}</div>
                            <div className="forkCard__nav__date__out">W:{leaveDate}</div>
                        </div>
                        <div className='forkCard__nav__buttons'>
                            <div className='forkCard__nav__buttons__button' onClick={()=> updateStatus(id, "arrived")}><MdForklift /></div>
                            <div className='forkCard__nav__buttons__button' onClick={()=> updateStatus(id, "done")}><TiShoppingCart /> </div>
                            <div className='forkCard__nav__buttons__button' onClick={()=> updateStatus(id, "archived")}><FaBoxArchive /> </div>
                        </div>
                    </div>
                </div>
                <div className={extendedInfoVisibility ? 'forkCard__extended' : 'forkCard__extended-closed'}>
                    {extendedInfo}
                </div>
            </li>
        </div>
    );
};

export default ForkArrives;