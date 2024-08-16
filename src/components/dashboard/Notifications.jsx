'use client'
import React, { useEffect, useState } from 'react';
import * as signalR from '@microsoft/signalr';

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const connection = new signalR.HubConnectionBuilder()
      .withUrl('https://www.misturnos.somee.com/notificationHub')
      .withAutomaticReconnect()
      .build();

    connection.start()
      .then(() => {
        console.log('Connected to SignalR hub');
      })
      .catch(error => console.error('SignalR Connection Error: ', error));

    connection.on('ReceiveNotification', (message) => {
      setNotifications(prev => [...prev, message]);
    });

    return () => {
      connection.stop();
    };
  }, []);

  return (
    <div>
      <h2>Notifications</h2>
      <ul>
        {notifications.map((notif, index) => (
          <li key={index}>{notif}</li>
        ))}
      </ul>
    </div>
  );
};

export default Notifications;