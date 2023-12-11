import React, { useState } from 'react';

import './ForkLifterList.css'
import ForkArrives from "./ForkArrives";
import { HiArrowCircleRight } from "react-icons/hi";

import { collection, addDoc, Timestamp } from "firebase/firestore";
import {db} from "../../firebase";

const ForkForm = ({data}) => {

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
                fDate: Timestamp.now(),
                ims: false,
                prio: 11,
                serialNumber: inputSN,
                shopNumber: inputShop
            })
    }

    return (
        <div className='forkFormContainer'>
            <div className="forksAtStock">
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
                    <div className='forkArrivesLi'>
                        <div className='forkArrivesLiIMS'>IMS</div>
                        <div className='forkArrivesLiDate'>DATA</div>
                        <div className='forkArrivesShop'>SKLEP</div>
                        <div className='forkArrivesSN'>SN</div>
                        <div className='forkArrivesPrio'>Priorytet</div>
                        <div className='forkArrivesLiButton'></div>
                    </div>
                </li>
                    {data.map((data, index) =>
                        ( <ForkArrives
                            key={index}
                            date={data.formatedFDATE}
                            shopNumber={data.shopNumber}
                            serialNumber={data.serialNumber}
                            prio={data.prio}
                        />)
                    )}
                </ul>
            </div>
           <div className="forksToSend">
               Forks to send
           </div>
            <div className="forksHistory">
                Fork History
            </div>
            <div className="availableForks">
                list of forks
            </div>
        </div>
    );
};

export default ForkForm;