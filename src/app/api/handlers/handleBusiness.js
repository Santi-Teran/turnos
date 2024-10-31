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
      weeklySchedules: [
        {
          id: 0,
          day: 0,
          dayStartTime: "",
          dayEndTime: "",
          breakStartHour: "",
          breakEndTime: "",
          haveBreak: false,
          isOpen: false,
        },
        {
          id: 1,
          day: 1,
          dayStartTime: "",
          dayEndTime: "",
          breakStartHour: "",
          breakEndTime: "",
          haveBreak: false,
          isOpen: false,
        },
        {
          id: 2,
          day: 2,
          dayStartTime: "",
          dayEndTime: "",
          breakStartHour: "",
          breakEndTime: "",
          haveBreak: false,
          isOpen: false,
        },
        {
          id: 3,
          day: 3,
          dayStartTime: "",
          dayEndTime: "",
          breakStartHour: "",
          breakEndTime: "",
          haveBreak: false,
          isOpen: false,
        },
        {
          id: 4,
          day: 4,
          dayStartTime: "",
          dayEndTime: "",
          breakStartHour: "",
          breakEndTime: "",
          haveBreak: false,
          isOpen: false,
        },
        {
          id: 5,
          day: 5,
          dayStartTime: "",
          dayEndTime: "",
          breakStartHour: "",
          breakEndTime: "",
          haveBreak: false,
          isOpen: false,
        },
        {
          id: 6,
          day: 6,
          dayStartTime: "",
          dayEndTime: "",
          breakStartHour: "",
          breakEndTime: "",
          haveBreak: false,
          isOpen: false,
        },
      ],
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

  const handleChangee = (e, dayIndex = null) => {
    const { name, value, type, checked } = e.target;

    setFormData((prevData) => {
      const updatedWeeklySchedules = [
        ...prevData.userConfiguration.weeklySchedules,
      ];

      if (dayIndex !== null) {
        // Si es un día específico (horario de apertura, cierre, etc.)
        updatedWeeklySchedules[dayIndex] = {
          ...updatedWeeklySchedules[dayIndex],
          [name]: type === "checkbox" ? checked : formatTime(value), // Formateamos el tiempo aquí
        };
      }

      return {
        ...prevData,
        userConfiguration: {
          ...prevData.userConfiguration,
          weeklySchedules: updatedWeeklySchedules,
        },
      };
    });
  };

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
      else if (type === "range") {
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

    // if (!validateHours()) {
    //   setError("El descanso debe estar entre el horario de apertura y cierre.");
    //   return;
    // }

    const token = localStorage.getItem("token");

    try {
      const result = await businessConfiguration(formData, token);
      console.log(formData);
      if (result.success) {
        toast.success("Configuracion del negocio actualizada!");
        setIsEditing(false);
        setError(null); // Reseteamos el error en caso de éxito
      } else {
        toast.error(result.data.message);
      }
    } catch (error) {
      toast.error("Error del servidor");
    }
  };

  return {
    formData,
    handleChange,
    handleChangee,
    handleSubmit,
    setFormData,
    isEditing,
    setIsEditing,
    error,
  };
};
