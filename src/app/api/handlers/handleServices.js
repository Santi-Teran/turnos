import { useState, useEffect } from "react";
import {
  getServices,
  createService,
  updateService,
  deleteService,
} from "../api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Custom hook para manejar la configuración de servicios
export const useServiceConfiguration = (initialUserData) => {
  const [services, setServices] = useState([]);
  const [formData, setFormData] = useState(initialFormState(initialUserData));

  // Obtener servicios cuando se monta el componente
  useEffect(() => {
    if (initialUserData.id) {
      fetchAndSetServices(initialUserData.id, setServices);
    }
  }, [initialUserData.id]);

  // Manejar los cambios en los inputs del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === "isActive" ? JSON.parse(value) : value,
    }));
  };

  // Enviar nuevo servicio
  const handleSubmit = async (e) => {
    e.preventDefault();
    await submitService(formData, initialUserData.id, setFormData, setServices);
  };

  // Actualizar un servicio existente
  const handleUpdate = async (editedService) => {
    await updateExistingService(editedService, initialUserData.id, setServices);
  };

  // Eliminar un servicio
  const handleDelete = async (serviceId) => {
    await deleteExistingService(serviceId, initialUserData.id, setServices);
  };

  return {
    services,
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
  price: "",
  description: "",
  overlapNumber: "",
  isActive: true,
});

// Función para obtener y setear los servicios
const fetchAndSetServices = async (userId, setServices) => {
  const result = await getServices(userId);
  if (result.success) {
    setServices(result.data);
  } else {
    toast.error("Error al obtener los servicios:", result.message);
  }
};

// Función para enviar un nuevo servicio
const submitService = async (formData, userId, setFormData, setServices) => {
  const token = localStorage.getItem("token");
  const dataToSend = {
    ...formData,
    userId,
    price: parseFloat(formData.price, 10),
    overlapNumber: parseInt(formData.overlapNumber, 10),
  };

  const result = await createService(dataToSend, token);

  if (result.success) {
    // Resetear el formulario y refrescar los servicios
    setFormData(initialFormState({ id: userId }));
    await refreshServices(userId, setServices);
    toast.success("Servicio creado con éxito!");
  } else {
    toast.error("Error al crear el servicio:", result.message);
  }
};

// Función para actualizar un servicio existente
const updateExistingService = async (editedService, userId, setServices) => {
  const token = localStorage.getItem("token");
  const dataToSend = {
    ...editedService,
    price: parseFloat(editedService.price, 10),
    overlapNumber: parseInt(editedService.overlapNumber, 10),
  };

  const result = await updateService(dataToSend, token);
  if (result.success) {
    await refreshServices(userId, setServices);
    toast.success("Servicio actualizado con éxito!");
  } else {
    toast.error("Error al actualizar el servicio:", result.message);
  }
};

// Función para eliminar un servicio
const deleteExistingService = async (serviceId, userId, setServices) => {
  const token = localStorage.getItem("token");
  const result = await deleteService(serviceId, token);
  if (result.success) {
    await refreshServices(userId, setServices);
    toast.success("Servicio eliminado con éxito!");
  } else {
    toast.error("Error al eliminar el servicio:", result.message);
  }
};

// Función para refrescar la lista de servicios
const refreshServices = async (userId, setServices) => {
  const result = await getServices(userId);
  if (result.success) {
    setServices(result.data);
  } else {
    toast.error("Error al refrescar los servicios:", result.message);
  }
};
