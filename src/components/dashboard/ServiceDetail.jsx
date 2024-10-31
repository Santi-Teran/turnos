"use client";
import { useState } from "react";
import { FaEdit, FaTrash, FaSave, FaTimes } from "react-icons/fa";

const ServiceDetail = ({ services, handleUpdate, handleDelete }) => {
  const [editingId, setEditingId] = useState(null);
  const [editedService, setEditedService] = useState({
    id: "",
    name: "",
    price: "",
    description: "",
    appointmentDuration: "",
    timeBetweenAppointments: "",
    isActive: true,
  });
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditedService((prevData) => ({
      ...prevData,
      [name]: name === "isActive" ? JSON.parse(value) : value,
    }));
  };

  const startEditing = (service) => {
    setEditingId(service.id);
    setEditedService(service);
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditedService({
      id: "",
      name: "",
      price: "",
      description: "",
      appointmentDuration: "",
      timeBetweenAppointments: "",
      isActive: true,
    });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    await handleUpdate(editedService);
    setEditingId(null);
    setEditedService({
      id: "",
      name: "",
      price: "",
      description: "",
      appointmentDuration: "",
      timeBetweenAppointments: "",
      isActive: true,
    });
  };

  return (
    <div className="p-4 border rounded shadow-lg bg-white w-full overflow-x-auto">
      <h2 className="text-xl font-bold mb-4">Lista de Servicios</h2>
      <table className="w-full table-auto">
        <thead>
          <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
            <th className="py-3 px-6 text-left">Nombre</th>
            <th className="py-3 px-6 text-left">Descripcion</th>
            <th className="py-3 px-6 text-center">Precio</th>
            <th className="py-3 px-6 text-center">Duracion</th>
            <th className="py-3 px-6 text-center">Tiempo entre turnos</th>
            <th className="py-3 px-6 text-center">Activo</th>
            <th className="py-3 px-6 text-center">Acciones</th>
          </tr>
        </thead>
        <tbody className="text-gray-600 text-sm font-light">
          {services.map((service) => (
            <tr
              key={service.id}
              className="border-b border-gray-200 hover:bg-gray-100"
            >
              <td className="py-3 px-6 text-left">
                {editingId === service.id ? (
                  <input
                    type="text"
                    name="name"
                    value={editedService.name}
                    onChange={handleEditChange}
                    className="w-full px-2 py-1 border rounded"
                  />
                ) : (
                  service.name
                )}
              </td>
              <td className="py-3 px-6 text-left w-2/6">
                {editingId === service.id ? (
                  <textarea
                    type="text"
                    name="description"
                    value={editedService.description}
                    onChange={handleEditChange}
                    className="w-full h-32 px-2 py-1 border rounded"
                  />
                ) : (
                  service.description
                )}
              </td>
              <td className="py-3 px-6 text-center">
                {editingId === service.id ? (
                  <input
                    type="number"
                    name="price"
                    value={editedService.price}
                    onChange={handleEditChange}
                    className="w-full px-2 py-1 border rounded"
                  />
                ) : (
                  service.price
                )}
              </td>
              <td className="py-3 px-6 text-center">
                {editingId === service.id ? (
                  <>
                    <input
                      type="range"
                      name="appointmentDuration"
                      min="0"
                      max="120"
                      step="5"
                      value={editedService.appointmentDuration}
                      onChange={handleEditChange}
                      className="bg-blue-100 h-2 rounded-lg appearance-none cursor-pointer accent-blue-600 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                    <span className="text-sm text-gray-600">
                      {editedService.appointmentDuration} minutos
                    </span>
                  </>
                ) : (
                  service.appointmentDuration
                )}
              </td>
              <td className="py-3 px-6 text-center">
                {editingId === service.id ? (
                  <>
                    <input
                      type="range"
                      name="timeBetweenAppointments"
                      min="0"
                      max="120"
                      step="5"
                      value={editedService.timeBetweenAppointments}
                      onChange={handleEditChange}
                      className="bg-blue-100 h-2 rounded-lg appearance-none cursor-pointer accent-blue-600 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                    <span className="text-sm text-gray-600">
                      {editedService.timeBetweenAppointments} minutos
                    </span>
                  </>
                ) : (
                  service.timeBetweenAppointments
                )}
              </td>
              <td className="py-3 px-6 text-center">
                {editingId === service.id ? (
                  <select
                    name="isActive"
                    value={editedService.isActive}
                    onChange={handleEditChange}
                    className="w-full px-2 py-1 border rounded"
                  >
                    <option value={true}>Sí</option>
                    <option value={false}>No</option>
                  </select>
                ) : service.isActive ? (
                  "Sí"
                ) : (
                  "No"
                )}
              </td>
              <td className="py-3 px-6">
                {editingId === service.id ? (
                  <div className="flex items-center justify-center space-x-2 text-lg">
                    <button
                      onClick={handleEditSubmit}
                      className="text-green-500"
                    >
                      <FaSave />
                    </button>
                    <button onClick={cancelEditing} className="text-red-500">
                      <FaTimes />
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center justify-center space-x-2 text-lg">
                    <button
                      onClick={() => startEditing(service)}
                      className="text-blue-500"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(service.id)}
                      className="text-red-500"
                    >
                      <FaTrash />
                    </button>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ServiceDetail;
