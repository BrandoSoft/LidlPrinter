import React from 'react';

import { HiArrowCircleDown, HiArrowCircleUp } from "react-icons/hi";

import './TopBar.css'
const TopBar = ({title,onToggleShopList, isShopListVisible}) => {
    return (
        <div className="BarContainer">
            <div className="BarContainerTitle">{title}</div>
            <div className="BarContainerIcon" onClick={onToggleShopList}>
                {isShopListVisible ? <HiArrowCircleUp /> : <HiArrowCircleDown />}
            </div>

        </div>
    );
};

export default TopBar;