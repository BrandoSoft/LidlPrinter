import React, { useState } from 'react';

import './ForkListCSS.css'
import ForkArrives from "./ForkArrives";

import { collection, addDoc, Timestamp } from "firebase/firestore";
import {db} from "../../firebase";
import ForksToSend from "./ForksToSend";
import ForkArchive from "./ForkArchive";

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
                <ul> <li>
                    <div className='mainTable__column'>
                        <div className='forkArrivesLiIMS'>IMS</div>
                        <div className='forkArrivesLiDate'>DATA</div>
                        <div className='forkArrivesShop'>SKLEP</div>
                        <div className='forkArrivesSN'>SN</div>
                        <div className='forkArrivesPrio'>Priorytet</div>
                        <div className='forkArrivesLiButton'></div>
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
                       <div className='forkArrivesLi'>
                           <div>Wózki do wysłania</div>
                       </div>
                   </li>
                   <li>
                   <div className='forkArrivesLi'>
                       <div className='forkArrivesLiIMS'>IMS</div>
                       <div className='forkArrivesLiDate'>DATA</div>
                       <div className='forkArrivesShop'>SKLEP</div>
                       <div className='forkArrivesSN'>SN</div>
                       <div className='forkArrivesPrio'>Priorytet</div>
                       <div className='forkArrivesLiButton'></div>
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
                        <div className='forkArrivesLi'>
                            <div>Archiwum wózków</div>
                        </div>
                    </li>
                    <li>
                        <div className='forkArrivesLi'>
                            <div className='forkArrivesLiIMS'>IMS</div>
                            <div className='forkArrivesLiDate'>DATA</div>
                            <div className='forkArrivesShop'>SKLEP</div>
                            <div className='forkArrivesSN'>SN</div>
                            <div className='forkArrivesPrio'>Priorytet</div>
                            <div className='forkArrivesLiButton'></div>
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
                                    deleteFORK={deleteFORK}
                                    updateStatus={updateStatus}
                                />
                            );
                        }
                        return null; // Dodaj ten null, aby uniknąć błędu kompilacji
                    })}
                </ul>
            </div>
            <div className="mainTable__column-forkStock">
                list of forks
            </div>
        </div>
    );
};

export default ForkForm;