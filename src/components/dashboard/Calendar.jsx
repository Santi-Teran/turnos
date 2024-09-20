import { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import Modal from "react-modal";
import moment from "moment";
import "moment/locale/es";
import Link from "next/link";
import { FaWhatsapp } from "react-icons/fa";

moment.locale("es");

const CalendarView = ({
  appointments,
  fixedappointments,
  services,
  userConfiguration,
}) => {
  const { dayStartTime, dayEndTime } = userConfiguration;
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const whatsappUrl = `https://wa.me/${selectedEvent?.client.phone}`;

  const serviceMap = services.reduce((map, service) => {
    map[service.id] = service.name;
    return map;
  }, {});

  const normalEvents = appointments.map((appointment) => {
    // Crear la fecha y hora del turno
    const appointmentDate = new Date(`${appointment.date}T${appointment.hour}`);

    // Verifica si el día es domingo (0) y la hora es temprana (ej. después de la medianoche)
    const dayOfWeek = appointmentDate.getDay();
    const hour = appointmentDate.getHours();

    // Si el negocio está cerrado los domingos (0) pero el turno es después de medianoche
    if (dayOfWeek === 0 && hour < parseInt(dayEndTime)) {
      // Restar un día para mover el evento al sábado
      appointmentDate.setDate(appointmentDate.getDate() - 1);
    }

    return {
      title: `${appointment.client.name} - ${
        serviceMap[appointment.serviceId] || "Servicio"
      }`,
      start: appointmentDate, // Usa la fecha ajustada
      end: appointmentDate,
      extendedProps: appointment,
      classNames: ["custom-event"], // Añadir clase personalizada
    };
  });

  const fixedEvents = fixedappointments.map((fixedappointment) => {
    // Crear la fecha y hora del turno basado en un día ficticio
    const appointmentDate = new Date();
    appointmentDate.setHours(parseInt(fixedappointment.hour.split(":")[0]));
    appointmentDate.setMinutes(parseInt(fixedappointment.hour.split(":")[1]));

    // Verificar si el turno ocurre técnicamente en domingo (0)
    const dayOfWeek = fixedappointment.day; // Día de la semana del turno
    const hour = appointmentDate.getHours(); // Hora del turno

    // Si el negocio está cerrado el domingo (0) pero el turno es después de medianoche
    // Restar un día para mover el evento al sábado
    let adjustedDay = dayOfWeek;
    if (dayOfWeek === 0 && hour < parseInt(dayEndTime)) {
      adjustedDay = 6; // Ajustar a sábado (6)
    } else if (hour < parseInt(dayEndTime) && dayOfWeek !== 0) {
      adjustedDay = dayOfWeek + 1; // Sumar un día
    }

    return {
      title: `${fixedappointment.client.name} - ${
        serviceMap[fixedappointment.serviceId] || "Servicio"
      }`,
      daysOfWeek: [adjustedDay], // Ajustar al día anterior si es necesario
      startTime: fixedappointment.hour, // Hora del día en que comienza
      extendedProps: fixedappointment,
      classNames: ["custom-fixed-event"], // Añadir clase personalizada
    };
  });

  const allEvents = [...normalEvents, ...fixedEvents];

  const handleEventClick = ({ event }) => {
    setSelectedEvent(event.extendedProps);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedEvent(null);
  };

  // Ajuste para manejar horario de cierre al día siguiente
  const adjustedEndTime =
    parseInt(dayEndTime) < parseInt(dayStartTime)
      ? `${parseInt(dayEndTime) + 25}:00`
      : `${dayEndTime}:00`;

  return (
    <div className="px-4 py-4 md:px-20 md:py-10 mb-20 text-dark-blue bg-dark">
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay",
        }}
        events={allEvents}
        locale="es"
        firstDay={1}
        slotMinTime={`${dayStartTime}:00`}
        slotMaxTime={adjustedEndTime}
        height="auto"
        buttonText={{
          today: "Hoy",
          month: "Mes",
          week: "Semana",
          day: "Día",
        }}
        eventClick={handleEventClick}
        eventContent={(eventInfo) => (
          <div className="cursor-pointer overflow-hidden text-dark-blue">
            {eventInfo.event.title}
          </div>
        )}
        allDaySlot={false}
        slotEventOverlap={false}
        eventOverlap={false}
        contentHeight="auto"
        aspectRatio={1.5}
      />

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Detalle del Evento"
        ariaHideApp={false}
        className="modal shadow-xl border-grayy"
        overlayClassName="overlay"
      >
        {selectedEvent && (
          <div className="text-dark-blue flex flex-col gap-2 w-fit shad">
            <h2 className="mt-4">{`${selectedEvent.client.name}`}</h2>
            <p>{serviceMap[selectedEvent.serviceId] || "Servicio"}</p>
            <p>
              <strong>Fecha:</strong> {selectedEvent.date}
            </p>
            <p>
              <strong>Hora:</strong> {selectedEvent.hour}
            </p>
            <p>
              <strong>Teléfono del cliente:</strong>{" "}
              {selectedEvent.client.phone}
            </p>
            <p>
              <strong>Precio total:</strong> {selectedEvent.totalPrice}
            </p>
            <div className="flex flex-col gap-2">
              <button
                className="text-2xl font-bold absolute top-2 right-4"
                onClick={closeModal}
              >
                x
              </button>
              <Link
                className="flex items-center gap-2 mx-auto bg-green-400 py-2 px-4 rounded-lg font-bold"
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Enviar mensaje <FaWhatsapp />
              </Link>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default CalendarView;
