'use client'
import { useEffect, useState } from 'react';
import * as signalR from '@microsoft/signalr';
import { FaBell } from 'react-icons/fa';

const Notifications = ({ token }) => {
    const [messages, setMessages] = useState([]);
    const [unreadCount, setUnreadCount] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const connection = new signalR.HubConnectionBuilder()
            .withUrl("https://www.misturnos.somee.com/notificationHub", {
                accessTokenFactory: () => token
            })
            .configureLogging(signalR.LogLevel.Information)
            .build();

        connection.start()
            .then(() => console.log('Connected to SignalR'))
            .catch(err => console.error('SignalR Connection Error: ', err));

        connection.on("ReceiveNotification", (message) => {
            setMessages(prevMessages => [...prevMessages, message]);
            setUnreadCount(prevCount => prevCount + 1);
        });

        return () => {
            connection.stop().then(() => console.log('Disconnected from SignalR'));
        };
    }, [token]);

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
        setUnreadCount(0);  // Marcar como leídas al abrir el modal
    };

    return (
        <div>
            <div onClick={toggleModal} className="relative cursor-pointer">
                <FaBell className='text-2xl' />
                {unreadCount > 0 && (
                    <span className="absolute -top-2 -right-1 bg-red-600 text-white rounded-full w-3 h-3 flex items-center justify-center text-xs p-2">
                        {unreadCount}
                    </span>
                )}
            </div>
            {isModalOpen && (
                <div className="absolute z-10 right-12 mt-2 w-64 bg-white border border-gray-300 shadow-lg rounded-md p-2">
                    <h2 className="text-lg font-bold">Notificaciones</h2>
                    <ul>
                        {messages.length > 0 ? messages.map((message, index) => (
                            <li key={index} className="border-b py-2">
                                {message}
                            </li>
                        )) : (
                          <div>
                            <li>No tienes notificaciones</li>
                          </div>
                        )}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default Notifications;