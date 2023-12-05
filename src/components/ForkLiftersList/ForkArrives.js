import React from 'react';

import { HiArrowCircleRight } from "react-icons/hi";

import './ForkLifterList.css'
const ForkArrives = ({serialNumber,shopNumber, date}) => {
    return (
        <div>
            <li>
                <div className='forkArrivesLi'>
                    <div className='forkArrivesLiIMS'><input type='checkbox' /></div>
                    <div className='forkArrivesLiDate' >{date}</div>
                    <div className='forkArrivesShop'>{shopNumber}</div>
                    <div className='forkArrivesSN'>{serialNumber}</div>
                    <div className='forkArrivesPrio'>2</div>
                    <div className='forkArrivesLiButton'><HiArrowCircleRight /></div>
                </div>
            </li>
        </div>
    );
};

export default ForkArrives;