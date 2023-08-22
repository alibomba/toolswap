import { useState, useEffect } from 'react';
import ConversationLink from '../../components/conversationLink/ConversationLink';
import ConversationRoom from '../../components/conversationRoom/ConversationRoom';
import Loading from '../../components/loading/Loading';
import Error from '../../components/error/Error';
import axiosClient from '../../AxiosClient';
import axios from 'axios';

import styles from './chats.module.css';

interface Room {
    roomId: number;
    profilePicture: string | null;
    nickname: string;
    lastMessage: string | null;
    lastMessageIsMine: boolean | null;
    lastMessageDate: string | null;
}

const Chats = () => {
    const [rooms, setRooms] = useState<Room[] | null>(null);
    const [currentRoom, setCurrentRoom] = useState<number | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const source = axios.CancelToken.source();

        axiosClient({
            method: 'get',
            url: '/my-rooms',
            cancelToken: source.token
        })
            .then(res => {
                setRooms(res.data);
                if (res.data.length > 0) {
                    setCurrentRoom(res.data[0].roomId);
                }
            })
            .catch(err => setError('Coś poszło nie tak, spróbuj ponownie później...'))
            .finally(() => setIsLoading(false));


        return () => {
            source.cancel();
        }

    }, []);


    if (error) {
        return <Error>{error}</Error>
    }

    return (
        <>
            {
                isLoading ? <Loading /> :
                    <main className={styles.main}>
                        <aside className={styles.conversations}>
                            {
                                rooms &&
                                    rooms.length > 0 ?
                                    <>
                                        {
                                            rooms.map((room, index) => {
                                                return (
                                                    <ConversationLink
                                                        key={index}
                                                        roomId={room.roomId}
                                                        profilePicture={room.profilePicture}
                                                        nickname={room.nickname}
                                                        lastMessage={room.lastMessage}
                                                        lastMessageIsMine={room.lastMessageIsMine}
                                                        lastMessageDate={room.lastMessageDate}
                                                        setCurrentRoom={setCurrentRoom}
                                                    />
                                                )
                                            })
                                        }
                                    </>
                                    :
                                    <p className={styles.conversations__noResults}>Brak konwersacji</p>
                            }
                        </aside>
                        <ConversationRoom currentRoom={currentRoom} />
                    </main>
            }
        </>
    )
}

export default Chats
