// Update Status (move between tables)

import { addDoc, collection, deleteDoc, doc, Timestamp, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

export const updateStatus = async (id, forkStatus, replacement) =>{
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
            replacement: replacement
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
            replacement: '',
            replacementId: '',
            inspection: false,
        })
}
export const addForkToDBComing = async (e,inputSN, inputShop, rid, replacementNumber) => {
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
            replacement: replacementNumber ? replacementNumber : '',
            replacementId: rid ? rid : '',
            inspection: false
        })
    if(rid){
        await updateDoc(doc(db, process.env.REACT_APP_REPLACEMENT_FORK_DB, rid),{
            isTaken: true
        })
    }


}

// Delete Data from Firebase
export const deleteFORK = async (forkId, replacementId)=>{
    await deleteDoc(doc(db,process.env.REACT_APP_FORKS_DB, forkId))

    if(replacementId){
        await updateDoc(doc(db, process.env.REACT_APP_REPLACEMENT_FORK_DB,replacementId),{
            isTaken: false
        })
    }
}

// Changing IMS

export const toggleIMS = async (id, status)=>{
    await updateDoc(doc(db, process.env.REACT_APP_FORKS_DB, id),{
        ims: !status
    })
}

// Changing IMS > INSPECTION

export const toggleInspection = async (id, status)=>{
    await updateDoc(doc(db, process.env.REACT_APP_FORKS_DB, id),{
        inspection: status
    })
    console.log(id, status)
}

// Move Returned Replacement fork to available

export const returnReplacementForkToAvailable = async (replacementId, forkId) =>{
    await updateDoc(doc(db, process.env.REACT_APP_REPLACEMENT_FORK_DB,replacementId),{
        isTaken: false
    })
    await updateDoc(doc(db, process.env.REACT_APP_FORKS_DB, forkId),{
        replacement: ""
    })

}


// Change replacement fork in forkCard

export const swapReplacementFork = async (originalReplacementId, newReplacementId, originalForkId, newReplacementName) =>{
    // change old replacement to true (is avaible)
    if(originalReplacementId){
        await updateDoc(doc(db, process.env.REACT_APP_REPLACEMENT_FORK_DB,originalReplacementId),{
            isTaken: false
        })
    }

    // change new replacement to false (is not avaible)
    await updateDoc(doc(db, process.env.REACT_APP_REPLACEMENT_FORK_DB,newReplacementId),{
        isTaken: true
    })
    // change replacementName in fork list
    await updateDoc(doc(db, process.env.REACT_APP_FORKS_DB, originalForkId),{
        replacement: newReplacementName,
        replacementId: newReplacementId
    })
}

// Change Shop Number or Serial Number

export const changeShopOrSN = async (e,type, forkId, newSN) =>{
    e.preventDefault(e)
console.log(forkId)
    await updateDoc(doc(db, process.env.REACT_APP_FORKS_DB, forkId),{
        serialNumber: newSN
    })
}