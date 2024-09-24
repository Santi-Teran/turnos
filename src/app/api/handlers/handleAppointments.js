import { useState, useEffect } from "react";
import {
  deleteAppointmentt,
  deleteFixedAppointmentt,
  getAppointments,
  getServices,
  updateAppointment,
  updateFixedAppointment,
} from "../api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Función para obtener el token, evitando repetición de código
const getToken = () => localStorage.getItem("token");

// Manejo centralizado de actualización y eliminación de citas
const handleAction = async (actionFn, successMessage, id, setAppointments) => {
  const token = getToken();
  const result = await actionFn(token);
  if (result.success) {
    toast.success(successMessage);
    const appointmentsResult = await getAppointments(id, token);
    if (appointmentsResult.success) {
      setAppointments(appointmentsResult.data);
    } else {
      toast.error("Error:", appointmentsResult.message);
    }
  } else {
    toast.error("Error:", result.message);
  }
};

export const useAppointments = (id) => {
  const [appointments, setAppointments] = useState([]);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAppointmentsAndServices = async () => {
      const token = getToken();
      try {
        const [appointmentsResponse, servicesResponse] = await Promise.all([
          getAppointments(id, token),
          getServices(id),
        ]);

        if (appointmentsResponse.success && servicesResponse.success) {
          setAppointments(appointmentsResponse.data || []);
          setServices(servicesResponse.data || []);
        } else {
          setError(
            appointmentsResponse.message || servicesResponse.message || "Error"
          );
        }
      } catch (err) {
        setError(err.message || "Error");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchAppointmentsAndServices();
  }, [id]);

  // Funciones para manejar las acciones
  const handleUpdate = async (editedAppointment) => {
    await handleAction(
      (token) => updateAppointment(editedAppointment, token),
      "Turno actualizado correctamente!",
      id,
      setAppointments
    );
  };

  const handleFixedUpdate = async (editedAppointment) => {
    await handleAction(
      (token) => updateFixedAppointment(editedAppointment, token),
      "Fixed Turno actualizado correctamente!",
      id,
      setAppointments
    );
  };

  const handleDelete = async (appointmentId) => {
    await handleAction(
      (token) => deleteAppointmentt(appointmentId, token),
      "Turno borrado correctamente!",
      id,
      setAppointments
    );
  };

  const handleFixedDelete = async (appointmentId) => {
    await handleAction(
      (token) => deleteFixedAppointmentt(appointmentId, token),
      "Fixed Turno borrado correctamente!",
      id,
      setAppointments
    );
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
