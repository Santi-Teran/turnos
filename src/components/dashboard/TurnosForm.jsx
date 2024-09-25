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
  const [availableTimes, setAvailableTimes] = useState([]);
  const [closedDays, setClosedDays] = useState([]);
  const [holidays, setHolidays] = useState([]);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const times = userInfo.userConfiguration.dailySchedules.split(";");
        setAvailableTimes(times.map((time) => formatHour(time))); // Formatear las horas
        setClosedDays(
          userInfo.userConfiguration.daysOff
            .split(";")
            .map((day) => convertDayToIndex(day))
        );
      } catch (error) {
        console.error("Error fetching user info:", error);
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

    fetchUserInfo();
    fetchHolidays();
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

  const convertDayToIndex = (day) => {
    const daysOfWeek = {
      domingo: 0,
      lunes: 1,
      martes: 2,
      miércoles: 3,
      jueves: 4,
      viernes: 5,
      sábado: 6,
    };
    return daysOfWeek[day.toLowerCase()];
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
      return;
    }
    setFormData({ ...formData, date: date });
  };

  const handlePhoneChange = (value) => {
    setFormData({ ...formData, phone: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const appointmentData = {
      date: formData.date.toISOString().split("T")[0], // Convertir a formato ISO
      hour: formData.hour,
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
            <select
              name="hour"
              value={formData.hour}
              onChange={handleChange}
              className="px-3 py-2 rounded-md cursor-pointer w-full hover:bg-gray-200 transition-all focus:outline-none focus:ring-0"
              required
            >
              <option value="" disabled>
                Selecciona la hora
              </option>
              {availableTimes.map((time) => (
                <option key={time} value={time}>
                  {time}
                </option>
              ))}
            </select>
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
          </div>

          <button
            type="submit"
            className="bg-dark-gray py-2 rounded-md w-full text-white font-bold"
          >
            Agendar Turno
          </button>
        </>
      </form>
    </div>
  );
};

export default Form;
