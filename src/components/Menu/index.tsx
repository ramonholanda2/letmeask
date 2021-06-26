import React from 'react'
import { useParams } from 'react-router-dom';
import { AiFillCloseCircle } from 'react-icons/ai';

import ActivateDarkMode from '../ActivateDarkMode'
import RoomCode from '../RoomCode';
import { useDarkModeContext } from '../../contexts/DarkModeContext';

import './styles.scss';


type ParamsProps = {
    id: string;
}

const Menu = () => {
    const { darkMode, toggleRenderMenu } = useDarkModeContext();
    const params = useParams<ParamsProps>();
    const roomID = params.id

    return (
        <div className={`menu ${darkMode && "darkMode"}`}>
            <span>
                <AiFillCloseCircle onClick={toggleRenderMenu} size='2.3rem' color='white'/> 
            </span>
            <div>
                <ActivateDarkMode />
                <RoomCode code={roomID} />
            </div>
        </div>
    )
}

export default Menu
