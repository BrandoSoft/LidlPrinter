import { FaStar, FaRegStar,FaPlusCircle,FaMinusCircle  } from "react-icons/fa";
import React from "react";
import { updatePrio } from "./dbOperations";

export const priorityStarGenerator = (starsToCheck, id) => {

    const stars = starsToCheck > 5 ?  5 : starsToCheck;

    const filledStars = Array.from({ length: stars }, (_, index) => (
        <FaStar key={index} />
    ));
    const emptyStars = Array.from({ length: 5 - stars }, (_, index) => (
        <FaRegStar key={index} />
    ));

    return (
        <div className='forkCard__shop__prio'>
            <FaMinusCircle onClick={()=>updatePrio(id, stars - 1)} className='forkCard__shop__prio-minus'/>
            {filledStars}
            {emptyStars}
            <FaPlusCircle onClick={()=>updatePrio(id,stars +1 )} className='forkCard__shop__prio-plus'/>
        </div>
    );
};
