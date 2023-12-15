import React, { useState } from 'react';

import './ForkListCSS.css'
import ForkArrives from "./ForkArrives";

import { collection, addDoc, Timestamp } from "firebase/firestore";
import {db} from "../../firebase";
import ForksToSend from "./ForksToSend";
import ForkArchive from "./ForkArchive";

import { FaRegStar } from "react-icons/fa";
import { FaStar } from "react-icons/fa6";
import ForksToWait from "./ForksToWait";

const ForkForm = ({data,deleteFORK, updateStatus}) => {

    const [inputShop, setInputShop] = useState('');
    const [inputSN, setInputSN] = useState('');

// Create Data

    const addForkToDB = async (e) => {
        e.preventDefault(e)

        if (inputSN === '' || inputShop === '') {
            alert('Wprowadź numer seryjny i numer sklepu');
            return
        }
        await addDoc(collection(db, 'forks'),
            {
                status: 'arrived',
                fDate: Timestamp.now(),
                ims: false,
                prio: 11,
                serialNumber: inputSN,
                shopNumber: inputShop
            })
    }

    return (
        <div className='forkContainer'>
            <div className="forkList">lista zastępczych</div>
            <div className='mainTable'>
                <div className="mainTable__column">
                    <form className='forkFormAddForm' onSubmit={addForkToDB}>
                        <input
                            type="number"
                            value={inputShop}
                            onChange={e=>setInputShop(e.target.value)}
                            placeholder='Sklep'
                        />
                        <input
                            type="number"
                            value={inputSN}
                            onChange={e=>setInputSN(e.target.value)}
                            placeholder='Numer Seryjny'
                        />
                        <button>+</button>
                    </form>
                    <ul>
                        <li>
                            <div className="mainTable__column__title">Nowe wózki w WH</div>
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
                                        deleteFORK={deleteFORK}
                                        updateStatus={updateStatus}
                                    />
                                );
                            }
                            return null; // Dodaj ten null, aby uniknąć błędu kompilacji
                        })}
                    </ul>
                </div>
               <div className="mainTable__column">
                   <ul>
                       <li>
                           <div className="mainTable__column__title">Poczekalnia</div>
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
                                       deleteFORK={deleteFORK}
                                       updateStatus={updateStatus}
                                   />
                               );
                           }
                           return null; // Dodaj ten null, aby uniknąć błędu kompilacji
                       })}

                       <li>
                           <div className="mainTable__column__title">Wózki do wysłania</div>
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
                                       deleteFORK={deleteFORK}
                                       updateStatus={updateStatus}
                                   />
                               );
                           }
                           return null; // Dodaj ten null, aby uniknąć błędu kompilacji
                       })}
                   </ul>
               </div>
                <div className="mainTable__column">
                    <ul>
                        <li>
                            <div className="mainTable__column__title">Archiwum wózków</div>
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
                                        deleteFORK={deleteFORK}
                                        updateStatus={updateStatus}
                                    />
                                );
                            }
                            return null; // Dodaj ten null, aby uniknąć błędu kompilacji
                        })}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default ForkForm;