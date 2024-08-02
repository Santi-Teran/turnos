'use client'
import { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import Modal from 'react-modal';
import moment from 'moment';
import 'moment/locale/es';

moment.locale('es');

const CalendarView = ({ appointments, services, userConfiguration }) => {
  const { dayStartTime, dayEndTime } = userConfiguration;
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const serviceMap = services.reduce((map, service) => {
    map[service.id] = service.name;
    return map;
  }, {});

  const events = appointments.map(appointment => ({
    title: `${appointment.client.name} - ${serviceMap[appointment.serviceId] || 'Servicio'}`,
    start: new Date(`${appointment.date}T${appointment.hour}`),
    end: new Date(`${appointment.date}T${appointment.hour}`),
    extendedProps: appointment,
    classNames: ['custom-event'] // Añadir clase personalizada
  }));

  const handleEventClick = ({ event }) => {
    setSelectedEvent(event.extendedProps);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedEvent(null);
  };

  return (
    <div className="px-20 py-10 text-dark-blue bg-dark">
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay'
        }}
        events={events}
        locale="es"
        firstDay={1}
        slotMinTime={`${dayStartTime}:00`}
        slotMaxTime={`${dayEndTime}:00`}
        height="auto"
        buttonText={{
          today: 'Hoy',
          month: 'Mes',
          week: 'Semana',
          day: 'Día',
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
          <div className='text-dark-blue flex flex-col gap-2 w-fit shad'>
            <h2 className='mt-4'>{`${selectedEvent.client.name}`}</h2>
            <p>{serviceMap[selectedEvent.serviceId] || 'Servicio'}</p>
            <p><strong>Fecha:</strong> {selectedEvent.date}</p>
            <p><strong>Hora:</strong> {selectedEvent.hour}</p>
            <p><strong>Teléfono del cliente:</strong> {selectedEvent.client.phone}</p>
            <p><strong>Precio total:</strong> {selectedEvent.totalPrice}</p>
            <div className='flex flex-col gap-2'>
              <button className='text-2xl font-bold absolute top-2 right-4' onClick={closeModal}>x</button>
              <button className='border py-2 bg-green-300 rounded-md' onClick={() => alert('Funcionalidad de mensaje por implementar')}>Enviar mensaje</button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default CalendarView;