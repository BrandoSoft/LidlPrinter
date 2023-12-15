import React from 'react';

import { HiArrowCircleRight } from "react-icons/hi";
import { FaScrewdriverWrench } from "react-icons/fa6";
import { FaArrowAltCircleRight } from "react-icons/fa";

import './ForkListCSS.css'
import { FaStar } from "react-icons/fa6";
import { FaRegStar } from "react-icons/fa";
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
                        <div className='forkCard__shop__prio'>
                            <FaStar />
                            <FaStar />
                            <FaStar />
                            <FaRegStar />
                            <FaRegStar />
                        </div>
                    </div>
                    <div className="forkCard__nav">
                        <div className='forkCard__nav__date'>
                            <div className="forkCard__nav__date__in">P:{date}</div>
                            <div className="forkCard__nav__date__out">W:{date}</div>
                        </div>
                        <div className='forkCard__nav__buttons'>
                            <div className='forkCard__nav__buttons__button' onClick={()=> updateStatus(id, "wait")}><FaScrewdriverWrench /></div>
                            <div className='forkCard__nav__buttons__button' onClick={()=> updateStatus(id, "done")}><FaArrowAltCircleRight /></div>
                        </div>
                    </div>
                </div>
            </li>
        </div>
    );
};

export default ForkArrives;