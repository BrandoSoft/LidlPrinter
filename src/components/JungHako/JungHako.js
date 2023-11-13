import React from 'react';
import './JungHako.css'
const JungHako = ({ data, title, onInfoSelect }) => {

    const handleClick = (index, type, action) => {
        type === 'jung'?
            onInfoSelect([data.paleciak[index], data, action])
            :
            onInfoSelect([data.hako[index], data, action])
    };


    return (
        <div className='jhButtons'>
            {
                data.paleciak.map((e, index) => (
                    <button className='jungCss' key={index} onClick={() => handleClick(index, 'jung', 'service', null)}>{e}</button>
                ))}
            {
                data.hako.map((e, index) => (
                <button className='hakoCss' key={index} onClick={() => handleClick(index, 'hako')}>{e}</button>
                ))}

        </div>
    );
};

export default JungHako;