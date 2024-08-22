import React, { useState } from 'react';
import { FaEdit, FaTrash, FaSave, FaTimes } from 'react-icons/fa';
import Pagination from './Pagination';

const TurnosDetail = ({ appointments, services, handleUpdate, handleDelete }) => {
  const [editingId, setEditingId] = useState(null);
  const [editedAppointment, setEditedAppointment] = useState({ id: '', name: '', phone: '', date: '', hour: '', serviceId: true });
  const [currentPage, setCurrentPage] = useState(1);
  const appointmentsPerPage = 5;

  // Ordenar los turnos para mostrar los más recientes primero
  const sortedAppointments = [...appointments].sort((a, b) => new Date(b.date) - new Date(a.date));

  // Paginación
  const totalPages = Math.ceil(sortedAppointments.length / appointmentsPerPage);
  const indexOfLastAppointment = currentPage * appointmentsPerPage;
  const indexOfFirstAppointment = indexOfLastAppointment - appointmentsPerPage;
  const currentAppointments = sortedAppointments.slice(indexOfFirstAppointment, indexOfLastAppointment);

  const paginate = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditedAppointment(prevData => ({
      ...prevData,
      [name]: name === 'serviceId' ? JSON.parse(value) : value
    }));
  };

  const startEditing = (appointment) => {
    setEditingId(appointment.id);
    setEditedAppointment(appointment);
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditedAppointment({ id: '', name: '', phone: '', date: '', hour: '', serviceId: true });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    await handleUpdate(editedAppointment);
    setEditingId(null);
    setEditedAppointment({ id: '', name: '', phone: '', date: '', hour: '', serviceId: true });
  };

  const getServiceName = (serviceId) => {
    const service = services.find(service => service.id === serviceId);
    return service ? service.name : 'Servicio no encontrado';
  };

  const getDayName = (dayNumber) => {
    const days = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    return days[dayNumber];
  };

  return (
    <div className="p-4 border rounded-md shadow-lg bg-white w-full overflow-x-auto">
      <h2 className="text-xl font-bold mb-4">Lista de Turnos</h2>
      <table className="w-full table-auto">
        <thead>
          <tr className='bg-gray-200 text-gray-600 uppercase text-sm leading-normal'>
            <th className="py-3 px-6 text-left">Nombre</th>
            <th className="py-3 px-6 text-left">Teléfono</th>
            <th className="py-3 px-6 text-center">
              {currentAppointments.some(appointment => !appointment.date) ? 'Día' : 'Fecha'}
            </th>
            <th className="py-3 px-6 text-center">Hora</th>
            <th className="py-3 px-6 text-center">Servicio</th>
            <th className="py-3 px-6 text-center">Acciones</th>
          </tr>
        </thead>
        <tbody className='text-gray-600 text-sm font-light'>
          {currentAppointments && currentAppointments.map(appointment => (
            <tr key={appointment.id} className='border-b border-gray-200 hover:bg-gray-100'>
              <td className="py-3 px-6 text-left">
                {editingId === appointment.id ? (
                  <input
                    type="text"
                    name="name"
                    value={editedAppointment.client.name}
                    onChange={handleEditChange}
                    className="w-full px-2 py-1 border rounded"
                  />
                ) : (
                  appointment.client.name
                )}
              </td>
              <td className="py-3 px-6 text-left">
                {editingId === appointment.id ? (
                  <input
                    type="text"
                    name="phone"
                    value={editedAppointment.client.phone}
                    onChange={handleEditChange}
                    className="w-full px-2 py-1 border rounded"
                  />
                ) : (
                  appointment.client.phone
                )}
              </td>
              <td className="py-3 px-6 text-center">
                {editingId === appointment.id ? (
                  <input
                    type="date"
                    name="date"
                    value={editedAppointment.date}
                    onChange={handleEditChange}
                    className="w-full px-2 py-1 border rounded"
                  />
                ) : (
                  appointment.date ? appointment.date : getDayName(appointment.day)
                )}
              </td>
              <td className="py-3 px-6 text-center">
                {editingId === appointment.id ? (
                  <input
                    type="text"
                    name="hour"
                    value={editedAppointment.hour}
                    onChange={handleEditChange}
                    className="w-full px-2 py-1 border rounded"
                  />
                ) : (
                  appointment.hour
                )}
              </td>
              <td className="py-3 px-6 text-center">
                {editingId === appointment.id ? (
                  <input
                    type="text"
                    name="serviceId"
                    value={editedAppointment.serviceId}
                    onChange={handleEditChange}
                    className="w-full px-2 py-1 border rounded"
                  />
                ) : (
                  getServiceName(appointment.serviceId)
                )}
              </td>
              <td className="py-3 px-6">
                {editingId === appointment.id ? (
                  <div className="flex items-center justify-center space-x-2 text-lg">
                    <button onClick={handleEditSubmit} className="text-green-500">
                      <FaSave />
                    </button>
                    <button onClick={cancelEditing} className="text-red-500">
                      <FaTimes />
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center justify-center space-x-2 text-lg">
                    <button onClick={() => startEditing(appointment)} className="text-blue-500">
                      <FaEdit />
                    </button>
                    <button onClick={() => handleDelete(appointment.id)} className="text-red-500">
                      <FaTrash />
                    </button>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Integrar el componente de paginación */}
      <Pagination 
        currentPage={currentPage}
        totalPages={totalPages}
        paginate={paginate}
      />
    </div>
  );
};

export default TurnosDetail;