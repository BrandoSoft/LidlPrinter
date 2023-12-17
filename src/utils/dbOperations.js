// Update Status (move between tables)

import { addDoc, collection, deleteDoc, doc, Timestamp, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

export const updateStatus = async (id, forkStatus) =>{
   if(forkStatus === "archived"){
       await updateDoc(doc(db, 'forks', id), {
           status: forkStatus,
           leaveDate: Timestamp.now()
       })
   }

    await updateDoc(doc(db, 'forks', id), {
        status: forkStatus
    })
}

export const updatePrio = async (id, updatedPrio) =>{

    let starChecker = updatedPrio;

    if(updatedPrio >= 5) starChecker = 5;
    if(updatedPrio <= 0) starChecker = 0;

    await updateDoc(doc(db,'forks', id), {
        prio: starChecker
    })
}

export const updateExtendedInfo = async (e, id, message) =>{
    e.preventDefault(e)

   await updateDoc(doc(db,'forks', id), {
       extendedInfo: message
    })
}

export const addForkToDB = async (e,inputSN, inputShop) => {
    e.preventDefault(e)

    if (inputSN === '' || inputShop === '') {
        alert('Wprowadź numer seryjny i numer sklepu');
        return
    }
    await addDoc(collection(db, 'forks'),
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

// Delete Data from Firebase
export const deleteFORK = async (id)=>{
    await deleteDoc(doc(db,'forks', id))
}

export const toggleIMS = async (id, status)=>{
    await updateDoc(doc(db, 'forks', id),{
        ims: !status
    })
}