"use client";
import React, { useState, useEffect } from "react";
import { useAppointments } from "@/app/api/handlers/handleAppointments";
import {
  createAppointment,
  getUserInfo,
  getAppointments,
  getHolidays,
} from "@/app/api/api";
import Loading from "./Loading";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Image from "next/image";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const Form = ({ userId }) => {
  const [userInfo, setUserInfo] = useState(null);
  const { services, loading, error } = useAppointments(userId);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    date: "",
    hour: "",
    serviceId: "",
    userId: userId,
  });
  const [availableTimes, setAvailableTimes] = useState([]);
  const [message, setMessage] = useState("");
  const [closedDays, setClosedDays] = useState([]);
  const [holidays, setHolidays] = useState([]);
  const [isPhoneVerified, setIsPhoneVerified] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const [enteredCode, setEnteredCode] = useState("");

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await getUserInfo(userId);
        const userInfo = response.data;
        const businessConfiguration = userInfo?.userConfiguration;
        const times = businessConfiguration.dailySchedules.split(";");
        setUserInfo(userInfo);
        setAvailableTimes(times.map((time) => formatHour(time))); // Formatear las horas
        setClosedDays(
          businessConfiguration.daysOff
            .split(";")
            .map((day) => convertDayToIndex(day))
        );
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    };

    const fetchHolidays = async () => {
      try {
        const response = await getHolidays(userId);
        setHolidays(response.data.map((holiday) => new Date(holiday.date)));
      } catch (error) {
        console.error("Error fetching holidays:", error);
      }
    };

    fetchUserInfo();
    fetchHolidays();
  }, [userId]);

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
    setFormData({ ...formData, date: date.toISOString().split("T")[0] });
  };

  const handlePhoneChange = (value) => {
    setFormData({ ...formData, phone: value });
  };

  const sendVerificationCode = async () => {
    // Aquí enviarías el código de verificación al teléfono del usuario.
    // Simulamos el código de verificación como "1234" por simplicidad.
    setVerificationCode("1234");
    alert("Código de verificación enviado");
  };

  const verifyPhone = () => {
    if (enteredCode === verificationCode) {
      setIsPhoneVerified(true);
      alert("Teléfono verificado con éxito");
    } else {
      alert("Código incorrecto. Inténtalo de nuevo.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isPhoneVerified) {
      setMessage("Debe verificar su teléfono antes de agendar el turno");
      return;
    }

    const appointmentData = {
      date: formData.date,
      hour: formData.hour,
      client: {
        name: formData.name,
        phone: formData.phone,
      },
      serviceId: parseInt(formData.serviceId),
    };

    const result = await createAppointment(appointmentData);

    if (result.success) {
      setMessage("Turno agendado con éxito");
      setFormData({ name: "", phone: "", date: "", hour: "", serviceId: "" });
    } else {
      setMessage(`Error: ${result.message}`);
    }
  };

  if (loading) return <Loading />;
  if (error) return <div>Error: {error}</div>;

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center gap-6 bg-gray-100 p-8 md:px-20 rounded-lg shadow">
      <div className="flex flex-col items-center gap-2 w-full">
        <Image
          src={userInfo?.userConfiguration.logoData}
          alt="Logo"
          width={80}
          height={80}
        />
        <h1 className="text-center text-dark-blue text-2xl font-bold uppercase">
          {userInfo?.userConfiguration.businessName || "Nombre del Negocio"}
        </h1>
        <h2 className="text-center text-black text-lg font-bold">
          Agendar Turno
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

      {isPhoneVerified ? (
        <></>
      ) : (
      <div className="flex flex-col items-center gap-2 w-full text-black">
        <PhoneInput
          country={"ar"}
          value={formData.phone}
          onChange={handlePhoneChange}
          className="focus:outline-none focus:ring-0"
          placeholder="Teléfono"
          required
        />
        <button
            type="button"
            onClick={sendVerificationCode}
            className="bg-dark-gray py-[6px] px-3 rounded-md w-full text-white font-semibold"
          >
            Enviar Código
          </button>
      </div>
      )}

      {/* Verificación del teléfono */}
      {!isPhoneVerified && (
        <>
          
          <div className="flex flex-col w-full text-black">
            <input
              type="text"
              value={enteredCode}
              onChange={(e) => setEnteredCode(e.target.value)}
              className="py-1 bg-transparent border-b-2 border-gray-300 focus:outline-none focus:ring-0"
              placeholder="Ingrese el Código"
              required
            />
          </div>
          <button
            type="button"
            onClick={verifyPhone}
            className="bg-dark-gray py-2 rounded-md w-full text-white font-bold"
          >
            Verificar Teléfono
          </button>
        </>
      )}

      {isPhoneVerified && (
        <>
          <div className="flex flex-col gap-6 w-full text-black">
            <DatePicker
              selected={formData.date ? new Date(formData.date) : null}
              onChange={handleDateChange}
              className="px-3 py-2 rounded-md cursor-pointer w-full hover:bg-gray-200 transition-all focus:outline-none focus:ring-0"
              placeholderText="Selecciona la fecha"
              dateFormat="yyyy-MM-dd"
              filterDate={(date) => !isDayOff(date)}
              minDate={new Date()}
              required
            />
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
        Agendar Turno
      </button>
        </>
      )}

      {message && <div className="text-red-500">{message}</div>}
    </form>
  );
};

export default Form;