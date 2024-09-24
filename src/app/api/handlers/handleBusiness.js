import { useState, useEffect } from "react";
import { businessConfiguration } from "../api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Función para formatear tiempos en formato de 24 horas
const formatTime = (value) => {
  const date = new Date(`1970-01-01T${value}:00Z`);
  return date.toISOString().substring(11, 19);
};

export const useBusinessConfiguration = (initialUserData) => {
  const [formData, setFormData] = useState({
    id: "",
    email: "",
    name: "",
    userConfiguration: {
      address: {
        addressLine: "",
        city: "",
        state: "",
        country: "",
      },
      businessName: "",
      description: "",
      logoData: "",
      currency: "",
      language: "",
      instagramLink: "",
      phone: "",
      mision: "",
      vision: "",
      history: "",
      appointmentDuration: "",
      timeBetweenAppointments: "",
      dayStartTime: "",
      dayEndTime: "",
      haveBreak: false,
      breakStartHour: "",
      breakDuration: "",
      daysOff: "",
      dailySchedules: null,
      fixedAppointmentsAvailable: true,
    },
  });
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState(null);

  // Cargar datos iniciales
  useEffect(() => {
    if (initialUserData) {
      setFormData((prevData) => ({
        ...prevData,
        id: initialUserData.id,
        email: initialUserData.email,
        name: initialUserData.name,
        userConfiguration: {
          ...prevData.userConfiguration,
          ...initialUserData.userConfiguration,
          address: {
            ...prevData.userConfiguration.address,
            ...initialUserData.userConfiguration.address,
          },
        },
      }));
    }
  }, [initialUserData]);

  // Función para manejar cambios en el formulario
  const handleChange = (e) => {
    const { name, value, type, files, checked } = e.target;

    try {
      // Manejo de archivos
      if (type === "file" && files[0]) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setFormData((prevData) => ({
            ...prevData,
            userConfiguration: {
              ...prevData.userConfiguration,
              logoData: reader.result,
            },
          }));
        };
        reader.readAsDataURL(files[0]);
      }
      // Checkbox
      else if (type === "checkbox") {
        setFormData((prevData) => ({
          ...prevData,
          userConfiguration: {
            ...prevData.userConfiguration,
            [name]: checked,
          },
        }));
      }
      // Rangos
      else if (type === "range" || name === "breakDuration") {
        setFormData((prevData) => ({
          ...prevData,
          userConfiguration: {
            ...prevData.userConfiguration,
            [name]: parseInt(value, 10),
          },
        }));
      }
      // Dirección
      else if (["country", "state", "city", "addressLine"].includes(name)) {
        setFormData((prevData) => ({
          ...prevData,
          userConfiguration: {
            ...prevData.userConfiguration,
            address: {
              ...prevData.userConfiguration.address,
              [name]: value,
            },
          },
        }));
      }
      // Tiempos (ej. horas)
      else if (
        ["dayStartTime", "dayEndTime", "breakStartHour"].includes(name)
      ) {
        setFormData((prevData) => ({
          ...prevData,
          userConfiguration: {
            ...prevData.userConfiguration,
            [name]: formatTime(value),
          },
        }));
      }
      // Otros cambios generales
      else {
        setFormData((prevData) => ({
          ...prevData,
          userConfiguration: {
            ...prevData.userConfiguration,
            [name]: value,
          },
        }));
      }
    } catch (error) {
      setError("Ocurrió un error al procesar el cambio.");
      console.error(error);
    }
  };

  // Validar horas para asegurar que el descanso esté en el rango de apertura/cierre
  const validateHours = () => {
    const { dayStartTime, dayEndTime, breakStartHour } =
      formData.userConfiguration;

    const convertToContinuousHour = (hour) => {
      const [hours, minutes] = hour.split(":").map(Number);
      return hours < 9 ? hours + 24 : hours; // Ajusta según necesidad
    };

    const start = convertToContinuousHour(dayStartTime);
    const end = convertToContinuousHour(dayEndTime);
    const breakHour = convertToContinuousHour(breakStartHour);

    return breakHour >= start && breakHour <= end;
  };

  // Función para manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateHours()) {
      setError("El descanso debe estar entre el horario de apertura y cierre.");
      return;
    }

    const token = localStorage.getItem("token");
    const parsedFormData = {
      ...formData,
      userConfiguration: {
        ...formData.userConfiguration,
        appointmentDuration:
          parseInt(formData.userConfiguration.appointmentDuration, 10) || 0,
        timeBetweenAppointments:
          parseInt(formData.userConfiguration.timeBetweenAppointments, 10) || 0,
        breakDuration:
          parseInt(formData.userConfiguration.breakDuration, 10) || 0,
      },
    };

    try {
      const result = await businessConfiguration(parsedFormData, token);
      if (result.success) {
        toast.success("Configuracion del negocio actualizada!");
        setIsEditing(false);
        setError(null); // Reseteamos el error en caso de éxito
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error("Error del servidor");
    }
  };

  return {
    formData,
    handleChange,
    handleSubmit,
    setFormData,
    isEditing,
    setIsEditing,
    error,
  };
};
