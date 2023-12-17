import React from 'react';

import { FaBoxArchive, FaScrewdriverWrench} from "react-icons/fa6";
import { toggleIMS, updateStatus } from "../../utils/dbOperations";
import { MdForklift } from "react-icons/md";
import { HiOutlineWrenchScrewdriver } from "react-icons/hi2";

const ForksToSend = ({serialNumber,shopNumber, date, leaveDate, prio, id, ims}) => {
    return (
        <div>
            <li>
                <div className='forkCard'>
                    <div className='forkCard__ims'>
                        <p>IMS</p>
                        <input type='checkbox' onChange={() =>toggleIMS(id, ims)} checked={ims? 'checked' : ''}/>
                    </div>
                    <div className="forkCard__shop">
                        <div className='forkCard__shop__number'>{shopNumber}</div>
                        <div className='forkCard__shop__SN'>{serialNumber}</div>
                    </div>
                    <div className="forkCard__nav">
                        <div className='forkCard__nav__date'>
                            <div className="forkCard__nav__date__in">P:{date}</div>
                            <div className="forkCard__nav__date__out">W:{leaveDate}</div>
                        </div>
                        <div className='forkCard__nav__buttons'>
                               <div className='forkCard__nav__buttons__button' onClick={()=> updateStatus(id, "arrived")}><MdForklift /> </div>
                               <div className='forkCard__nav__buttons__button' onClick={()=> updateStatus(id, "wait")}><HiOutlineWrenchScrewdriver /> </div>
                               <div className='forkCard__nav__buttons__button' onClick={()=> updateStatus(id, "archived")}><FaBoxArchive /> </div>
                        </div>
                    </div>
                </div>
            </li>
        </div>
    );
};

export default ForksToSend;