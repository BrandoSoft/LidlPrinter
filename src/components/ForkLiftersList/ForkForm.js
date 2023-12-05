import React from 'react';

import './ForkLifterList.css'
import ForkArrives from "./ForkArrives";
import { HiArrowCircleRight } from "react-icons/hi";

const ForkForm = ({data}) => {
    return (
        <div className='forkFormContainer'>
            <div className="forksAtStock">
                <form className='forkFormAddForm'>
                    <input type="number" placeholder='Sklep'/>
                    <input type="number" placeholder='Numer Seryjny'/>
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
                            date={data.date}
                            shopNumber={data.shopNumber}
                            serialNumber={data.serialNumber}
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