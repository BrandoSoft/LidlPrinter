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
import { log } from "util";
import { da } from "date-fns/locale";

const ForkPage = ({data, replacementList}) => {

    const [inputShop, setInputShop] = useState('');
    const [inputSN, setInputSN] = useState('98');
    const [inputShopIMS, setInputShopIMS] = useState('');
    const [inputSNIMS, setInputSNIMS] = useState('98');
    const [inputShopComing, setInputShopComing] = useState('');
    const [inputSNComing, setInputSNComing] = useState('98');
    const [inputReplacement, setInputReplacement] = useState('');
    const [replacementNumber, setReplacementNumber] = useState(0)
    const [rId, setRId] = useState()

    const replaceHandler = (e, rid) =>{
        setReplacementNumber(e)
        setRId(rid)
    }

    const handleAddForkToDBComing = (e) => {
        addForkToDBComing(e, inputSNComing, inputShopComing, rId, replacementNumber)
        setInputSNComing("98");
        setInputShopComing("");
        setReplacementNumber("");
    }



    return (
        <div className='forkContainer'>
            <div className="forkList">Lista zastępczych w magazynie:<br/>
                {replacementList.sort((a, b) => {
                    const orderA = parseInt(a.order);
                    const orderB = parseInt(b.order);
                    if (orderA < orderB) {
                        return -1;
                    }
                    if (orderA > orderB) {
                        return 1;
                    }
                    return 0;
                }).map((e, index) => {
                    if (!e.isTaken) {

                        return (
                            <button key={index} className="forkList__button" onClick={()=> replaceHandler(e.name, e.rId)}>{e.name}</button>
                        );
                    }
                    return null;
                })}

                <div className={replacementNumber != "" ? "mainTable__form forkList" : "forkList-closed"}>
                    <button className="forkList__button" onClick={()=> replaceHandler("")}>{replacementNumber}</button>
                    <form className='mainTable__form__add' onSubmit={e => handleAddForkToDBComing(e)}>
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
                        <button className='mainTable__form__add__button'>Wyślij wózek</button>
                    </form>
                </div>
            </div>
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
                        <button className='mainTable__form__add__button'>DODAJ WÓZEK Z MAGAZYNU</button>
                        </form>
                </div>
                <div className="mainTable__form forkList">
                    <form className='mainTable__form__add' onSubmit={e => addForkToDBComing(e, inputSNIMS, inputShopIMS)}>
                        <input
                            type="number"
                            value={inputShopIMS}
                            onChange={e=>setInputShopIMS(e.target.value)}
                            placeholder='Sklep'
                            max={2170}
                            className='mainTable__form__add__input input-short'
                            min={1026}
                            inputMode="numeric"
                        />
                        <input
                            type="text"
                            value={inputSNIMS}
                            onChange={(e) => {
                                const inputValue = e.target.value;
                                if (/^98\d{0,6}$/.test(inputValue)) {
                                    setInputSNIMS(inputValue);
                                }
                            }}
                            placeholder='Numer Seryjny'
                            className='mainTable__form__add__input'
                            maxLength={8} // Maksymalnie 8 znaków (w tym "98")
                            minLength={8}
                            inputMode="numeric"
                        />
                        <button className='mainTable__form__add__button'>DODAJ WÓZEK Z IMS</button>
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
                                            replacement={data.replacement}
                                            replacementId={data.replacementId}
                                            replacementList={replacementList}
                                            inspection={data.inspection}
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
                                            replacement={data.replacement}
                                            replacementId={data.replacementId}
                                            replacementList={replacementList}
                                            inspection={data.inspection}
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
                                           replacement={data.replacement}
                                           replacementId={data.replacementId}
                                           replacementList={replacementList}
                                           inspection={data.inspection}
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
                                            replacement={data.replacement}
                                            replacementId={data.replacementId}
                                            replacementList={replacementList}
                                            inspection={data.inspection}
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
                                            replacement={data.replacement}
                                            replacementId={data.replacementId}
                                            replacementList={replacementList}
                                            inspection={data.inspection}
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