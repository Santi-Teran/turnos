import { useState, useEffect } from "react";
import {
  deleteAppointmentt,
  deleteFixedAppointmentt,
  getAppointments,
  getServices,
  updateAppointment,
  updateFixedAppointment,
} from "../api";

export const useAppointments = (id) => {
  const [appointments, setAppointments] = useState([]);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAppointmentsAndServices = async () => {
      const token = localStorage.getItem("token");
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

  const handleUpdate = async (editedAppointment) => {
    const token = localStorage.getItem("token");
    const dataToSend = {
      ...editedAppointment,
    };

    const result = await updateAppointment(dataToSend, token);
    if (result.success) {
      const appointmentsResult = await getAppointments(id, token);
      if (appointmentsResult.success) {
        setAppointments(appointmentsResult.data);
      }
    } else {
      console.error("Error updating appointment:", result.message);
    }
  };

  const handleFixedUpdate = async (editedAppointment) => {
    const token = localStorage.getItem("token");
    const dataToSend = {
      ...editedAppointment,
    };

    const result = await updateFixedAppointment(dataToSend, token);
    if (result.success) {
      const appointmentsResult = await getAppointments(id, token);
      if (appointmentsResult.success) {
        setAppointments(appointmentsResult.data);
      }
    } else {
      console.error("Error updating appointment:", result.message);
    }
  };

  const handleDelete = async (appointmentId) => {
    const token = localStorage.getItem("token");
    const result = await deleteAppointmentt(appointmentId, token);
    if (result.success) {
      const appointmentsResult = await getAppointments(id, token);
      if (appointmentsResult.success) {
        setAppointments(appointmentsResult.data);
      }
    } else {
      console.error("Error deleting service:", result.message);
    }
  };

  const handleFixedDelete = async (appointmentId) => {
    const token = localStorage.getItem("token");
    const result = await deleteFixedAppointmentt(appointmentId, token);
    if (result.success) {
      const appointmentsResult = await getAppointments(id, token);
      if (appointmentsResult.success) {
        setAppointments(appointmentsResult.data);
      }
    } else {
      console.error("Error deleting service:", result.message);
    }
  };

  return {
    appointments,
    services,
    loading,
    error,
    handleUpdate,
    handleFixedUpdate,
    handleDelete,
    handleFixedDelete,
  };
};
