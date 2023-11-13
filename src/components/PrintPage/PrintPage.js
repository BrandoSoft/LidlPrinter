import React from 'react';
import './PrintPage.css'

const PrintPage = ({info}) => {
    console.log('info z print',info[1]);
    // console.log('info z print',info[1]);

    return (
        <div className='sendingLetter'>
            <div className="sklep"> {info[1].sklep}</div>
            {info[2] === 'service' ?
                <div className="shop-title">
                    <div>Proszę o przysłanie na przegląd wózka o numerze seryjnym:</div>
                    <div className="SN">{info[0]}</div>
                </div>
                :
                null
            }
           <div className="sl_szpura">
               {info[1].szpura.map(e =>(
                   <div key={e}>{e}</div>
               ))}
           </div>
        </div>
    );
};

export default PrintPage;