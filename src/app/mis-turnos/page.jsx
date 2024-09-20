"use client";
import { Inter } from "next/font/google";
import React, { useState } from "react";
import Footer from "@/components/Footer";
import NavBar from "@/components/NavBar";
import {
  getAppointmentsByPhone,
  getServices,
  deleteAppointment,
  deleteFixedAppointment,
  getConfigurationInfo,
} from "../api/api";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { format, isPast, differenceInHours, addDays } from "date-fns";
import { es } from "date-fns/locale";

const inter = Inter({ subsets: ["latin"] });

const MisTurnos = () => {
  const [phone, setPhone] = useState("");
  const [appointments, setAppointments] = useState([]);
  const [fixedAppointments, setFixedAppointments] = useState([]);
  const [pastAppointments, setPastAppointments] = useState([]);
  const [client, setClient] = useState(null);
  const [error, setError] = useState("");
  const [businessDetails, setBusinessDetails] = useState({});
  const [serviceDetails, setServiceDetails] = useState({});

  const handleChange = (value) => {
    setPhone(value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setAppointments([]);
    setFixedAppointments([]);
    setPastAppointments([]);
    setClient(null);
    setBusinessDetails({});
    setServiceDetails({});

    const response = await getAppointmentsByPhone(phone);

    if (response.success) {
      const { client } = response.data;

      if (client) {
        const futureAppointments = [];
        const futureFixedAppointments = [];
        const pastAppointmentsList = [];

        client.appointments.forEach((appointment) => {
          const appointmentDate = new Date(
            `${appointment.date}T${appointment.hour}`
          );
          if (isPast(appointmentDate)) {
            pastAppointmentsList.push(appointment);
          } else {
            futureAppointments.push(appointment);
          }
        });

        client.fixedAppointments.forEach((appointment) => {
          const appointmentDate = new Date(
            `${appointment.date}T${appointment.hour}`
          );
          if (isPast(appointmentDate)) {
            pastAppointmentsList.push(appointment);
          } else {
            futureFixedAppointments.push(appointment);
          }
        });

        futureAppointments.sort(
          (a, b) =>
            new Date(`${a.date}T${a.hour}`) - new Date(`${b.date}T${b.hour}`)
        );
        futureFixedAppointments.sort(
          (a, b) =>
            new Date(`${a.date}T${a.hour}`) - new Date(`${b.date}T${b.hour}`)
        );
        pastAppointmentsList.sort(
          (a, b) =>
            new Date(`${b.date}T${b.hour}`) - new Date(`${a.date}T${a.hour}`)
        );

        setAppointments(futureAppointments);
        setFixedAppointments(futureFixedAppointments);
        setPastAppointments(pastAppointmentsList);
        setClient(client);

        const businessData = {};
        const serviceData = {};

        for (const appointment of [
          ...futureAppointments,
          ...futureFixedAppointments,
          ...pastAppointmentsList,
        ]) {
          if (!businessData[appointment.userId]) {
            const userConfig = await getConfigurationInfo(appointment.userId);
            businessData[appointment.userId] = userConfig.data;
          }

          if (!serviceData[appointment.serviceId]) {
            const services = await getServices(appointment.userId);
            const matchedService = services.data.find(
              (service) => service.id === appointment.serviceId
            );
            serviceData[appointment.serviceId] = matchedService;
          }
        }

        setBusinessDetails(businessData);
        setServiceDetails(serviceData);
      } else {
        setError("No tienes turnos.");
      }
    } else {
      setError("Hubo un error al buscar los turnos. Inténtalo de nuevo.");
    }
  };

  const handleCancelAppointment = async (appointmentId) => {
    const response = await deleteAppointment(appointmentId, phone);

    if (response.success) {
      setAppointments(
        appointments.filter((appointment) => appointment.id !== appointmentId)
      );
      setError(""); // Limpiar error si la cancelación fue exitosa
    } else {
      setError("Hubo un error al cancelar el turno. Inténtelo nuevamente.");
    }
  };

  const handleCancelFixedAppointment = async (fixedAppointmentId) => {
    const response = await deleteFixedAppointment(fixedAppointmentId, phone);

    if (response.success) {
      setFixedAppointments(
        fixedAppointments.filter(
          (appointment) => appointment.id !== fixedAppointmentId
        )
      );
      setError(""); // Limpiar error si la cancelación fue exitosa
    } else {
      setError(
        "Hubo un error al cancelar el turno fijo. Inténtelo nuevamente."
      );
    }
  };

  const dayNames = [
    "Domingo",
    "Lunes",
    "Martes",
    "Miércoles",
    "Jueves",
    "Viernes",
    "Sábado",
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <div
        className={`${inter.className} flex flex-col justify-center items-center flex-grow gap-5 mx-4 pt-20`}
      >
        <h1 className="text-2xl font-bold">Mis Turnos</h1>
        <h2 className="text-xl text-center">
          Ingrese su número de teléfono para buscar sus turnos!
        </h2>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center gap-4"
        >
          <PhoneInput
            country={"ar"}
            placeholder="Ingrese su teléfono"
            value={phone}
            onChange={handleChange}
            className="focus:outline-none focus:ring-0 text-black"
            required
          />
          <button
            type="submit"
            className="gradient font-bold text-white py-2 px-4 rounded-lg"
          >
            Buscar
          </button>
        </form>

        {error && <p className="text-red-500">{error}</p>}

        {client && (
          <div className="w-full max-w-md overflow-y-auto my-10 flex flex-col gap-8">
            <h2 className="text-lg font-semibold">Hola {client.name}!</h2>
            {appointments.length === 0 &&
              fixedAppointments.length === 0 &&
              pastAppointments.length === 0 && (
                <p className="text-center text-lg font-semibold">
                  No tienes turnos.
                </p>
              )}

            {/* Sección de Próximos Turnos */}
            {(appointments.length > 0 || fixedAppointments.length > 0) && (
              <div className="flex flex-col gap-4">
                <h2 className="text-lg font-bold">Próximos Turnos</h2>
                <ul className="flex flex-col gap-4">
                  {appointments.map((appointment) => {
                    const business = businessDetails[appointment.userId] || {};
                    const service = serviceDetails[appointment.serviceId] || {};
                    const updatedDate = addDays(appointment.date, 1);
                    const formattedDate = format(
                      new Date(updatedDate),
                      "EEEE 'de' dd 'de' MMMM 'de' yyyy",
                      { locale: es }
                    );
                    const appointmentDate = new Date(
                      `${appointment.date}T${appointment.hour}`
                    );
                    const hoursDiff = differenceInHours(
                      appointmentDate,
                      new Date()
                    );

                    return (
                      <div
                        key={appointment.id}
                        className="bg-dark-blue p-4 rounded-lg shadow-xl"
                      >
                        <p>
                          <strong>Negocio:</strong>{" "}
                          {business.businessName || "Nombre del negocio"}
                        </p>
                        <p>
                          <strong>Servicio:</strong>{" "}
                          {service.name || "Servicio no especificado"}
                        </p>
                        <p className="capitalize">
                          <strong>Fecha:</strong> {formattedDate}
                        </p>
                        <p>
                          <strong>Hora:</strong> {appointment.hour}
                        </p>
                        <p>
                          <strong>Precio:</strong>{" "}
                          {appointment.totalPrice
                            ? `$${appointment.totalPrice}`
                            : "No especificado"}
                        </p>
                        <button
                          onClick={() =>
                            handleCancelAppointment(appointment.id)
                          }
                          className={`mt-4 gradient text-white py-2 px-4 rounded-lg ${
                            hoursDiff < 24
                              ? "opacity-50 cursor-not-allowed"
                              : "hover:scale-105 transition-transform"
                          }`}
                          disabled={hoursDiff < 24}
                        >
                          Cancelar Turno
                        </button>
                      </div>
                    );
                  })}
                  {fixedAppointments.map((appointment) => {
                    const business = businessDetails[appointment.userId] || {};
                    const service = serviceDetails[appointment.serviceId] || {};
                    const appointmentDate = new Date(
                      `${appointment.date}T${appointment.hour}`
                    );
                    const hoursDiff = differenceInHours(
                      appointmentDate,
                      new Date()
                    );
                    const dayName =
                      dayNames[appointment.day] || "Día no especificado";

                    return (
                      <div
                        key={appointment.id}
                        className="bg-dark-blue p-4 rounded-lg shadow-xl"
                      >
                        <p>
                          <strong>Negocio:</strong>{" "}
                          {business.businessName || "Nombre del negocio"}
                        </p>
                        <p>
                          <strong>Servicio:</strong>{" "}
                          {service.name || "Servicio no especificado"}
                        </p>
                        <p>
                          <strong>Fecha:</strong> {dayName}
                        </p>
                        <p>
                          <strong>Hora:</strong> {appointment.hour}
                        </p>
                        <button
                          onClick={() =>
                            handleCancelFixedAppointment(appointment.id)
                          }
                          className={`mt-4 gradient text-white py-2 px-4 rounded-lg ${
                            hoursDiff < 24
                              ? "opacity-50 cursor-not-allowed"
                              : "hover:scale-105 transition-transform"
                          }`}
                          disabled={hoursDiff < 24}
                        >
                          Cancelar Turno Fijo
                        </button>
                      </div>
                    );
                  })}
                </ul>
              </div>
            )}

            {/* Sección de Turnos Pasados */}
            {pastAppointments.length > 0 && (
              <div className="flex flex-col gap-4">
                <h2 className="text-lg font-bold">Turnos Pasados</h2>
                <ul className="flex flex-col gap-4">
                  {pastAppointments.map((appointment) => {
                    const business = businessDetails[appointment.userId] || {};
                    const service = serviceDetails[appointment.serviceId] || {};
                    const formattedDate = format(
                      new Date(appointment.date),
                      "EEEE, d 'de' MMMM 'de' yyyy",
                      { locale: es }
                    );

                    return (
                      <div
                        key={appointment.id}
                        className="bg-dark-blue p-4 rounded-lg shadow-xl"
                      >
                        <p>
                          <strong>Negocio:</strong>{" "}
                          {business.businessName || "Nombre del negocio"}
                        </p>
                        <p>
                          <strong>Servicio:</strong>{" "}
                          {service.name || "Servicio no especificado"}
                        </p>
                        <p>
                          <strong>Fecha:</strong> {formattedDate}
                        </p>
                        <p>
                          <strong>Hora:</strong> {appointment.hour}
                        </p>
                        <p>
                          <strong>Precio:</strong>{" "}
                          {appointment.totalPrice
                            ? `$${appointment.totalPrice}`
                            : "No especificado"}
                        </p>
                      </div>
                    );
                  })}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default MisTurnos;
