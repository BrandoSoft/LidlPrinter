import React from 'react';

import './ForkListCSS.css'
import ForkForm from "./ForkForm";
const ForkLifterList = ({data, deleteFORK, updateStatus}) => {
    return (
        <div className='forkContainer'>
            <ForkForm
                data={data}
                deleteFORK={deleteFORK}
                updateStatus={updateStatus}
            />
        </div>
    );
};

export default ForkLifterList;