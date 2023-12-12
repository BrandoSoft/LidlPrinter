import React from 'react';

import './ForkLifterList.css'
import ForkForm from "./ForkForm";
const ForkLifterList = ({data, deleteFORK, updateStatus}) => {
    return (
        <div className='ForkContainer'>
            <ForkForm
                data={data}
                deleteFORK={deleteFORK}
                updateStatus={updateStatus}
            />
        </div>
    );
};

export default ForkLifterList;