import { useState, useEffect } from "react";
import {
  getHolidays,
  createHoliday,
  updateHoliday,
  deleteHoliday,
} from "../api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Hook personalizado para manejar la configuración de feriados
export const useHolidayConfiguration = (initialUserData) => {
  const [holidays, setHolidays] = useState([]);
  const [formData, setFormData] = useState(initialFormState(initialUserData));

  // Efecto para obtener los feriados al montar el componente
  useEffect(() => {
    if (initialUserData.id) {
      fetchAndSetHolidays(initialUserData.id, setHolidays);
    }
  }, [initialUserData.id]);

  // Manejar cambios en los inputs del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Enviar nuevo feriado
  const handleSubmit = async (e) => {
    e.preventDefault();
    await submitHoliday(formData, initialUserData.id, setFormData, setHolidays);
  };

  // Actualizar un feriado existente
  const handleUpdate = async (editedHoliday) => {
    await updateExistingHoliday(editedHoliday, initialUserData.id, setHolidays);
  };

  // Eliminar un feriado
  const handleDelete = async (holidayId) => {
    await deleteExistingHoliday(holidayId, initialUserData.id, setHolidays);
  };

  return {
    holidays,
    formData,
    handleChange,
    handleSubmit,
    handleUpdate,
    handleDelete,
  };
};

// Estado inicial del formulario
const initialFormState = (initialUserData) => ({
  userId: initialUserData.id,
  name: "",
  date: "",
});

// Función para obtener y setear los feriados
const fetchAndSetHolidays = async (userId, setHolidays) => {
  const token = localStorage.getItem("token");
  const result = await getHolidays(userId, token);
  if (result.success) {
    setHolidays(result.data);
  } else {
    toast.error("Error al obtener los feriados:", result.data.message);
  }
};

// Función para enviar un nuevo feriado
const submitHoliday = async (formData, userId, setFormData, setHolidays) => {
  const token = localStorage.getItem("token");
  const dataToSend = {
    ...formData,
    userId,
  };

  const result = await createHoliday(dataToSend, token);

  if (result.success) {
    // Resetear el formulario y refrescar los feriados
    setFormData(initialFormState({ id: userId }));
    await refreshHolidays(userId, setHolidays);
    toast.success("Feriado creado con éxito!");
  } else {
    toast.error("Error al crear el feriado:", result.message);
  }
};

// Función para actualizar un feriado existente
const updateExistingHoliday = async (editedHoliday, userId, setHolidays) => {
  const token = localStorage.getItem("token");
  const dataToSend = {
    ...editedHoliday,
  };

  const result = await updateHoliday(dataToSend, token);
  if (result.success) {
    await refreshHolidays(userId, setHolidays);
    toast.success("Feriado actualizado con éxito!");
  } else {
    toast.error("Error al actualizar el feriado:", result.message);
  }
};

// Función para eliminar un feriado
const deleteExistingHoliday = async (holidayId, userId, setHolidays) => {
  const token = localStorage.getItem("token");
  const result = await deleteHoliday(holidayId, token);
  if (result.success) {
    await refreshHolidays(userId, setHolidays);
    toast.success("Feriado eliminado con éxito!");
  } else {
    toast.error("Error al eliminar el feriado:", result.message);
  }
};

// Función para refrescar la lista de feriados
const refreshHolidays = async (userId, setHolidays) => {
  const token = localStorage.getItem("token");
  const result = await getHolidays(userId, token);
  if (result.success) {
    setHolidays(result.data);
  } else {
    toast.error("Error al refrescar los feriados:", result.message);
  }
};
