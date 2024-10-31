import React, { useState } from "react";
import { FaEdit, FaTrash, FaSave, FaTimes } from "react-icons/fa";
import Pagination from "./Pagination";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const TurnosDetail = ({
  appointments,
  services,
  holidays,
  handleUpdate,
  handleDelete,
}) => {
  const [closedDays, setClosedDays] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editedAppointment, setEditedAppointment] = useState({
    id: "",
    client: { name: "", phone: "" },
    date: "",
    hour: "",
    serviceId: "",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const appointmentsPerPage = 5;

  const sortedAppointments = [...appointments].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );
  const totalPages = Math.ceil(sortedAppointments.length / appointmentsPerPage);
  const indexOfLastAppointment = currentPage * appointmentsPerPage;
  const indexOfFirstAppointment = indexOfLastAppointment - appointmentsPerPage;
  const currentAppointments = sortedAppointments.slice(
    indexOfFirstAppointment,
    indexOfLastAppointment
  );

  const paginate = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const checkClosedDays = (services) => {
    const closed = [];
    services.forEach((service) => {
      service.weeklySchedule.forEach((schedule, dayIndex) => {
        if (schedule.hours === "") {
          closed.push(dayIndex);
        }
      });
    });
    setClosedDays(closed);
  };

  const isDayOff = (date) => {
    const day = new Date(date).getDay();
    return (
      closedDays.includes(day) || holidays.some((holiday) => date === holiday)
    );
  };

  if (closedDays.length === 0 && services.length > 0) {
    checkClosedDays(services);
  }

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditedAppointment((prevData) => {
      if (name === "name" || name === "phone") {
        return {
          ...prevData,
          client: { ...prevData.client, [name]: value },
        };
      } else if (name === "date") {
        return {
          ...prevData,
          date: new Date(value),
        };
      }
      return {
        ...prevData,
        [name]: value,
      };
    });
  };

  const handleDateChange = (date) => {
    setEditedAppointment((prevData) => ({
      ...prevData,
      date: date, // Guarda directamente el objeto Date seleccionado
    }));
  };

  const startEditing = (appointment) => {
    setEditingId(appointment.id);
    setEditedAppointment({
      ...appointment,
      date: new Date(appointment.date + "T00:00:00"), // Forzar la fecha en horario local
    });
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditedAppointment({
      id: "",
      client: { name: "", phone: "" },
      date: "",
      hour: "",
      serviceId: "",
    });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();

    // Crear el objeto para actualizar basado en si es un appointment normal o fixed
    const appointmentToUpdate = {
      ...editedAppointment,
      // Si tiene "day", estamos manejando un fixed appointment, y no incluimos "date"
      ...(editedAppointment.day !== undefined
        ? { day: editedAppointment.day }
        : {
            date: editedAppointment.date
              ? new Date(editedAppointment.date).toISOString().split("T")[0] // Formato dd/MM/yyyy
              : "",
          }),
    };

    await handleUpdate(appointmentToUpdate);

    setEditingId(null);
    setEditedAppointment({
      id: "",
      client: { name: "", phone: "" },
      date: "",
      hour: "",
      serviceId: "",
    });
  };

  const getServiceName = (serviceId) => {
    const service = services.find((service) => service.id === serviceId);
    return service ? service.name : "Servicio no encontrado";
  };

  const getDayName = (dayNumber) => {
    const days = [
      "Domingo",
      "Lunes",
      "Martes",
      "Miércoles",
      "Jueves",
      "Viernes",
      "Sábado",
    ];
    return days[dayNumber];
  };

  const dayNames = [
    "domingo",
    "lunes",
    "martes",
    "miércoles",
    "jueves",
    "viernes",
    "sábado",
  ];

  const availableDays = dayNames
    .map((name, index) => ({ name, index }))
    .filter((day) => !closedDays.includes(day.index));

  return (
    <div className="p-4 border rounded-md shadow-lg bg-white w-full overflow-x-auto">
      <h2 className="text-xl font-bold mb-4">Lista de Turnos</h2>
      <table className="w-full table-auto">
        <thead>
          <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
            <th className="py-3 px-6 text-left">Nombre</th>
            <th className="py-3 px-6 text-left">Teléfono</th>
            <th className="py-3 px-6 text-center">Servicio</th>
            <th className="py-3 px-6 text-center">
              {currentAppointments.some((appointment) => !appointment.date)
                ? "Día"
                : "Fecha"}
            </th>
            <th className="py-3 px-6 text-center">Hora</th>
            <th className="py-3 px-6 text-center">Acciones</th>
          </tr>
        </thead>
        <tbody className="text-gray-600 text-sm font-light">
          {currentAppointments &&
            currentAppointments.map((appointment) => (
              <tr
                key={appointment.id}
                className="border-b border-gray-200 hover:bg-gray-100"
              >
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
                    <select
                      name="serviceId"
                      value={editedAppointment.serviceId}
                      onChange={handleEditChange}
                      className="w-full px-2 py-1 border rounded"
                    >
                      {services.map((service) => (
                        <option key={service.id} value={service.id}>
                          {service.name}
                        </option>
                      ))}
                    </select>
                  ) : (
                    getServiceName(appointment.serviceId)
                  )}
                </td>
                <td className="py-3 px-6 text-center">
                  {editingId === appointment.id ? (
                    appointment.date ? (
                      <DatePicker
                        selected={editedAppointment.date}
                        onChange={handleDateChange}
                        filterDate={(date) => !isDayOff(date)}
                        dateFormat="dd/MM/yyyy"
                        minDate={new Date()}
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-dark-blue cursor-pointer hover:bg-gray-200 transition-all"
                        required
                      />
                    ) : (
                      <select
                        name="day"
                        value={editedAppointment.day}
                        onChange={handleEditChange}
                        className="px-3 py-2 rounded-md cursor-pointer capitalize"
                        required
                      >
                        <option value="" disabled>
                          Selecciona un día
                        </option>
                        {availableDays.map((day) => (
                          <option
                            key={day.index}
                            value={day.index}
                            className="capitalize"
                          >
                            {day.name}
                          </option>
                        ))}
                      </select>
                    )
                  ) : appointment.date ? (
                    appointment.date
                  ) : (
                    getDayName(appointment.day)
                  )}
                </td>
                <td className="py-3 px-6 text-center">
                  {editingId === appointment.id ? (
                    <select
                      name="hour"
                      value={editedAppointment.hour}
                      onChange={handleEditChange}
                      className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-dark-blue cursor-pointer"
                    >
                      <option value="">Selecciona un Horario</option>
                      {services
                        .find(
                          (service) =>
                            service.id === parseInt(editedAppointment.serviceId)
                        )
                        ?.weeklySchedule[
                          editedAppointment.day
                            ? editedAppointment.day
                            : new Date(editedAppointment.date).getDay()
                        ].hours.split(";")
                        .map((time) => (
                          <option key={time} value={time}>
                            {time}
                          </option>
                        ))}

                      {appointment.hour &&
                        !services
                          .find(
                            (service) =>
                              service.id === parseInt(appointment.serviceId)
                          )
                          ?.weeklySchedule[
                            appointment.day
                              ? appointment.day
                              : new Date(appointment.date).getDay()
                          ].hours.split(";")
                          .includes(appointment.hour) && (
                          <option value={appointment.hour}>
                            {appointment.hour} (Seleccionado previamente)
                          </option>
                        )}
                    </select>
                  ) : (
                    // <input
                    //   type="time"
                    //   name="hour"
                    //   value={editedAppointment.hour}
                    //   onChange={handleEditChange}
                    //   className="w-full px-2 py-1 border rounded"
                    // />
                    appointment.hour
                  )}
                </td>
                <td className="py-3 px-6">
                  {editingId === appointment.id ? (
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
                        onClick={() => startEditing(appointment)}
                        className="text-blue-500"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => handleDelete(appointment.id)}
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
      <Pagination
        totalAppointments={sortedAppointments.length}
        appointmentsPerPage={appointmentsPerPage}
        paginate={paginate}
        currentPage={currentPage}
      />
    </div>
  );
};

export default TurnosDetail;
