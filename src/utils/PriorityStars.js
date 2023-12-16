import { FaStar, FaRegStar } from "react-icons/fa";
import React from "react";

export const priorityStarGenerator = (starsToCheck, id) => {

    const stars = starsToCheck > 5 ?  5 : starsToCheck;

    const filledStars = Array.from({ length: stars }, (_, index) => (
        <FaStar key={index} />
    ));
    const emptyStars = Array.from({ length: 5 - stars }, (_, index) => (
        <FaRegStar key={index} />
    ));

    return (
        <div className='forkCard__shop__prio' onClick={() => console.log(id)}>
            {filledStars}
            {emptyStars}
        </div>
    );
};
