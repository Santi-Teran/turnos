"use client";
import React, { useState, useEffect } from "react";
import { createFixedAppointment } from "@/app/api/api";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const TurnosFijosForm = ({ userInfo, services }) => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    day: "",
    hour: "",
    serviceId: "",
    userId: userInfo.id,
  });
  const [availableTimes, setAvailableTimes] = useState([]);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const times = userInfo.userConfiguration.dailySchedules.split(";");
        setAvailableTimes(times.map((time) => formatHour(time))); // Formatear las horas
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    };

    fetchUserInfo();
  }, [userInfo.id]);

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

    const result = await createFixedAppointment(fixedAppointmentData);

    if (result.success) {
      setFormData({ name: "", phone: "", day: "", hour: "", serviceId: "" });
    } else {
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-center gap-6 bg-gray-100 p-8 rounded-lg shadow"
    >
      <div className="flex flex-col items-center gap-2 w-full">
        <h2 className="text-center text-black text-lg font-bold">
          Agendar Turno Fijo
        </h2>
      </div>

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
          className="px-3 py-2 rounded-md cursor-pointer"
          required
        >
          <option value="" disabled>
            Selecciona un día
          </option>
          <option value="0">Domingo</option>
          <option value="1">Lunes</option>
          <option value="2">Martes</option>
          <option value="3">Miércoles</option>
          <option value="4">Jueves</option>
          <option value="5">Viernes</option>
          <option value="6">Sábado</option>
        </select>
      </div>

      <div className="flex flex-col gap-1 w-full text-black">
        <select
          name="hour"
          value={formData.hour}
          onChange={handleChange}
          className="px-3 py-2 rounded-md cursor-pointer"
          required
        >
          <option value="" disabled>
            Selecciona una hora
          </option>
          {availableTimes.map((time) => (
            <option key={time} value={time}>
              {time}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-1 w-full text-black">
        <select
          name="serviceId"
          value={formData.serviceId}
          onChange={handleChange}
          className="px-3 py-2 rounded-md cursor-pointer"
          required
        >
          <option value="" disabled>
            Selecciona un servicio
          </option>
          {services.map((service) => (
            <option key={service.id} value={service.id}>
              {service.name}
            </option>
          ))}
        </select>
      </div>

      <button
        type="submit"
        className="bg-dark-gray py-2 rounded-md w-full text-white font-bold"
      >
        Agendar Turno Fijo
      </button>

    </form>
  );
};

export default TurnosFijosForm;
