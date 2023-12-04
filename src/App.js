import './App.css';
import ShopList from "./components/ShopList/ShopList";
import PrintPage from "./components/PrintPage/PrintPage";
import React, { useState, useEffect } from 'react';
import TopBar from "./components/TopBar/TopBar";
import ForkLifterList from "./components/ForkLiftersList/ForkLifterList";


function App() {
    const [selectedInfo, setSelectedInfo] = useState(null);
    const [isShopListVisible, setShopListVisible] = useState(false);
    const [isForkLiftersListVisible, setForkLiftersList] = useState(true);
    const [fakeData, setFakeData]= useState([
        {   date: '11.12.2023',
            shopNumber: 1239,
            serialNumber: 1122121212121
        },
        {   date: '11.12.2023',
            shopNumber: 1111,
            serialNumber: 11221231231
        },
    ])

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

    const handleForkLiftList = () => {
        setForkLiftersList((prevVisible) => !prevVisible);
    };

    return (
        <div>
            {selectedInfo && <PrintPage info={selectedInfo} />}
            <div className="container">
                <TopBar
                    title="Drukarka"
                    onToggleShopList={handleToggleShopList}
                    isShopListVisible={isShopListVisible}
                    type='printer'
                />
                {isShopListVisible && <ShopList onInfoSelect={handleInfoSelection} />}
                <TopBar
                    title="Wózki na magazynie"
                    onToggleForkLiftlist={handleForkLiftList}
                    isForkLiftersListVisible={isForkLiftersListVisible}
                    type='forklifter'
                />
                {isForkLiftersListVisible && <ForkLifterList data={fakeData}/>}
            </div>
        </div>
    );
}

export default App;
