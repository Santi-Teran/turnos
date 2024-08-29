"use client";
import React, { useState, useEffect } from "react";
import {
  createAppointment,
  getConfigurationInfo,
  getUpcomingHolidays,
  getServices,
  verifyPhonee,
  verifyPhoneCode,
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
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    date: null,
    hour: "",
    serviceId: "",
    userId: userId,
  });
  const [services, setServices] = useState([]);
  const [availableTimes, setAvailableTimes] = useState([]);
  const [closedDays, setClosedDays] = useState([]);
  const [holidays, setHolidays] = useState([]);
  const [isPhoneVerified, setIsPhoneVerified] = useState(false);
  const [phoneChecked, setPhoneChecked] = useState(false);
  const [verificationStep, setVerificationStep] = useState(false);
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
          userInfo.daysOff.split(";").map((day) => convertDayToIndex(day))
        );
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

    const fetchHolidays = async () => {
      try {
        const response = await getUpcomingHolidays(userId);
        setHolidays(
          response.data.holidays.map((holiday) => new Date(holiday.date))
        );
      } catch (error) {
        console.error("Error fetching holidays:", error);
      }
    };

    fetchUserInfo();
    fetchServices();
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
      console.log(response);
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
        setFormData({
          name: "",
          phone: "",
          date: null,
          hour: "",
          serviceId: "",
        });
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
            Agendar Turno
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
                  <DatePicker
                    name="date"
                    selected={formData.date}
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
                  Agendar
                </button>
              </>
            )}
          </>
        ) : (
          <div className="flex flex-col gap-4 w-full text-black">
            <label className="font-semibold">Ingresa tu numero telefono</label>
            <PhoneInput
              country={"ar"}
              value={formData.phone}
              onChange={handlePhoneChange}
              placeholder="Número de teléfono"
              inputProps={{ name: "phone", required: true }}
            />
            <button
              type="button"
              onClick={sendVerificationCode}
              className="bg-dark-gray py-[6px] px-3 rounded-md w-full text-white font-semibold shadow-lg"
            >
              Verificar Teléfono
            </button>
            {verificationStep && (
              <div className="flex flex-col gap-4 w-full text-black">
                <label className="mt-8 font-semibold">
                  Ingresa el codigo que te llego
                </label>
                <input
                  type="text"
                  value={enteredCode}
                  onChange={(e) => setEnteredCode(e.target.value)}
                  className="py-1 bg-transparent border-b-2 border-gray-300 focus:outline-none focus:ring-0"
                  placeholder="Código de verificación"
                />
                <button
                  type="button"
                  onClick={verifyPhone}
                  className="bg-dark-gray py-[6px] px-3 rounded-md w-full text-white font-semibold shadow-lg"
                >
                  Enviar Código
                </button>
              </div>
            )}
          </div>
        )}
      </form>
    </>
  );
};

export default Form;
