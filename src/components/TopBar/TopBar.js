import React from 'react';

import { HiArrowCircleDown, HiArrowCircleUp } from "react-icons/hi";

import './TopBar.css'
const TopBar = ({title,onToggleShopList, isShopListVisible,onToggleForkLiftlist, type, isForkLiftersListVisible}) => {
    return (
        <div className="BarContainer">
            <div className="BarContainerTitle">{title}</div>
            {type === 'printer' ? <div className="BarContainerIcon" onClick={onToggleShopList}>
                {isShopListVisible ? <HiArrowCircleUp /> : <HiArrowCircleDown />}
            </div>:
            <div className="BarContainerIcon" onClick={onToggleForkLiftlist}>
                {isForkLiftersListVisible ? <HiArrowCircleUp /> : <HiArrowCircleDown />}
            </div>}

        </div>
    );
};

export default TopBar;