import './App.css';
import ShopList from "./components/ShopList/ShopList";
import PrintPage from "./components/PrintPage/PrintPage";
import React, { useState, useEffect } from 'react';


function App() {
    const [selectedInfo, setSelectedInfo] = useState(null);

    useEffect(() => {
        if (selectedInfo) {
            window.print();
        }
    }, [selectedInfo]);

    const handleInfoSelection = (info) => {
        setSelectedInfo(null);
        setSelectedInfo(info);
    };

    return (
        <div>
            {selectedInfo && <PrintPage info={selectedInfo} />}
            <div className="container">
                <ShopList onInfoSelect={handleInfoSelection}/>
            </div>
        </div>
    );
}

export default App;
