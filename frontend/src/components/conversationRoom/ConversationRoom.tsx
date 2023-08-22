import { useState, useEffect, useRef } from 'react';

import { IoSend } from 'react-icons/io5';
import styles from './conversationRoom.module.css';
import axiosClient from '../../AxiosClient';
import axios from 'axios';
import Error from '../error/Error';
import offerDateFormat from '../../utilities/offerDateFormat';

declare global {
    interface Window {
        myId: number;
    }
}

interface Props {
    currentRoom: number | null;
}

interface Message {
    isMine: boolean;
    content: string;
    created_at: string;
}

interface EventMessage {
    id: number;
    room_id: number;
    sender_id: number;
    content: string;
    created_at: string;
    updated_at: string;
}

const ConversationRoom = ({ currentRoom }: Props) => {
    const messageContainerRef = useRef<HTMLDivElement>(null);
    const [messages, setMessages] = useState<Message[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (currentRoom) {
            messageContainerRef.current!.scrollTop = messageContainerRef.current!.scrollHeight;
            const channel = window.Echo.channel(`messages.${currentRoom}`);
            channel.listen('MessageEvent', (message: EventMessage) => {
                if (message.sender_id !== window.myId) {
                    setMessages(prev => {
                        return [...prev, { isMine: false, content: message.content, created_at: message.created_at }]
                    });
                }
            });
            const source = axios.CancelToken.source();

            axiosClient({
                method: 'get',
                url: `/messages-for-room/${currentRoom}`,
                cancelToken: source.token
            })
                .then(res => {
                    setMessages(res.data);
                    axiosClient({
                        method: 'get',
                        url: '/me',
                        cancelToken: source.token
                    })
                        .then(res => {
                            window.myId = res.data.id;
                        })
                        .catch(err => setError('Coś poszło nie tak, spróbuj ponownie później...'));

                })
                .catch(err => setError('Coś poszło nie tak, spróbuj ponownie później...'));

            return () => {
                source.cancel();
                channel.stopListening('MessageEvent');
            }
        }
    }, [currentRoom]);

    function sendMessage(e: React.FormEvent): void {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const message = form.querySelector('#message') as HTMLInputElement;

        if (message.value) {
            axiosClient({
                method: 'post',
                url: '/messages',
                data: {
                    roomId: currentRoom,
                    message: message.value
                }
            })
                .then(res => {
                    form.reset();
                    setMessages(prev => {
                        return [...prev, res.data];
                    })
                })
                .catch(err => setError('Coś poszło nie tak, spróbuj ponownie później...'));

        }
    }

    if (error) {
        return <Error>{error}</Error>
    }

    return (
        <>
            {
                currentRoom ?
                    <main className={styles.room}>
                        <div ref={messageContainerRef} className={styles.messages}>
                            {
                                messages.length > 0 &&
                                <>
                                    {
                                        messages.map((message, index) => {
                                            return <p className={`${styles.message} ${message.isMine && styles.message_mine}`} title={offerDateFormat(message.created_at)} key={index}>{message.content}</p>
                                        })
                                    }
                                </>
                            }
                        </div>
                        <form onSubmit={sendMessage} className={styles.form}>
                            <input max={100} id='message' placeholder='Napisz wiadomość' aria-label='Wiadomość' type="text" className={styles.form__input} />
                            <button title='Wyślij wiadomość' className={styles.form__button}>
                                <IoSend />
                            </button>
                        </form>
                    </main>
                    :
                    <p className='noResults'>Brak wiadomości do wyświetlenia</p>
            }
        </>
    )
}

export default ConversationRoom
