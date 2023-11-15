import React from 'react';
import Data from '../../data/data2.json'
import ShopCard from "../ShopCard/ShopCard";

import './ShopList.css'


const ShopList = ({onInfoSelect}) => {

    const card = Data.map((item) =>{
      return  <ShopCard key={item.id} item={item} onInfoSelect={onInfoSelect}/>
    })

    return (
        <div className="shoplistContainer">
            {card}
        </div>
    );
};

export default ShopList;