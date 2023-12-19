import React, { useState } from 'react';

import { MdForklift } from "react-icons/md";
import { TiShoppingCart } from "react-icons/ti";
import { FaBoxArchive, FaScrewdriverWrench} from "react-icons/fa6";
import { FaTruckArrowRight } from "react-icons/fa6";
import { HiOutlineWrenchScrewdriver } from "react-icons/hi2";

import './ForkListCSS.css'
import ForkArrives from "./ForkArrives";
import ForksToSend from "./ForksToSend";
import ForkArchive from "./ForkArchive";

import ForksToWait from "./ForksToWait";
import { addForkToDB, addForkToDBComing } from "../../utils/dbOperations";
import ForkComing from "./ForkComing";

const ForkPage = ({data}) => {

    const [inputShop, setInputShop] = useState('');
    const [inputSN, setInputSN] = useState('98');
    const [inputShopComing, setInputShopComing] = useState('');
    const [inputSNComing, setInputSNComing] = useState('98');
    const [inputReplacement, setInputReplacement] = useState('');
    const [replacementNumber, setReplacementNumber] = useState(0)

    const replaceHandler = (z) =>{
        if(z === replacementNumber){
            setReplacementNumber(0)
        }else{
            setReplacementNumber(z)
        }
    }


    return (
        <div className='forkContainer'>
            <div className="forkList">Lista zastępczych w magazynie:<br/>
                <button className="forkList__button" onClick={()=> replaceHandler(1)}>Z1</button>
                <button className="forkList__button" onClick={()=> replaceHandler(2)}>Z2</button>
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
                <div className={replacementNumber > 0 ? "mainTable__form forkList" : "forkList-closed"}>
                    <button className="forkList__button">{replacementNumber}</button>
                    <form className='mainTable__form__add' onSubmit={e => addForkToDBComing(e, inputSNComing, inputShopComing)}>
                        <input
                            type="number"
                            value={inputShopComing}
                            onChange={e=>setInputShopComing(e.target.value)}
                            placeholder='Sklep'
                            max={2170}
                            className='mainTable__form__add__input input-short'
                            min={1026}
                            inputMode="numeric"
                        />
                        <input
                            type="text"
                            value={inputSNComing}
                            onChange={(e) => {
                                const inputValue = e.target.value;
                                if (/^98\d{0,6}$/.test(inputValue)) {
                                    setInputSNComing(inputValue);
                                }
                            }}
                            placeholder='Numer Seryjny'
                            className='mainTable__form__add__input'
                            maxLength={8} // Maksymalnie 8 znaków (w tym "98")
                            minLength={8}
                            inputMode="numeric"
                        />
                        <button className='mainTable__form__add__button'>DODAJ WÓZEK Z IMS</button>
                        {/*<input*/}
                        {/*    type="number"*/}
                        {/*    value={inputReplacement}*/}
                        {/*    onChange={e=>setInputReplacement(e.target.value)}*/}
                        {/*    placeholder='Zastępczy'*/}
                        {/*    className='mainTable__form__add__input input-short'*/}
                        {/*/>*/}
                    </form>
                </div>
            </div>
            {/*<div className="forkList">Mamy ims i czekamy na:<br/>*/}
            {/*    <button className="forkList__ims">3322</button>*/}
            {/*    <button className="forkList__ims">1254</button>*/}
            {/*    <button className="forkList__ims">1111</button>*/}
            {/*    <button className="forkList__ims">6677</button>*/}

            {/*</div>*/}
            <div className='mainTable'>
                <div className="mainTable__form forkList">
                    <form className='mainTable__form__add' onSubmit={e => addForkToDB(e, inputSN, inputShop)}>
                        <input
                            type="number"
                            value={inputShop}
                            onChange={e=>setInputShop(e.target.value)}
                            placeholder='Sklep'
                            max={2170}
                            className='mainTable__form__add__input input-short'
                            min={1026}
                            inputMode="numeric"
                        />
                        <input
                            type="text"
                            value={inputSN}
                            onChange={(e) => {
                                const inputValue = e.target.value;
                                if (/^98\d{0,6}$/.test(inputValue)) {
                                    setInputSN(inputValue);
                                }
                            }}
                            placeholder='Numer Seryjny'
                            className='mainTable__form__add__input'
                            maxLength={8} // Maksymalnie 8 znaków (w tym "98")
                            minLength={8}
                            inputMode="numeric"
                        />
                        <button className='mainTable__form__add__button'>DODAJ WÓZEK W MAGAZYNIE</button>

                        </form>
                </div>
                <div className="mainTable__data">
                    <div className="mainTable__data__column">
                        <ul>
                            <li>
                                <div className="mainTable__data__column__title">
                                    <div className="mainTable__data__column__title-text">Już jedzie:</div>
                                    <FaTruckArrowRight className="mainTable__data__column__title-icon"/>
                                </div>
                            </li>
                            {data.sort((a, b) => {

                                const dateA = new Date(a.formatedFDATE.split('-').reverse().join('-'));
                                const dateB = new Date(b.formatedFDATE.split('-').reverse().join('-'));

                                return dateB - dateA;
                            }).map((data, index) => {
                                if (data.status === 'coming') {
                                    return (
                                        <ForkComing
                                            key={index}
                                            date={data.formatedFDATE}
                                            leaveDate={data.formatedLeaveDate}
                                            shopNumber={data.shopNumber}
                                            serialNumber={data.serialNumber}
                                            prio={data.prio}
                                            id={data.id}
                                            ims={data.ims}
                                            extendedInfo={data.extendedInfo}
                                        />
                                    );
                                }
                                return null;
                            })}
                            <li>
                                <div className="mainTable__data__column__title">
                                    <div className="mainTable__data__column__title-text">Wózki w Magazynie</div>
                                    <MdForklift className="mainTable__data__column__title-icon"/>
                                </div>
                            </li>
                            {data.sort((a, b) => {

                                const dateA = new Date(a.formatedFDATE.split('-').reverse().join('-'));
                                const dateB = new Date(b.formatedFDATE.split('-').reverse().join('-'));

                                return dateB - dateA;
                            }).map((data, index) => {
                                if (data.status === 'arrived') {
                                    return (
                                        <ForkArrives
                                            key={index}
                                            date={data.formatedFDATE}
                                            leaveDate={data.formatedLeaveDate}
                                            shopNumber={data.shopNumber}
                                            serialNumber={data.serialNumber}
                                            prio={data.prio}
                                            id={data.id}
                                            ims={data.ims}
                                            extendedInfo={data.extendedInfo}
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
                                   <HiOutlineWrenchScrewdriver className="mainTable__data__column__title-icon"/>
                               </div>
                           </li>
                           {data.sort((a, b) => {
                               // Przekształć string w formacie "dd-mm-yyyy" na obiekt daty przed porównaniem
                               const dateA = new Date(a.formatedFDATE.split('-').reverse().join('-'));
                               const dateB = new Date(b.formatedFDATE.split('-').reverse().join('-'));

                               return dateB - dateA;
                           }).map((data, index) => {
                               if (data.status === 'wait') {
                                   return (
                                       <ForksToWait
                                           key={index}
                                           date={data.formatedFDATE}
                                           leaveDate={data.formatedLeaveDate}
                                           shopNumber={data.shopNumber}
                                           serialNumber={data.serialNumber}
                                           prio={data.prio}
                                           id={data.id}
                                           ims={data.ims}
                                           extendedInfo={data.extendedInfo}
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
                            {data.sort((a, b) => {
                                // Przekształć string w formacie "dd-mm-yyyy" na obiekt daty przed porównaniem
                                const dateA = new Date(a.formatedFDATE.split('-').reverse().join('-'));
                                const dateB = new Date(b.formatedFDATE.split('-').reverse().join('-'));

                                return dateB - dateA;
                            }).map((data, index) => {
                                if (data.status === 'done') {
                                    return (
                                        <ForksToSend
                                            key={index}
                                            date={data.formatedFDATE}
                                            leaveDate={data.formatedLeaveDate}
                                            shopNumber={data.shopNumber}
                                            serialNumber={data.serialNumber}
                                            prio={data.prio}
                                            id={data.id}
                                            ims={data.ims}
                                            extendedInfo={data.extendedInfo}
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
                            {data.sort((a, b) => {
                                // Przekształć string w formacie "dd-mm-yyyy" na obiekt daty przed porównaniem
                                const dateA = new Date(a.formatedLeaveDate.split('-').reverse().join('-'));
                                const dateB = new Date(b.formatedLeaveDate.split('-').reverse().join('-'));

                                return dateB - dateA;
                            }).map((data, index) => {
                                if (data.status === 'archived') {
                                    return (
                                        <ForkArchive
                                            key={index}
                                            date={data.formatedFDATE}
                                            leaveDate={data.formatedLeaveDate}
                                            shopNumber={data.shopNumber}
                                            serialNumber={data.serialNumber}
                                            prio={data.prio}
                                            id={data.id}
                                            ims={data.ims}
                                            extendedInfo={data.extendedInfo}
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