import React from 'react';
import './ShopCard.css';
import JungHako from '../JungHako/JungHako';

const ShopCard = ({ item, onInfoSelect }) => {

    const handleClick = (index, type, action) => {

            onInfoSelect([index, item, action])
    };
    return (
        <div className="item">
            <div className="title">
                <div className="title-name">{item.sklep}</div>
                <button className="return-button" onClick={() => handleClick(null, null, null)}>Zwrot wózka</button>
            </div>
            <div className="adres">
                <div className="szpura"><b>{item.miasto}</b> {item.adres}</div>
                <div className="szpura">
                    {item.szpura.map((e) => {
                    return <b key={e}>{e}</b>
                })}
                    </div>
            </div>
            <div className="button-container">
                <JungHako title="Jungheinrich" data={item} onInfoSelect={onInfoSelect}/>
            </div>

        </div>

    );
};

export default ShopCard;