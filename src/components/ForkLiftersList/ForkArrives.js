import React from 'react';

import './ForkLifterList.css'
const ForkArrives = ({serialNumber,shopNumber, date}) => {
    return (
        <div>
            <li>
                <div className='forkArrivesLi'>
                    <input type='checkbox' />
                    <div className='forkArrivesLiDate' >{date}</div>
                    <div className='forkArrivesShop'>{shopNumber}</div>
                    <div className='forkArrivesSN'>{serialNumber}</div>
                </div>
            </li>
        </div>
    );
};

export default ForkArrives;