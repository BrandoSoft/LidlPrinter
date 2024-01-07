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
    const [replacement,  setReplacement] = useState([])

    useEffect(() => {
        const q = query(collection(db, process.env.REACT_APP_REPLACEMENT_FORK_DB))

        const unsubscribe = onSnapshot(q, (querySnapshot)=>{
            let replacementArr = []
            // querySnapshot.forEach((doc) => {
            //     forksArr.push({...doc.data(), id: doc.id})
            // });
            querySnapshot.forEach((doc) => {

                replacementArr.push({...doc.data(), rId :doc.id})

            });
            setReplacement(replacementArr)
        })
        return () => unsubscribe();
    }, []);

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
        const q = query(collection(db, process.env.REACT_APP_FORKS_DB))

        const unsubscribe = onSnapshot(q, (querySnapshot)=>{
            let forksArr = []

            querySnapshot.forEach((doc) => {
                const data = doc.data();
                let formatedLeaveDate = ""

                const formatedFDATE = format(new Date(doc.data().fDate.seconds * 1000 + Math.round(doc.data().fDate.nanoseconds / 1000000)), 'dd-MM-yyyy');

                if(doc.data().leaveDate !== null){
                    formatedLeaveDate = format(new Date(doc.data().leaveDate.seconds * 1000 + Math.round(doc.data().leaveDate.nanoseconds / 1000000)), 'dd-MM-yyyy');
                }

                forksArr.push({...doc.data(), formatedFDATE, id: doc.id, formatedLeaveDate})

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
                        replacementList={replacement}
                    />
                }
            </div>
        </div>
    );
}

export default App;
