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
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [viewType, setViewType] = useState("dayGridMonth"); // Nueva variable para el tipo de vista

  const whatsappUrl = `https://wa.me/${selectedEvent?.client.phone}`;

  const serviceMap = services.reduce((map, service) => {
    map[service.id] = service.name;
    return map;
  }, {});

  const getEarliestOpening = () => {
    const openTimes = userConfiguration.weeklySchedules
      .filter((schedule) => schedule.isOpen)
      .map((schedule) => parseInt(schedule.dayStartTime.split(":")[0]));
    return Math.min(...openTimes);
  };

  const getLatestClosing = () => {
    const closeTimes = userConfiguration.weeklySchedules
      .filter((schedule) => schedule.isOpen)
      .map((schedule) => parseInt(schedule.dayEndTime.split(":")[0]));
    return Math.max(...closeTimes);
  };

  const formatEventDate = (appointment) => {
    const appointmentDate = new Date(`${appointment.date}T${appointment.hour}`);

    const closingHour = getLatestClosing();
    if (
      appointmentDate.getHours() < closingHour &&
      appointmentDate.getHours() < 6
    ) {
      appointmentDate.setDate(appointmentDate.getDate() - 1);
    }

    return appointmentDate;
  };

  const normalEvents = appointments.map((appointment) => {
    const appointmentDate = formatEventDate(appointment);

    return {
      title: `${appointment.client.name} - ${
        serviceMap[appointment.serviceId]
      }`,
      start: appointmentDate,
      end: appointmentDate,
      extendedProps: appointment,
      classNames: ["custom-event"],
    };
  });

  const fixedEvents = fixedappointments.map((fixedappointment) => {
    const appointmentDate = new Date();
    appointmentDate.setHours(parseInt(fixedappointment.hour.split(":")[0]));
    appointmentDate.setMinutes(parseInt(fixedappointment.hour.split(":")[1]));

    const dayOfWeek = fixedappointment.day;
    const hour = appointmentDate.getHours();

    let adjustedDay = dayOfWeek;
    if (viewType === "dayGridMonth") {
      if (hour < getLatestClosing() && hour < 6 && dayOfWeek !== 0) {
        adjustedDay = dayOfWeek - 1;
      }
    } else if (viewType === "timeGridWeek") {
      if (hour < getLatestClosing() && hour < 6 && dayOfWeek === 0) {
        adjustedDay = 6;
      } else if (hour < getLatestClosing() && hour < 6 && dayOfWeek !== 0) {
        adjustedDay = dayOfWeek;
      }
    }

    return {
      title: `${fixedappointment.client.name} - ${
        serviceMap[fixedappointment.serviceId]
      }`,
      daysOfWeek: [adjustedDay],
      startTime: fixedappointment.hour,
      extendedProps: fixedappointment,
      classNames: ["custom-fixed-event"],
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

  const handleDatesSet = (dateInfo) => {
    setViewType(dateInfo.view.type); // Ajusta el tipo de vista según el tipo de vista del calendario
  };

  const slotMinTime = `${getEarliestOpening()}:00`;
  const slotMaxTime = "30:00";

  const getDayName = (dayNumber) => {
    const days = [
      "Domingo",
      "Lunes",
      "Martes",
      "Miércoles",
      "Jueves",
      "Viernes",
      "Sábado",
    ];
    return days[dayNumber];
  };

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
        slotMinTime={slotMinTime}
        slotMaxTime={slotMaxTime}
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
        datesSet={handleDatesSet} // Captura el cambio de vista
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
            <h2 className="mt-4">{selectedEvent.client.name}</h2>
            <p>{serviceMap[selectedEvent.serviceId] || "Servicio"}</p>
            {selectedEvent.date ? (
              <p>
                <strong>Fecha:</strong>{" "}
                {moment(selectedEvent.date).format("DD-MM-YYYY")}
              </p>
            ) : (
              <p>
                <strong>Dia:</strong> {getDayName(selectedEvent.day)}
              </p>
            )}

            <p>
              <strong>Hora:</strong>{" "}
              {moment(selectedEvent.hour, "HH:mm:ss").format("HH:mm")}
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
