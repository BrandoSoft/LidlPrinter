import React from 'react';

import { TiShoppingCart } from "react-icons/ti";
import { FaBoxArchive } from "react-icons/fa6";

import './ForkListCSS.css'
import { priorityStarGenerator } from "../../utils/PriorityStars";


const ForkArrives = ({serialNumber,shopNumber, date, prio, id, deleteFORK, updateStatus}) => {

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
                            <div className="forkCard__nav__date__out">W:{date}</div>
                        </div>
                        <div className='forkCard__nav__buttons'>
                            <div className='forkCard__nav__buttons__button' onClick={()=> updateStatus(id, "arrived")}><TiShoppingCart /> </div>
                            <div className='forkCard__nav__buttons__button' onClick={()=> updateStatus(id, "archived")}><FaBoxArchive /> </div>
                        </div>
                    </div>
                </div>
            </li>
        </div>
    );
};

export default ForkArrives;