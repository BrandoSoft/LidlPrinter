import React, { useState } from 'react';

import { MdForklift } from "react-icons/md";
import { TiShoppingCart } from "react-icons/ti";
import { FaBoxArchive, FaScrewdriverWrench} from "react-icons/fa6";

import './ForkListCSS.css'
import ForkArrives from "./ForkArrives";
import ForksToSend from "./ForksToSend";
import ForkArchive from "./ForkArchive";

import ForksToWait from "./ForksToWait";
import { addForkToDB } from "../../utils/dbOperations";

const ForkPage = ({data}) => {

    const [inputShop, setInputShop] = useState('');
    const [inputSN, setInputSN] = useState('');
    const [inputReplacement, setInputReplacement] = useState('');

// Create Data



    return (
        <div className='forkContainer'>
            <div className="forkList">Lista zastępczych w magazynie:<br/>
                <button className="forkList__button">Z1</button>
                <button className="forkList__button">Z2</button>
                <button className="forkList__button">Z3</button>
                <button className="forkList__button">Z4</button>
                <button className="forkList__button">Z5</button>
                <button className="forkList__button">Z6</button>
                <button className="forkList__button">Z7</button>
                <button className="forkList__button">Z8</button>
                <button className="forkList__button">Z9</button>
                <button className="forkList__button">Z10</button>
                <button className="forkList__button">Z11</button>
                <button className="forkList__button">Z12</button>
                <button className="forkList__button">Z13</button>
                <button className="forkList__button">Z14</button>
            </div>
            <div className="forkList">Mamy ims i czekamy na:<br/>
                <button className="forkList__ims">3322</button>
                <button className="forkList__ims">1254</button>
                <button className="forkList__ims">1111</button>
                <button className="forkList__ims">6677</button>

            </div>
            <div className='mainTable'>
                <div className="mainTable__form forkList">
                    <form className='mainTable__form__add' onSubmit={e => addForkToDB(e, inputSN, inputShop)}>
                        <input
                            type="number"
                            value={inputShop}
                            onChange={e=>setInputShop(e.target.value)}
                            placeholder='Sklep'
                            className='mainTable__form__add__input input-short'
                        />
                        <input
                            type="number"
                            value={inputSN}
                            onChange={e=>setInputSN(e.target.value)}
                            placeholder='Numer Seryjny'
                            className='mainTable__form__add__input'
                        />
                        <button className='mainTable__form__add__button'>DODAJ</button>
                        <input
                            type="number"
                            value={inputReplacement}
                            onChange={e=>setInputReplacement(e.target.value)}
                            placeholder='Zastępczy'
                            className='mainTable__form__add__input input-short'
                        />
                        </form>
                </div>
                <div className="mainTable__data">
                    <div className="mainTable__data__column">
                        <ul>
                            <li>
                                <div className="mainTable__data__column__title">
                                    <div className="mainTable__data__column__title-text">Wózki w Magazynie</div>
                                    <MdForklift className="mainTable__data__column__title-icon"/>
                                </div>
                            </li>
                            {data.map((data, index) => {
                                if (data.status === 'arrived') {
                                    return (
                                        <ForkArrives
                                            key={index}
                                            date={data.formatedFDATE}
                                            shopNumber={data.shopNumber}
                                            serialNumber={data.serialNumber}
                                            prio={data.prio}
                                            id={data.id}
                                        />
                                    );
                                }
                                return null;
                            })}
                        </ul>
                    </div>
                   <div className="mainTable__data__column">
                       <ul>
                           <li>
                               <div className="mainTable__data__column__title">
                                   <div className="mainTable__data__column__title-text">Poczekalnia</div>
                                   <FaScrewdriverWrench className="mainTable__data__column__title-icon"/>
                               </div>
                           </li>
                           {data.map((data, index) => {
                               if (data.status === 'wait') {
                                   return (
                                       <ForksToWait
                                           key={index}
                                           date={data.formatedFDATE}
                                           shopNumber={data.shopNumber}
                                           serialNumber={data.serialNumber}
                                           prio={data.prio}
                                           id={data.id}
                                       />
                                   );
                               }
                               return null;
                           })}
                       </ul>
                   </div>
                    <div className="mainTable__data__column">
                        <ul>
                            <li>
                                <div className="mainTable__data__column__title">
                                    <div className="mainTable__data__column__title-text">Wózki do wysłania</div>
                                    <TiShoppingCart className="mainTable__data__column__title-icon"/>
                                </div>
                            </li>
                            {data.map((data, index) => {
                                if (data.status === 'done') {
                                    return (
                                        <ForksToSend
                                            key={index}
                                            date={data.formatedFDATE}
                                            shopNumber={data.shopNumber}
                                            serialNumber={data.serialNumber}
                                            prio={data.prio}
                                            id={data.id}
                                        />
                                    );
                                }
                                return null;
                            })}
                            <li>
                                <div className="mainTable__data__column__title">
                                    <div className="mainTable__data__column__title-text">Archiwum</div>
                                    <FaBoxArchive className="mainTable__data__column__title-icon"/>
                                </div>
                            </li>
                            {data.map((data, index) => {
                                if (data.status === 'archived') {
                                    return (
                                        <ForkArchive
                                            key={index}
                                            date={data.formatedFDATE}
                                            shopNumber={data.shopNumber}
                                            serialNumber={data.serialNumber}
                                            prio={data.prio}
                                            id={data.id}
                                        />
                                    );
                                }
                                return null;
                            })}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ForkPage;