import { useState, useEffect } from 'react';
import { getServices, createService, updateService, deleteService } from '../api';

export const useServiceConfiguration = (initialUserData) => {
  const [services, setServices] = useState([]);
  const [formData, setFormData] = useState({
    userId: initialUserData.id,
    name: '',
    price: '',
    description: '',
    overlapNumber: '',
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
    const token = localStorage.getItem('token');
    const dataToSend = {
      ...formData,
      userId: initialUserData.id,
      price: parseFloat(formData.price, 10),
      overlapNumber: parseInt(formData.overlapNumber, 10),
    };
  
    const result = await createService(dataToSend, token);
  
    if (result.success) {
      setFormData({
        userId: initialUserData.id,
        name: '',
        price: '',
        description: '',
        overlapNumber: '',
        isActive: true,
      });
      const servicesResult = await getServices(initialUserData.id);
      if (servicesResult.success) {
        setServices(servicesResult.data);
      }
    } else {
      console.log(dataToSend);
      console.log('Error in service submission:', result.message);
    }
  };  

  const handleUpdate = async (editedService) => {
    const token = localStorage.getItem('token');
    const dataToSend = {
      ...editedService,
      price: parseFloat(editedService.price, 10),
      overlapNumber: parseInt(editedService.overlapNumber, 10),
    };
  
    const result = await updateService(dataToSend, token);
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
    const token = localStorage.getItem('token');
    const result = await deleteService(serviceId, token);
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