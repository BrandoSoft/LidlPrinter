import React from 'react';

import { HiOutlineWrenchScrewdriver } from "react-icons/hi2";
import { TiShoppingCart } from "react-icons/ti";

import './ForkListCSS.css'
import { updateStatus } from "../../utils/dbOperations";
import { priorityStarGenerator } from "../../utils/PriorityStars";
const ForkArrives = ({serialNumber,shopNumber, date, leaveDate, prio, id}) => {

    return (
        <div>
            <li>
                <div className='forkCard'>
                    <div className='forkCard__ims'>
                        <p>IMS</p>
                        <input type='checkbox' />
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
                            <div className='forkCard__nav__buttons__button' onClick={()=> updateStatus(id, "wait")}><HiOutlineWrenchScrewdriver /></div>
                            <div className='forkCard__nav__buttons__button' onClick={()=> updateStatus(id, "done")}><TiShoppingCart  /></div>
                        </div>
                    </div>
                </div>
            </li>
        </div>
    );
};

export default ForkArrives;