import './App.css';
import ShopList from "./components/ShopList/ShopList";
import PrintPage from "./components/PrintPage/PrintPage";
import React, { useState, useEffect } from 'react';
import TopBar from "./components/TopBar/TopBar";
import ForkLifterList from "./components/ForkLiftersList/ForkLifterList";

import { db } from "./firebase";
import {query, collection, onSnapshot, deleteDoc,doc, updateDoc} from 'firebase/firestore'
import { format } from 'date-fns';


function App() {
    const [selectedInfo, setSelectedInfo] = useState(null);
    const [isShopListVisible, setShopListVisible] = useState(false);
    const [isForkLiftersListVisible, setForkLiftersList] = useState(true);
    const [forksIN, setForksIN]= useState([])

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
// Read data from Firebase
    useEffect(()=>{
        const q = query(collection(db, 'forks'))

        const unsubscribe = onSnapshot(q, (querySnapshot)=>{
            let forksArr = []
            // querySnapshot.forEach((doc) => {
            //     forksArr.push({...doc.data(), id: doc.id})
            // });
            querySnapshot.forEach((doc) => {
                const data = doc.data();

                //upraszczamy
                //const timestampObject = doc.data().fDate
                //const milliseconds = timestampObject.seconds * 1000 + Math.round(timestampObject.nanoseconds / 1000000);
                //const fDate = new Date(milliseconds)
                //nowa wersja:

                const formatedFDATE = format(new Date(doc.data().fDate.seconds * 1000 + Math.round(doc.data().fDate.nanoseconds / 1000000)), 'dd-MM-yyyy');

                forksArr.push({...doc.data(), formatedFDATE, id: doc.id})

            });
            setForksIN(forksArr)
        })
        return () => unsubscribe();
    }, [])

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
                {isForkLiftersListVisible &&
                    <ForkLifterList
                        data={forksIN}
                    />
                }
            </div>
        </div>
    );
}

export default App;
