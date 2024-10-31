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
  const [clientName, setClientName] = useState("");
  const [services, setServices] = useState([]);
  const [closedDays, setClosedDays] = useState([]);
  const [holidays, setHolidays] = useState([]);
  const [isPhoneVerified, setIsPhoneVerified] = useState(false);
  const [phoneChecked, setPhoneChecked] = useState(false);
  const [verificationStep, setVerificationStep] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const [enteredCode, setEnteredCode] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await getConfigurationInfo(userId);
        const userInfo = response.data;
        setUserInfo(userInfo);
      } catch (error) {
        toast.error("Error del servidor:", error);
      }
    };

    const fetchServices = async () => {
      try {
        const response = await getServices(userId);
        setServices(response.data);
        checkClosedDays(response.data);
      } catch (error) {
        toast.error("Error del servidor:", error);
      }
    };

    const fetchHolidays = async () => {
      try {
        const response = await getUpcomingHolidays(userId);
        setHolidays(
          response.data.holidays.map((holiday) => new Date(holiday.date))
        );
      } catch (error) {
        toast.error("Error del servidor:", error);
      }
    };

    fetchUserInfo();
    fetchServices();
    fetchHolidays();
  }, [userId]);

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

  const sendVerificationCode = async () => {
    try {
      const response = await verifyPhonee(formData.phone);
      if (response.data.phone_verified) {
        setClientName(response.data.client.name);
        setIsPhoneVerified(true);
        setPhoneChecked(true);
      } else {
        setVerificationCode(response.data.verification_code);
        setPhoneChecked(true);
        setVerificationStep(true);
        toast.success("Código de verificación enviado");
      }
    } catch (error) {
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
      toast.error("Error al verificar el código. Inténtalo de nuevo.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const appointmentData = {
      date: selectedDate.toISOString().split("T")[0], // Se enviará la fecha con un día sumado si corresponde
      hour: selectedTime,
      client: {
        name: clientName ? clientName : formData.name,
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

        {!phoneChecked ? (
          <div className="flex flex-col gap-4 w-full text-black">
            <label className="font-semibold">Ingresa tu teléfono</label>
            <div className="flex flex-col gap-4 w-full text-black">
              <PhoneInput
                country="ar"
                value={formData.phone}
                onChange={handlePhoneChange}
                placeholder="Ingrese su número de teléfono"
                className="input"
              />
              <button
                type="button"
                onClick={sendVerificationCode}
                className="bg-dark-gray py-2 rounded-md w-full text-white font-bold"
              >
                Verificar Teléfono
              </button>
            </div>
          </div>
        ) : verificationStep ? (
          <div className="flex flex-col items-center gap-2">
            <p className="text-center">
              Ingrese el código enviado a su teléfono:
            </p>
            <input
              type="text"
              value={enteredCode}
              onChange={(e) => setEnteredCode(e.target.value)}
              className="py-1 bg-transparent border-b-2 border-gray-300 focus:outline-none focus:ring-0 text-black"
              placeholder="Código de verificación"
            />
            <button
              onClick={verifyPhone}
              className="bg-dark-gray py-[6px] px-3 rounded-md w-full text-white font-semibold shadow-lg"
            >
              Verificar
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-6 w-full text-black">
            <div className="flex flex-col gap-1 w-full text-black">
              <input
                type="text"
                name="name"
                value={clientName ? clientName : formData.name}
                readOnly={clientName ? true : false}
                onChange={handleChange}
                placeholder="Nombre completo"
                className="py-1 bg-transparent border-b-2 border-gray-300 focus:outline-none focus:ring-0"
              />
            </div>
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

            <div className="flex flex-col gap-1 w-full text-black">
              <DatePicker
                selected={selectedDate}
                onChange={handleDateChange}
                placeholderText="Selecciona una Fecha"
                filterDate={(date) => !isDayOff(date)}
                dateFormat="dd/MM/yyyy"
                minDate={new Date()}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-dark-blue cursor-pointer hover:bg-gray-200 transition-all"
                required
              />
            </div>

            {formData.serviceId && selectedDate && (
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
            )}

            <button
              type="submit"
              className="bg-dark-gray py-2 rounded-md w-full text-white font-bold"
            >
              Agendar Turno
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

export default Form;
