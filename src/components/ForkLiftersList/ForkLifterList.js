import React from 'react';

import './ForkLifterList.css'
import ForkForm from "./ForkForm";
const ForkLifterList = ({data}) => {
    return (
        <div className='ForkContainer'>
            <ForkForm data={data}/>
        </div>
    );
};

export default ForkLifterList;