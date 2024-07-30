import { useState, useEffect } from 'react';
import { getServices, createService, updateService, deleteService } from '../api';

export const useServiceConfiguration = (initialUserData) => {
  const [services, setServices] = useState([]);
  const [formData, setFormData] = useState({
    userId: initialUserData.id,
    name: '',
    price: '',
    isActive: true,
  });

  useEffect(() => {
    const fetchServices = async () => {
      if (initialUserData.id) {
        const result = await getServices(initialUserData.id);
        if (result.success) {
          setServices(result.data);
        } else {
          console.error('Error fetching services:', result.message);
        }
      }
    };
    fetchServices();
  }, [initialUserData.id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === 'isActive' ? JSON.parse(value) : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const dataToSend = {
      ...formData,
      userId: initialUserData.id,
    };

    console.log('Submitting service with data:', dataToSend);

    const result = await createService(dataToSend);

    if (result.success) {
      setFormData({
        userId: initialUserData.id,
        name: '',
        price: '',
        isActive: true,
      });
      const servicesResult = await getServices(initialUserData.id);
      if (servicesResult.success) {
        setServices(servicesResult.data);
      }
    } else {
      console.log('Error in service submission:', result.message);
    }
  };

  const handleUpdate = async (editedService) => {
    const result = await updateService(editedService);
    if (result.success) {
      const servicesResult = await getServices(initialUserData.id);
      if (servicesResult.success) {
        setServices(servicesResult.data);
      }
    } else {
      console.error('Error updating service:', result.message);
    }
  };

  const handleDelete = async (serviceId) => {
    const result = await deleteService(serviceId);
    if (result.success) {
      const servicesResult = await getServices(initialUserData.id);
      if (servicesResult.success) {
        setServices(servicesResult.data);
      }
    } else {
      console.error('Error deleting service:', result.message);
    }
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