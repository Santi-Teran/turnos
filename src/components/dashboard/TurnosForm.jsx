"use client";
import React, { useState, useEffect } from "react";
import { createAppointment, getUpcomingHolidays } from "@/app/api/api";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const Form = ({ userInfo, services }) => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    date: null, // Cambiado a null para manejar como objeto Date
    hour: "",
    serviceId: "",
    userId: userInfo.id,
  });
  const [closedDays, setClosedDays] = useState([]);
  const [holidays, setHolidays] = useState([]);
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        checkClosedDays(services);
      } catch (error) {
        toast.error("Error del servidor:", error);
      }
    };

    const fetchHolidays = async () => {
      try {
        const response = await getUpcomingHolidays(userInfo.id);
        setHolidays(
          response.data.holidays.map((holiday) => new Date(holiday.date))
        );
      } catch (error) {
        console.error("Error fetching holidays:", error);
      }
    };

    fetchServices();
    fetchHolidays();
  }, [userInfo.id]);

  const handleTimeChange = (event) => {
    const time = event.target.value;
    setSelectedTime(time);
    const [hours] = time.split(":").map(Number);

    // Check if the time is after midnight (for example, between 00:00 and 01:59)
    if (hours === 0 || hours === 1) {
      setIsModalOpen(true);
    } else {
      setFormData({ ...formData, hour: time });
    }
  };

  const handleModalConfirm = () => {
    const nextDay = new Date(selectedDate);
    nextDay.setDate(nextDay.getDate() + 1); // Increment the date by one day
    setSelectedDate(nextDay);

    // Keep the originally selected time even if it's not available
    setFormData({ ...formData, date: nextDay, hour: selectedTime });
    setIsModalOpen(false);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
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
    const day = date.getDay();
    return (
      closedDays.includes(day) ||
      holidays.some((holiday) => date.toDateString() === holiday.toDateString())
    );
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleDateChange = (date) => {
    if (isDayOff(date)) {
      toast.error("El día seleccionado no está disponible.");
      return;
    }
    setFormData({ ...formData, date: date });
    setSelectedDate(date);
  };

  const handlePhoneChange = (value) => {
    setFormData({ ...formData, phone: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const appointmentData = {
      date: selectedDate.toISOString().split("T")[0], // Se enviará la fecha con un día sumado si corresponde
      hour: selectedTime,
      client: {
        name: formData.name,
        phone: formData.phone,
      },
      serviceId: parseInt(formData.serviceId),
    };

    try {
      const result = await createAppointment(appointmentData);

      if (result.success) {
        setFormData({
          name: "",
          phone: "",
          date: null,
          hour: "",
          serviceId: "",
        });
        // setTimeout(() => {
        //   window.location.href = "/mis-turnos";
        // }, 2000);
      } else {
        handleErrors(result.message);
      }
    } catch (error) {}
  };

  return (
    <div className="p-4 border rounded shadow-lg bg-white w-fit flex flex-col gap-6">
      <h2 className="text-center text-black text-lg font-bold">
        Agendar Turno
      </h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <div className="flex flex-col gap-1 w-full text-black">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="py-1 bg-transparent border-b-2 border-gray-300 focus:outline-none focus:ring-0"
            placeholder="Nombre"
            required
          />
        </div>

        <div className="flex flex-col items-center gap-2 w-full text-black">
          <PhoneInput
            country={"ar"}
            value={formData.phone}
            onChange={handlePhoneChange}
            className="focus:outline-none focus:ring-0"
            placeholder="Teléfono"
            required
          />
        </div>
        <>
          <div className="flex flex-col gap-1 w-full text-black">
            <select
              name="serviceId"
              value={formData.serviceId}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-dark-blue cursor-pointer"
              required
            >
              <option value="">Selecciona un Servicio</option>
              {services.map((service) => (
                <option key={service.id} value={service.id}>
                  {service.name} - ${service.price}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col gap-6 w-full text-black">
            <DatePicker
              name="date"
              selected={formData.date} // Debe ser un objeto Date
              onChange={handleDateChange}
              className="px-3 py-2 rounded-md cursor-pointer w-full hover:bg-gray-200 transition-all focus:outline-none focus:ring-0"
              placeholderText="Selecciona la fecha"
              filterDate={(date) => !isDayOff(date)}
              minDate={new Date()}
            />
            {formData.serviceId && selectedDate ? (
              <div className="flex flex-col gap-1 w-full text-black">
                <select
                  name="hour"
                  value={selectedTime}
                  onChange={handleTimeChange}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-dark-blue cursor-pointer"
                >
                  <option value="">Selecciona un Horario</option>
                  {services
                    .find(
                      (service) => service.id === parseInt(formData.serviceId)
                    )
                    ?.weeklySchedule[selectedDate.getDay()].hours.split(";")
                    .map((time) => (
                      <option key={time} value={time}>
                        {time}
                      </option>
                    ))}

                  {/* Si el horario seleccionado previamente no está en las opciones, lo agregamos manualmente */}
                  {selectedTime &&
                    !services
                      .find(
                        (service) => service.id === parseInt(formData.serviceId)
                      )
                      ?.weeklySchedule[selectedDate.getDay()].hours.split(";")
                      .includes(selectedTime) && (
                      <option value={selectedTime}>
                        {selectedTime} (Seleccionado previamente)
                      </option>
                    )}
                </select>
              </div>
            ) : (
              ""
            )}
          </div>

          <button
            type="submit"
            className="bg-dark-gray py-2 rounded-md w-full text-white font-bold"
          >
            Agendar Turno
          </button>
        </>
      </form>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center text-black bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-lg font-semibold mb-4">Confirmar Fecha</h2>
            <p className="mb-6">
              Has seleccionado un horario después de la medianoche, lo cual
              indica que es al día siguiente. ¿Deseas agendar para el día
              siguiente?
            </p>
            <div className="flex justify-end gap-4">
              <button
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                onClick={handleModalClose}
              >
                Cancelar
              </button>
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                onClick={handleModalConfirm}
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Form;
