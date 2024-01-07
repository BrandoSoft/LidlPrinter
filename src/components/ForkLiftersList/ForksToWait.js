import React, { useEffect, useState } from 'react';
import { TiShoppingCart } from "react-icons/ti";
import { FaBoxArchive, FaFileArrowDown, FaPencil } from "react-icons/fa6";
import { MdForklift } from "react-icons/md";
import { priorityStarGenerator } from "../../utils/PriorityStars";
import { toggleIMS, updateExtendedInfo, updateStatus } from "../../utils/dbOperations";
import './ForkListCSS.css';

const ForkArrives = ({ serialNumber, shopNumber, date, leaveDate, prio, id, ims, extendedInfo, replacement }) => {
    const [userExtendedInfo, setUserExtendedInfo] = useState('');
    const [extendedInfoVisibility, setExtendedInfoVisibility] = useState(false);

    useEffect(() => {
        setUserExtendedInfo(extendedInfo);
    }, [extendedInfo]);

    return (
        <div>
            <li>
                <div className='forkCard'>
                    <div className='forkCard__ims'>
                        <div>IMS</div>
                        <input
                            type='checkbox'
                            onChange={() => toggleIMS(id, ims)}
                            checked={ims ? 'checked' : ''}
                        />
                        <FaFileArrowDown
                            className={extendedInfoVisibility ? 'forkCard__ims__icon-reversed' : 'forkCard__ims__icon'}
                            onClick={() => setExtendedInfoVisibility(!extendedInfoVisibility)}
                        />
                    </div>
                    <div className="forkCard__shop">
                        <div className='forkCard__shop__number'>
                            {shopNumber}
                            {replacement &&  <button className="forkList__button forkList__button-green">{replacement}</button>}
                        </div>
                        <div className='forkCard__shop__SN'>{serialNumber}</div>
                        {priorityStarGenerator(prio, id)}
                    </div>
                    <div className="forkCard__nav">
                        <div className='forkCard__nav__date'>
                            <div className="forkCard__nav__date__in">P:{date}</div>
                            <div className="forkCard__nav__date__out">W:{leaveDate}</div>
                        </div>
                        <div className='forkCard__nav__buttons'>
                            <div className='forkCard__nav__buttons__button' onClick={() => updateStatus(id, "arrived")}><MdForklift /></div>
                            <div className='forkCard__nav__buttons__button' onClick={() => updateStatus(id, "done")}><TiShoppingCart /> </div>
                            <div className='forkCard__nav__buttons__button' onClick={() => updateStatus(id, "archived")}><FaBoxArchive /> </div>
                        </div>
                    </div>
                </div>
                <div className={extendedInfoVisibility ? 'forkCard__extended' : 'forkCard__extended-closed'}>
                    {extendedInfo !== '' ?
                        <>
                            <div className="forkCard__extended__message">
                                {userExtendedInfo}
                            </div>
                            <div  className="forkCard__extended__icon">
                                <FaPencil onClick={(e)=>updateExtendedInfo(e,id, '')}/>
                            </div>

                        </>
                        :
                        <>
                            <form
                                onSubmit={(e) => updateExtendedInfo(e, id, userExtendedInfo)}
                                className="forkCard__extended__form"
                            >
                                <input
                                    className="forkCard__extended__form__input"
                                    type="text"
                                    value={userExtendedInfo}
                                    placeholder="dodatkowe info"
                                    onChange={(e) => setUserExtendedInfo(e.target.value)}
                                />
                                <button
                                    type="submit"
                                    className="forkCard__extended__form__button"
                                > + </button>
                            </form>
                        </>}
                </div>
            </li>
        </div>
    );
};

export default ForkArrives;