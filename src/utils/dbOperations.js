// Update Status (move between tables)

import { addDoc, collection, deleteDoc, doc, Timestamp, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

export const updateStatus = async (id, forkStatus) =>{
   if(forkStatus === "archived"){
       await updateDoc(doc(db, process.env.REACT_APP_FORKS_DB, id), {
           status: forkStatus,
           leaveDate: Timestamp.now()
       })
   }
    if(forkStatus === "arrivedFromComing") {
        await updateDoc(doc(db, process.env.REACT_APP_FORKS_DB, id), {
            status: "arrived",
            fDate: Timestamp.now(),
                })
        return ''
    }

    await updateDoc(doc(db, process.env.REACT_APP_FORKS_DB, id), {
        status: forkStatus
    })
}

export const updatePrio = async (id, updatedPrio) =>{

    let starChecker = updatedPrio;

    if(updatedPrio >= 5) starChecker = 5;
    if(updatedPrio <= 0) starChecker = 0;

    await updateDoc(doc(db, process.env.REACT_APP_FORKS_DB, id), {
        prio: starChecker
    })
}

export const updateExtendedInfo = async (e, id, message) =>{
    e.preventDefault(e)

   await updateDoc(doc(db,process.env.REACT_APP_FORKS_DB, id), {
       extendedInfo: message
    })
}

export const addForkToDB = async (e,inputSN, inputShop) => {
    e.preventDefault(e)

    if (inputSN === '' || inputShop === '') {
        alert('Wprowadź numer seryjny i numer sklepu');
        return
    }
    await addDoc(collection(db, process.env.REACT_APP_FORKS_DB),
        {
            status: 'arrived',
            fDate: Timestamp.now(),
            leaveDate: null,
            ims: false,
            prio: 0,
            serialNumber: inputSN,
            shopNumber: inputShop,
            extendedInfo:'',
        })
}
export const addForkToDBComing = async (e,inputSN, inputShop) => {
    e.preventDefault(e)

    if (inputSN === '' || inputShop === '') {
        alert('Wprowadź numer seryjny i numer sklepu');
        return
    }
    await addDoc(collection(db, process.env.REACT_APP_FORKS_DB),
        {
            status: 'coming',
            fDate: Timestamp.now(),
            leaveDate: null,
            ims: true,
            prio: 0,
            serialNumber: inputSN,
            shopNumber: inputShop,
            extendedInfo:'',
        })
}

// Delete Data from Firebase
export const deleteFORK = async (id)=>{
    await deleteDoc(doc(db,process.env.REACT_APP_FORKS_DB, id))
}

export const toggleIMS = async (id, status)=>{
    await updateDoc(doc(db, process.env.REACT_APP_FORKS_DB, id),{
        ims: !status
    })
}