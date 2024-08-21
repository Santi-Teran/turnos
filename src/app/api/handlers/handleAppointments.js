import { useState, useEffect } from 'react';
import { getAppointments, getServices } from '../api';

export const useAppointments = (id) => {
  const [appointments, setAppointments] = useState([]);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAppointmentsAndServices = async () => {
      const token = localStorage.getItem('token');
      try {
        const [appointmentsResponse, servicesResponse] = await Promise.all([
          getAppointments(id, token),
          getServices(id),
        ]);

        if (appointmentsResponse.success && servicesResponse.success) {
          setAppointments(appointmentsResponse.data || []);
          setServices(servicesResponse.data || []);
        } else {
          setError(appointmentsResponse.message || servicesResponse.message);
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchAppointmentsAndServices();
  }, [id]);

  return { appointments, services, loading, error };
};