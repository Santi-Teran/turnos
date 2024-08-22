"use client";
import React, { useState, useEffect } from "react";
import {
  createFixedAppointment,
  getConfigurationInfo,
  getServices,
} from "@/app/api/api";
import Loading from "./Loading";
import Image from "next/image";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const FormFijos = ({ userId }) => {
  const [userInfo, setUserInfo] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    day: "",
    hour: "",
    serviceId: "",
    userId: userId,
  });
  const [services, setServices] = useState([]);
  const [availableTimes, setAvailableTimes] = useState([]);
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
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    };

    const fetchServices = async () => {
      try {
        const response = await getServices(userId);
        setServices(response.data);
      } catch (error) {
        console.error("Error fetching holidays:", error);
      }
    };

    fetchServices();
    fetchUserInfo();
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePhoneChange = (value) => {
    setFormData({ ...formData, phone: value });
  };

  const sendVerificationCode = async () => {
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
      toast.error("Debe verificar su teléfono antes de agendar el turno");
      return;
    }

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

  if (!userInfo) return <Loading />;

  return (
    <>
      <ToastContainer />
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center gap-6 bg-gray-100 p-8 md:px-20 rounded-lg shadow"
      >
        <div className="flex flex-col items-center gap-2 w-full">
          <Image src={userInfo?.logoData} alt="Logo" width={80} height={80} />
          <h1 className="text-center text-dark-blue text-2xl font-bold uppercase">
            {userInfo?.businessName || "Nombre del Negocio"}
          </h1>
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
          </>
        )}
      </form>
    </>
  );
};

export default FormFijos;
