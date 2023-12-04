import './App.css';
import ShopList from "./components/ShopList/ShopList";
import PrintPage from "./components/PrintPage/PrintPage";
import React, { useState, useEffect } from 'react';
import TopBar from "./components/TopBar/TopBar";


function App() {
    const [selectedInfo, setSelectedInfo] = useState(null);
    const [isShopListVisible, setShopListVisible] = useState(true);

    useEffect(() => {
        if (selectedInfo) {
            window.print();
        }
    }, [selectedInfo]);

    const handleInfoSelection = (info) => {
        setSelectedInfo(null);
        setSelectedInfo(info);
    };

    const handleToggleShopList = () => {
        setShopListVisible((prevVisible) => !prevVisible);
    };

    return (
        <div>
            {selectedInfo && <PrintPage info={selectedInfo} />}
            <div className="container">
                <TopBar
                    title="Drukarka"
                    onToggleShopList={handleToggleShopList}
                    isShopListVisible={isShopListVisible}
                />
                {isShopListVisible && <ShopList onInfoSelect={handleInfoSelection} />}
            </div>
        </div>
    );
}

export default App;
