import React from 'react';

import './ForkListCSS.css'
import ForkForm from "./ForkForm";
const ForkLifterList = ({data, deleteFORK, updateStatus}) => {
    return (

            <ForkForm
                data={data}
                deleteFORK={deleteFORK}
                updateStatus={updateStatus}
            />

    );
};

export default ForkLifterList;