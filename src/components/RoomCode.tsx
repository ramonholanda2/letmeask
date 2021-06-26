import copyImg from '../assets/images/copy.svg';

import '../styles/roomCode.scss';

interface RoomCodeProps {
    code: string;
}

const RoomCode = (props: RoomCodeProps) => {
    function copyRoomCopyToClipboard() {
        navigator.clipboard.writeText(props.code);
    }

    return (
        <button className='roomCode' onClick={copyRoomCopyToClipboard}>
            <div>
                <img src={copyImg} alt="copy room code" />
            </div>
            <span>sala {props.code}</span>
        </button>
    )
}

export default RoomCode
