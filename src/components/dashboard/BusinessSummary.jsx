import { useEffect, useState } from 'react';
import moment from 'moment';
import 'moment/locale/es';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

moment.locale('es');

const BusinessSummary = ({ appointments, fixedAppointments, services }) => {
  const [todayAppointments, setTodayAppointments] = useState(0);
  const [nextAppointment, setNextAppointment] = useState(null);
  const [lastThreeAppointments, setLastThreeAppointments] = useState([]);
  const [monthlyAppointments, setMonthlyAppointments] = useState(0);
  const [monthlyIncome, setMonthlyIncome] = useState(0);
  const [monthlyIncomeLastMonth, setMonthlyIncomeLastMonth] = useState(0);
  const [mostPopularService, setMostPopularService] = useState(null);
  const [remainingSlotsToday, setRemainingSlotsToday] = useState(0);
  const [serviceStats, setServiceStats] = useState({ labels: [], data: [] });

  useEffect(() => {
    const allAppointments = [...appointments, ...fixedAppointments];

    // Filtrar turnos de hoy
    const today = moment().startOf('day');
    const filteredTodayAppointments = allAppointments.filter(app =>
      moment(`${app.date} ${app.hour}`).isSame(today, 'day')
    );
    setTodayAppointments(filteredTodayAppointments.length);

    // Turno siguiente y últimos 3 turnos
    const futureAppointments = allAppointments.filter(app =>
      moment(`${app.date} ${app.hour}`).isAfter(moment())
    );
    const pastAppointments = allAppointments.filter(app =>
      moment(`${app.date} ${app.hour}`).isBefore(moment())
    );
    const nextApp = futureAppointments.sort((a, b) => 
      moment(`${a.date} ${a.hour}`).diff(moment(`${b.date} ${b.hour}`))
    )[0];
    const lastThree = pastAppointments.sort((a, b) => 
      moment(`${b.date} ${b.hour}`).diff(moment(`${a.date} ${a.hour}`))
    ).slice(0, 3);
    setNextAppointment(nextApp);
    setLastThreeAppointments(lastThree);

    // Turnos del mes y del mes pasado
    const thisMonth = moment().startOf('month');
    const lastMonth = moment().subtract(1, 'month').startOf('month');
    const filteredMonthlyAppointments = allAppointments.filter(app => 
      moment(`${app.date} ${app.hour}`).isAfter(thisMonth)
    );
    const filteredLastMonthAppointments = allAppointments.filter(app => 
      moment(`${app.date} ${app.hour}`).isBetween(lastMonth, thisMonth)
    );
    setMonthlyAppointments(filteredMonthlyAppointments.length);

    // Ingresos del mes y comparación con mes anterior
    const monthlyIncome = filteredMonthlyAppointments.reduce((total, app) => {
      const service = services.find(service => service.id === app.serviceId);
      return total + (service ? service.price : 0);
    }, 0);
    setMonthlyIncome(monthlyIncome);

    const monthlyIncomeLastMonth = filteredLastMonthAppointments.reduce((total, app) => {
      const service = services.find(service => service.id === app.serviceId);
      return total + (service ? service.price : 0);
    }, 0);
    setMonthlyIncomeLastMonth(monthlyIncomeLastMonth);

    // Servicio más popular y estadísticas
    const serviceCount = {};
    allAppointments.forEach(app => {
      serviceCount[app.serviceId] = (serviceCount[app.serviceId] || 0) + 1;
    });
    const sortedServices = Object.keys(serviceCount).sort((a, b) => 
      serviceCount[b] - serviceCount[a]
    );
    const mostPopularServiceId = sortedServices[0];
    setMostPopularService(services.find(service => service.id === parseInt(mostPopularServiceId)));

    // Estadísticas de servicios
    const labels = services.map(service => service.name);
    const data = labels.map(name => serviceCount[services.find(service => service.name === name)?.id] || 0);
    setServiceStats({ labels, data });

    // Disponibilidad restante de hoy
    const totalSlotsToday = 10; // Supongamos que hay 10 slots disponibles por día
    setRemainingSlotsToday(totalSlotsToday - filteredTodayAppointments.length);

  }, [appointments, fixedAppointments, services]);

  return (
    <div className="grid grid-cols-1 gap-4">
      {/* Resumen General */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div className="p-4 border rounded-lg bg-white shadow">
          <h2 className="text-lg font-bold mb-2">Turnos Hoy</h2>
          <p className="text-2xl font-bold">{todayAppointments}</p>
        </div>
        <div className="p-4 border rounded-lg bg-white shadow">
          <h2 className="text-lg font-bold mb-2">Ingresos del Mes</h2>
          <p className="text-2xl font-bold">${monthlyIncome.toFixed(2)}</p>
          <p className="text-sm text-gray-600">Comparado con el mes pasado: ${monthlyIncomeLastMonth.toFixed(2)}</p>
        </div>
        <div className="p-4 border rounded-lg bg-white shadow">
          <h2 className="text-lg font-bold mb-2">Turnos en el Mes</h2>
          <p className="text-2xl font-bold">{monthlyAppointments}</p>
        </div>
      </div>

      {/* Próximo Turno Compacto */}
      <div className="p-4 border rounded-lg bg-white shadow">
        <h2 className="text-lg font-bold mb-2">Próximo Turno</h2>
        {nextAppointment ? (
          <div>
            <p><strong>Cliente:</strong> {nextAppointment.client.name}</p>
            <p><strong>Servicio:</strong> {services.find(service => service.id === nextAppointment.serviceId)?.name || 'Servicio'}</p>
            <p><strong>Fecha y Hora:</strong> {moment(`${nextAppointment.date} ${nextAppointment.hour}`).format('dddd, LL, LT')}</p>
          </div>
        ) : (
          <p>No hay próximos turnos.</p>
        )}
      </div>

      {/* Historial de Últimos 3 Turnos */}
      <div className="p-4 border rounded-lg bg-white shadow">
        <h2 className="text-lg font-bold mb-2">Últimos 3 Turnos Atendidos</h2>
        <ul>
          {lastThreeAppointments.map((app, index) => (
            <li key={index} className="mb-2">
              <strong>{services.find(service => service.id === app.serviceId)?.name || 'Servicio'}:</strong> {app.client.name} - {moment(`${app.date} ${app.hour}`).format('LLL')}
            </li>
          ))}
        </ul>
      </div>

      {/* Servicio Más Solicitado y Comparación */}
      <div className="p-4 border rounded-lg bg-white shadow">
        <h2 className="text-lg font-bold mb-2">Servicio Más Solicitado</h2>
        {mostPopularService ? (
          <div>
            <p className="text-xl font-bold">{mostPopularService.name}</p>
            <p className="text-sm text-gray-600">Precio: ${mostPopularService.price.toFixed(2)}</p>
            <p className="text-sm text-gray-600">Solicitudes: {serviceStats.data.find((_, index) => serviceStats.labels[index] === mostPopularService.name)}</p>
            <h3 className="text-lg font-bold mt-4">Comparación con Otros Servicios</h3>
            <Bar
              data={{
                labels: serviceStats.labels,
                datasets: [{
                  label: 'Cantidad de Solicitudes',
                  data: serviceStats.data,
                  backgroundColor: 'rgba(75, 192, 192, 0.2)',
                  borderColor: 'rgba(75, 192, 192, 1)',
                  borderWidth: 1,
                }],
              }}
              options={{
                responsive: true,
                scales: {
                  x: {
                    beginAtZero: true,
                  },
                },
              }}
            />
          </div>
        ) : (
          <p>No hay servicios populares.</p>
        )}
      </div>

      {/* Disponibilidad Restante Hoy */}
      <div className="p-4 mb-20 border rounded-lg bg-white shadow">
        <h2 className="text-lg font-bold mb-2">Disponibilidad Restante Hoy</h2>
        <p className="text-xl font-bold">{remainingSlotsToday} slots disponibles</p>
      </div>
    </div>
  );
};

export default BusinessSummary;