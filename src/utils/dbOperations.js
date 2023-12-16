// Update Status (move between tables)

import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

const updateStatus = async (id, forkStatus) =>{
    await updateDoc(doc(db, 'forks', id), {
        status: forkStatus
    })
}

export const updatePrio = async (id, updatedPrio) =>{

    let starChecker = updatedPrio;

    if(updatedPrio >= 5) starChecker = 5;
    if(updatedPrio <= 1) starChecker = 1;


    await updateDoc(doc(db, 'forks', id), {
        prio: starChecker
    })

    console.log(starChecker)
}