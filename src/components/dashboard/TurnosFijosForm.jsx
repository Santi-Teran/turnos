"use client";
import React, { useState, useEffect } from "react";
import { createFixedAppointment } from "@/app/api/api";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const TurnosFijosForm = ({ userInfo, services }) => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    day: "",
    hour: "",
    serviceId: "",
    userId: userInfo.id,
  });
  const [closedDays, setClosedDays] = useState([]);
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

    fetchServices();
  }, [userInfo.id]);

  const handleTimeChange = (event) => {
    const time = event.target.value;
    setSelectedTime(time);
    const [hours] = time.split(":").map(Number);
    if (hours >= 0 && hours < 6) {
      setIsModalOpen(true);
    } else {
      setFormData({ ...formData, hour: time });
    }
  };

  const handleModalConfirm = () => {
    // Avanzar al día siguiente
    const nextDay = new Date(selectedDate);
    nextDay.setDate(nextDay.getDate() + 1);

    // Cambiar el día seleccionado en el form
    const nextDayIndex = (parseInt(formData.day) + 1) % 7; // Ciclar entre 0 y 6 (días de la semana)

    setSelectedDate(nextDay);
    setFormData({
      ...formData,
      day: nextDayIndex.toString(),
      hour: selectedTime,
    });
    setIsModalOpen(false);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const formatHour = (hour) => {
    const [time, period] = hour.split(" ");
    let [hours, minutes] = time.split(":").map(Number);

    if (period === "PM" && hours < 12) {
      hours += 12;
    } else if (period === "AM" && hours === 12) {
      hours = 0;
    }
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}`;
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

  const handlePhoneChange = (value) => {
    setFormData({ ...formData, phone: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const fixedAppointmentData = {
      day: parseInt(formData.day),
      hour: formData.hour,
      client: {
        name: formData.name,
        phone: formData.phone,
      },
      serviceId: parseInt(formData.serviceId),
    };

    try {
      const result = await createFixedAppointment(fixedAppointmentData);

      if (result.success) {
        toast.success("Turno fijo agendado con éxito");
        setFormData({ name: "", phone: "", day: "", hour: "", serviceId: "" });
        // setTimeout(() => {
        //   window.location.href = "/mis-turnos";
        // }, 2000);
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error("Error del servidor");
    }
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

  // Función para generar las franjas horarias entre un intervalo
  const generateTimeSlots = (start, end) => {
    let times = [];
    let current = new Date();
    current.setHours(start.split(":")[0]);
    current.setMinutes(start.split(":")[1]);

    const endTime = new Date();
    endTime.setHours(end.split(":")[0]);
    endTime.setMinutes(end.split(":")[1]);

    while (current <= endTime) {
      times.push(current.toTimeString().slice(0, 5)); // Obtiene HH:MM
      current.setMinutes(current.getMinutes() + 30); // Cambia el intervalo a 30 mins (o lo que necesites)
    }

    return times;
  };

  return (
    <div className="p-4 border rounded shadow-lg bg-white w-fit flex flex-col gap-6">
      <ToastContainer />
      <h2 className="text-center text-black text-lg font-bold">
        Agendar Turno Fijo
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

        <PhoneInput
          country={"ar"}
          value={formData.phone}
          onChange={handlePhoneChange}
          className="focus:outline-none focus:ring-0"
          placeholder="Teléfono"
          required
        />

        <div className="flex flex-col gap-1 w-full text-black">
          <select
            name="day"
            value={formData.day}
            onChange={handleChange}
            className="px-3 py-2 rounded-md cursor-pointer capitalize"
            required
          >
            <option value="" disabled>
              Selecciona un día
            </option>
            {availableDays.map((day) => (
              <option key={day.index} value={day.index} className="capitalize">
                {day.name}
              </option>
            ))}
          </select>
        </div>
        <select
          name="serviceId"
          value={formData.serviceId}
          onChange={handleChange}
          className="px-3 py-2 rounded-md cursor-pointer w-full hover:bg-gray-200 transition-all focus:outline-none focus:ring-0"
          required
        >
          <option value="" disabled>
            Selecciona el servicio
          </option>
          {services.map((service) => (
            <option key={service.id} value={service.id}>
              {service.name}
            </option>
          ))}
        </select>
        {formData.serviceId && formData.day ? (
          <select
            name="hour"
            value={selectedTime}
            onChange={handleTimeChange}
            className="px-3 py-2 rounded-md cursor-pointer w-full hover:bg-gray-200 transition-all focus:outline-none focus:ring-0"
            required
          >
            <option value="" disabled>
              Selecciona la hora
            </option>
            {services
              .find((service) => service.id === parseInt(formData.serviceId))
              ?.weeklySchedule[formData.day].hours.split(";")
              .map((time) => (
                <option key={time} value={time}>
                  {time}
                </option>
              ))}

            {/* Si el horario seleccionado previamente no está en las opciones, lo agregamos manualmente */}
            {selectedTime &&
              !services
                .find((service) => service.id === parseInt(formData.serviceId))
                ?.weeklySchedule[formData.day].hours.split(";")
                .includes(selectedTime) && (
                <option value={selectedTime}>
                  {selectedTime} (Seleccionado previamente)
                </option>
              )}
          </select>
        ) : (
          ""
        )}

        <button
          type="submit"
          className="bg-dark-gray py-2 rounded-md w-full text-white font-bold"
        >
          Agendar Turno Fijo
        </button>
      </form>
    </div>
  );
};

export default TurnosFijosForm;
