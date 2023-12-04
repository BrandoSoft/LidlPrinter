import React from 'react';

import './ForkLifterList.css'
import ForkArrives from "./ForkArrives";

const ForkForm = ({data}) => {
    return (
        <div className='forkFormContainer'>
            <form className='forkFormAddForm'>
                <input type="number" placeholder='Sklep'/>
                <input type="number" placeholder='Numer Seryjny'/>
                <button>+</button>
            </form>
            <ul>
                {data.map((data, index) =>
                    ( <ForkArrives
                        key={index}
                        date={data.date}
                        shopNumber={data.shopNumber}
                        serialNumber={data.serialNumber}
                    />)
                )}
                           </ul>
        </div>
    );
};

export default ForkForm;