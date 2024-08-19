'use client'
import { useEffect, useState } from 'react';
import * as signalR from '@microsoft/signalr';

const Notifications = ({ token }) => {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        const connection = new signalR.HubConnectionBuilder()
            .withUrl("/notificationHub", {
                accessTokenFactory: () => token
            })
            .configureLogging(signalR.LogLevel.Information)
            .build();

        connection.start()
            .then(() => console.log('Connected to SignalR'))
            .catch(err => console.error('SignalR Connection Error: ', err));

        connection.on("ReceiveNotification", (message) => {
            setMessages(prevMessages => [...prevMessages, message]);
        });

        return () => {
            connection.stop().then(() => console.log('Disconnected from SignalR'));
        };
    }, [token]);

    return (
        <div>
            <h2>Notificaciones:</h2>
            <ul>
                {messages.map((message, index) => (
                    <li key={index}>{message}</li>
                ))}
            </ul>
        </div>
    );
};

export default Notifications;