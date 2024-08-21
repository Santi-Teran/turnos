"use client";
import React, { useState, useEffect } from "react";
import { useAppointments } from "@/app/api/handlers/handleAppointments";
import {
  createAppointment,
  getHolidays,
  getConfigurationInfo,
  getUpcomingHolidays,
} from "@/app/api/api";
import Loading from "./Loading";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Image from "next/image";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const Form = ({ userId }) => {
  const [userInfo, setUserInfo] = useState(null);
  const { services, loading, error } = useAppointments(userId);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    date: null, // Cambiado a null para manejar como objeto Date
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
        const response = await getConfigurationInfo(userId);
        const userInfo = response.data;
        const times = userInfo.dailySchedules.split(";");
        setUserInfo(userInfo);
        setAvailableTimes(times.map((time) => formatHour(time))); // Formatear las horas
        setClosedDays(
            userInfo.daysOff
            .split(";")
            .map((day) => convertDayToIndex(day))
        );
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    };

    const fetchHolidays = async () => {
      try {
        const response = await getUpcomingHolidays(userId);
        setHolidays(response.data.holidays.map((holiday) => new Date(holiday.date)));
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
    if (isDayOff(date)) {
      toast.error("El día seleccionado no está disponible.");
      return;
    }
    setFormData({ ...formData, date: date });
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

  const handleErrors = (errorMessage) => {
    switch (errorMessage) {
      case "DATE_CONFLICT":
        toast.error("La fecha seleccionada no está disponible.");
        break;
      case "TIME_CONFLICT":
        toast.error("Ya hay demasiados turnos en esta hora.");
        break;
      case "HOLIDAY":
        toast.error("El día seleccionado es un feriado.");
        break;
      case "INVALID_PHONE":
        toast.error("El número de teléfono no es válido.");
        break;
      case "INVALID_NAME":
        toast.error("El nombre ingresado no es válido.");
        break;
      default:
        toast.error("Ocurrió un error al agendar el turno.");
        break;
    }
  };  

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!isPhoneVerified) {
      toast.error("Debe verificar su teléfono antes de agendar el turno");
      return;
    }
  
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
        toast.success("Turno agendado con éxito");
        setFormData({ name: "", phone: "", date: null, hour: "", serviceId: "" });
        setTimeout(() => {
          window.location.href = "/mis-turnos";
        }, 2000);
      } else {
        handleErrors(result.message);
      }
    } catch (error) {
      toast.error("Error del servidor, por favor intente nuevamente");
    }
  };  

  if (loading) return <Loading />;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
    <ToastContainer />
      <form onSubmit={handleSubmit} className="flex flex-col items-center gap-6 bg-gray-100 p-8 md:px-20 rounded-lg shadow">
        <div className="flex flex-col items-center gap-2 w-full">
          <Image
            src={userInfo?.logoData}
            alt="Logo"
            width={80}
            height={80}
          />
          <h1 className="text-center text-dark-blue text-2xl font-bold uppercase">
            {userInfo?.businessName || "Nombre del Negocio"}
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
                <option value="" disabled>Selecciona la hora</option>
                {availableTimes.map((time) => (
                  <option key={time} value={time}>{time}</option>
                ))}
              </select>
              <select
                name="serviceId"
                value={formData.serviceId}
                onChange={handleChange}
                className="px-3 py-2 rounded-md cursor-pointer w-full hover:bg-gray-200 transition-all focus:outline-none focus:ring-0"
                required
              >
                <option value="" disabled>Selecciona el servicio</option>
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

        {message && (
          <div
            className={`mt-4 ${
              message.startsWith("Error") ? "text-red-600" : "text-green-600"
            }`}
          >
            {message}
          </div>
        )}
      </form>
    </>
  );
};

export default Form;