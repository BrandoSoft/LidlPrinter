import React from 'react';

import { HiArrowCircleRight } from "react-icons/hi";

// import './ForkLifterList__.css'
const ForkArrives = ({serialNumber,shopNumber, date, prio, id, deleteFORK, updateStatus}) => {

    return (
        <div>
            <li>
                <div className='forkArrivesLi'>
                    <div className='forkArrivesLiIMS'><input type='checkbox' /></div>
                    <div className='forkArrivesLiDate' >{date}</div>
                    <div className='forkArrivesShop'>{shopNumber}</div>
                    <div className='forkArrivesSN'>{serialNumber}</div>
                    <div className='forkArrivesPrio'>{prio}</div>
                    <div className='forkArrivesLiButton' onClick={()=> updateStatus(id, "done")}><HiArrowCircleRight /></div>
                </div>
            </li>
        </div>
    );
};

export default ForkArrives;