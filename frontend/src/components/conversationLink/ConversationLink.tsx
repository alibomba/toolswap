import { Link } from 'react-router-dom';

import styles from './conversationLink.module.css';
import offerDateFormat from '../../utilities/offerDateFormat';

interface Props {
    roomId: number;
    profilePicture: string | null;
    nickname: string;
    lastMessage: string | null;
    lastMessageIsMine: boolean | null;
    lastMessageDate: string | null;
    setCurrentRoom: React.Dispatch<React.SetStateAction<number | null>>;
}

const ConversationLink = ({ roomId, profilePicture, nickname, lastMessage, lastMessageIsMine, lastMessageDate, setCurrentRoom }: Props) => {
    return (
        <div onClick={() => setCurrentRoom(roomId)} tabIndex={0} className={styles.conversation}>
            <img className={styles.conversation__img} src={profilePicture ? `${process.env.REACT_APP_API_URL}/storage/pfp/${profilePicture}` : 'img/default-pfp.png'} alt={`zdjęcie profilowe użytkownika ${nickname}`} />
            <div className={styles.conversation__right}>
                <p className={styles.conversation__name}>{nickname}</p>
                {
                    lastMessage ?
                        <>
                            <p className={styles.conversation__lastMessage}>{lastMessageIsMine === true && 'Ty: '}{lastMessage.length > 15 ? `${lastMessage.substring(0, 15)}...` : lastMessage}</p>
                            <p className={styles.conversation__date}>{offerDateFormat(lastMessageDate!)}</p>
                        </>
                        :
                        <p className={styles.conversation__lastMessage}>Brak wiadomości</p>
                }
            </div>
        </div>
    )
}

export default ConversationLink
