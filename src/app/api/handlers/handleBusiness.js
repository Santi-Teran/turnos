import { useState, useEffect } from "react";
import { businessConfiguration } from "../api";

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
      breakStartHour: "",
      breakDuration: "",
      daysOff: "",
      dailySchedules: null,
      fixedAppointmentsAvailable: true,
    },
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (initialUserData) {
      setFormData((prevData) => ({
        ...prevData,
        id: initialUserData.id,
        email: initialUserData.email,
        name: initialUserData.name,
        userConfiguration: {
          ...prevData.userConfiguration,
          address: {
            ...prevData.address,
            addressLine: initialUserData.userConfiguration.address.addressLine,
            city: initialUserData.userConfiguration.address.city,
            state: initialUserData.userConfiguration.address.state,
            country: initialUserData.userConfiguration.address.country,
          },
          businessName: initialUserData.userConfiguration.businessName,
          description: initialUserData.userConfiguration.description,
          logoData: initialUserData.userConfiguration.logoData,
          currency: initialUserData.userConfiguration.currency,
          language: initialUserData.userConfiguration.language,
          instagramLink: initialUserData.userConfiguration.instagramLink,
          phone: initialUserData.userConfiguration.phone,
          mision: initialUserData.userConfiguration.mision,
          vision: initialUserData.userConfiguration.vision,
          history: initialUserData.userConfiguration.history,
          appointmentDuration:
            initialUserData.userConfiguration.appointmentDuration,
          timeBetweenAppointments:
            initialUserData.userConfiguration.timeBetweenAppointments,
          dayStartTime: initialUserData.userConfiguration.dayStartTime,
          dayEndTime: initialUserData.userConfiguration.dayEndTime,
          breakStartHour: initialUserData.userConfiguration.breakStartHour,
          breakDuration: initialUserData.userConfiguration.breakDuration,
          daysOff: initialUserData.userConfiguration.daysOff,
          dailySchedules: initialUserData.userConfiguration.dailySchedules,
          fixedAppointmentsAvailable:
            initialUserData.userConfiguration.fixedAppointmentsAvailable,
        },
      }));
    }
  }, [initialUserData]);

  const handleChange = (e) => {
    const { name, value, type, files, checked } = e.target;

    // Manejo de archivos (por ejemplo, logo)
    if (type === "file") {
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
    // Manejo de checkbox
    else if (type === "checkbox") {
      setFormData((prevData) => ({
        ...prevData,
        userConfiguration: {
          ...prevData.userConfiguration,
          [name]: checked,
        },
      }));
    }
    // Manejo de rangos
    else if (type === "range") {
      setFormData((prevData) => ({
        ...prevData,
        userConfiguration: {
          ...prevData.userConfiguration,
          [name]: parseInt(value, 10),
        },
      }));
    }
    // Manejo de los campos de la dirección (guardando dentro de `address`)
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
    // Manejo de días libres (selección múltiple)
    else if (name === "daysOff") {
      const values = Array.from(
        e.target.selectedOptions,
        (option) => option.value
      ).join(";");
      setFormData((prevData) => ({
        ...prevData,
        userConfiguration: {
          ...prevData.userConfiguration,
          daysOff: values,
        },
      }));
    }
    // Manejo de tiempos (ej. horas de inicio y fin del día)
    else if (
      name === "dayStartTime" ||
      name === "dayEndTime" ||
      name === "breakStartHour"
    ) {
      setFormData((prevData) => ({
        ...prevData,
        userConfiguration: {
          ...prevData.userConfiguration,
          [name]: formatTime(value),
        },
      }));
    } else if (name === "breakDuration") {
      setFormData((prevData) => ({
        ...prevData,
        userConfiguration: {
          ...prevData.userConfiguration,
          [name]: parseInt(value, 10),
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
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
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

    const result = await businessConfiguration(parsedFormData, token);

    if (result.success) {
      setIsEditing(false);
    } else {
      console.error("Error en el registro:", result.message);
    }
  };

  return {
    formData,
    handleChange,
    handleSubmit,
    setFormData,
    isEditing,
    setIsEditing,
  };
};
