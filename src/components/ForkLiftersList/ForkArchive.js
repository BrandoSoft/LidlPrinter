import React from 'react';

import { HiArrowCircleLeft } from "react-icons/hi";
import { FaTrashCan } from "react-icons/fa6";

import './ForkLifterList.css'
const ForkArchive = ({serialNumber,shopNumber, date, prio, id, deleteFORK, updateStatus}) => {

    return (
        <div>
            <li>
                <div className='forkArrivesLi'>
                    <div className='forkArrivesLiIMS'><input type='checkbox' /></div>
                    <div className='forkArrivesLiDate' >{date}</div>
                    <div className='forkArrivesShop'>{shopNumber}</div>
                    <div className='forkArrivesSN'>{serialNumber}</div>
                    <div className='forkArrivesPrio'>{prio}</div>
                    <div className='forkArrivesLiButton' onClick={()=> updateStatus(id, "done")}><HiArrowCircleLeft /></div>
                    <div className='forkArrivesLiButton' onClick={()=> deleteFORK(id)}><FaTrashCan /> </div>
                </div>
            </li>
        </div>
    );
};

export default ForkArchive;