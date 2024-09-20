"use client";
import React, { useState, useEffect } from "react";
import {
  createFixedAppointment,
  getConfigurationInfo,
  getServices,
  verifyPhoneCode,
  verifyPhonee,
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
  const [closedDays, setClosedDays] = useState([]);
  const [isPhoneVerified, setIsPhoneVerified] = useState(false);
  const [phoneChecked, setPhoneChecked] = useState(false);
  const [verificationStep, setVerificationStep] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const [enteredCode, setEnteredCode] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await getConfigurationInfo(userId);
        const userInfo = response.data;
        const times = userInfo.dailySchedules.split(";");
        setUserInfo(userInfo);
        setAvailableTimes(times.map((time) => formatHour(time))); // Formatear las horas
        setClosedDays(userInfo.daysOff.split(";"));
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
    try {
      const response = await verifyPhonee(formData.phone);
      if (response.data.phone_verified) {
        setIsPhoneVerified(true);
        setPhoneChecked(true);
      } else {
        // Guardar el código de verificación en el estado
        setVerificationCode(response.data.verification_code);
        setVerificationStep(true); // Mostrar el campo para ingresar el código
        toast.success("Código de verificación enviado");
      }
    } catch (error) {
      console.error("Error sending verification code:", error);
      toast.error("Error al enviar el código de verificación.");
    }
  };

  const verifyPhone = async () => {
    try {
      const response = await verifyPhoneCode(formData.phone, enteredCode);
      if (response.success) {
        setIsPhoneVerified(true);
        setPhoneChecked(true);
        setVerificationStep(false);
        toast.success("Teléfono verificado con éxito");
      } else {
        toast.error("Código incorrecto. Inténtalo de nuevo.");
      }
    } catch (error) {
      console.error("Error verifying phone code:", error);
      toast.error("Error al verificar el código. Inténtalo de nuevo.");
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
    .filter((day) => !closedDays.includes(day.name));

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

        {phoneChecked ? (
          <>
            {isPhoneVerified && (
              <>
                <div className="flex flex-col gap-6 w-full text-black">
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
                        <option
                          key={day.index}
                          value={day.index}
                          className="capitalize"
                        >
                          {day.name}
                        </option>
                      ))}
                    </select>
                  </div>
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
                  Agendar
                </button>
              </>
            )}
          </>
        ) : (
          <div className="flex flex-col gap-4 w-full text-black">
            <label className="font-semibold">Ingresa tu teléfono</label>
            <PhoneInput
              country={"ar"}
              value={formData.phone}
              onChange={handlePhoneChange}
            />
            <button
              type="button"
              onClick={sendVerificationCode}
              className="bg-dark-gray py-2 rounded-md w-full text-white font-bold"
            >
              Verificar Teléfono
            </button>
          </div>
        )}

        {verificationStep && (
          <div className="flex flex-col gap-4 w-full text-black">
            <label className="font-semibold">
              Ingresa el código de verificación
            </label>
            <input
              type="text"
              name="verificationCode"
              value={enteredCode}
              onChange={(e) => setEnteredCode(e.target.value)}
              className="py-1 bg-transparent border-b-2 border-gray-300 focus:outline-none focus:ring-0"
              placeholder="Código de verificación"
              required
            />
            <button
              type="button"
              onClick={verifyPhone}
              className="bg-dark-gray py-2 rounded-md w-full text-white font-bold"
            >
              Verificar Código
            </button>
          </div>
        )}
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
    </>
  );
};

export default FormFijos;
