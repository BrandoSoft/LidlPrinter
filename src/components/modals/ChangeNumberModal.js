import React, { useState } from 'react';
import './ModalCSS.scss'
import { changeShopOrSN } from "../../utils/dbOperations";

const ChangeNumberModal = ({toggleVisible, originalForkId}) => {

    const [inputShop, setInputShop] = useState('');
    const [inputSN, setInputSN] = useState('98');

    return (
        <div className="changeNumberModal">
            <form >
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
                <button onClick={e=> {
                    changeShopOrSN(e,'SN', originalForkId,inputSN)
                    toggleVisible()
                }}>Zmien numer seryjny</button>
            </form>
            <button onClick={()=>toggleVisible()}>Wróć</button>
        </div>
    );
};

export default ChangeNumberModal;