import React from 'react';

import './ForkListCSS.css'
import ForkPage from "./ForkPage";
const ForkLifterList = ({data, replacementList}) => {
    return (
            <ForkPage
                data={data}
                replacementList={replacementList}
            />
    );
};

export default ForkLifterList;