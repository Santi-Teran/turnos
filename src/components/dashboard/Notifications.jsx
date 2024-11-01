"use client";
import { useEffect, useState } from "react";
import * as signalR from "@microsoft/signalr";
import { IoIosNotificationsOutline } from "react-icons/io";

const Notifications = ({ token }) => {
  const [messages, setMessages] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [connectionError, setConnectionError] = useState(false);
  const [isConnected, setIsConnected] = useState(false); // Nuevo estado para manejar la conexión

  useEffect(() => {
    const connection = new signalR.HubConnectionBuilder()
      .withUrl("http://190.245.254.248:8081/notificationHub", {
        accessTokenFactory: () => token,
      })
      .configureLogging(signalR.LogLevel.None) // Desactivar logs de SignalR
      .build();

    const startConnection = () => {
      connection
        .start()
        .then(() => {
          setIsConnected(true);
          setConnectionError(false);
        })
        .catch((err) => {
          setIsConnected(false);
          setConnectionError(true);
          setTimeout(startConnection, 5000); // Reintenta la conexión después de 5 segundos
        });
    };

    startConnection();

    connection.on("ReceiveNotification", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
      setUnreadCount((prevCount) => prevCount + 1);
    });

    return () => {
      connection.stop();
    };
  }, [token]);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
    setUnreadCount(0); // Marcar como leídas al abrir el modal
  };

  if (!isConnected) {
    return <div>...</div>;
  }

  return (
    <div>
      <div onClick={toggleModal} className="relative cursor-pointer">
        <IoIosNotificationsOutline className="text-3xl" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-600 text-white rounded-full w-3 h-3 flex items-center justify-center text-xs p-2">
            {unreadCount}
          </span>
        )}
      </div>
      {isModalOpen && (
        <div className="absolute z-10 right-12 mt-2 w-64 bg-white border border-gray-300 shadow-lg rounded-md p-2">
          <h2 className="text-lg font-bold">Notificaciones</h2>
          <ul>
            {messages.length > 0 ? (
              messages.map((message, index) => (
                <li key={index} className="border-b py-2">
                  {message}
                </li>
              ))
            ) : (
              <li>No tienes notificaciones</li>
            )}
          </ul>
        </div>
      )}
      {connectionError && (
        <div className="text-red-600 text-sm mt-2">
          Error de conexión. Reintentando...
        </div>
      )}
    </div>
  );
};

export default Notifications;
