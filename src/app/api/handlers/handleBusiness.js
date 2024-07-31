import { useState, useEffect } from 'react';
import { businessConfiguration } from '../api';

export const useBusinessConfiguration = (initialUserData) => {
  const [formData, setFormData] = useState({
    id: '',
    email: '',
    name: '',
    address: '',
    userConfiguration: {
      businessName: '',
      description: '',
      logoData: '',
      currency: '',
      language: '',
      instagramLink: '',
      phone: '',
      mision: '',
      vision: '',
      history: '',
      appointmentDuration: '',
      timeBetweenAppointments: '',
      dayStartTime: '',
      dayEndTime: '',
      breakStartHour: '',
      breakDuration: '',
      daysOff: '',
      dailySchedules: null,
      fixedAppointmentsAvailable: true,
    }
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (initialUserData) {
      setFormData((prevData) => ({
        ...prevData,
        id: initialUserData.id,
        email: initialUserData.email,
        name: initialUserData.name,
        address: initialUserData.address,
        userConfiguration: initialUserData.userConfiguration,
      }));
    }
  }, [initialUserData]);

  const handleChange = (e) => {
    const { name, value, type, files, checked } = e.target;
    if (type === 'checkbox') {
      setFormData((prevData) => ({
        ...prevData,
        userConfiguration: {
          ...prevData.userConfiguration,
          [name]: checked,
        }
      }));
    } else if (type === 'file') {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prevData) => ({
          ...prevData,
          userConfiguration: {
            ...prevData.userConfiguration,
            logoData: reader.result,
          }
        }));
      };
      reader.readAsDataURL(files[0]);
    } else if (name === 'daysOff') {
      const options = e.target.selectedOptions;
      const values = Array.from(options).map(option => option.value).join(';');
      setFormData((prevData) => ({
        ...prevData,
        userConfiguration: {
          ...prevData.userConfiguration,
          daysOff: values,
        }
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        userConfiguration: {
          ...prevData.userConfiguration,
          [name]: value,
        }
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const parsedFormData = {
      ...formData,
      userConfiguration: {
        ...formData.userConfiguration,
        appointmentDuration: parseInt(formData.userConfiguration.appointmentDuration, 10),
        timeBetweenAppointments: parseInt(formData.userConfiguration.timeBetweenAppointments, 10),
        dayStartTime: parseInt(formData.userConfiguration.dayStartTime, 10),
        dayEndTime: parseInt(formData.userConfiguration.dayEndTime, 10),
        breakStartHour: parseInt(formData.userConfiguration.breakStartHour, 10),
        breakDuration: parseInt(formData.userConfiguration.breakDuration, 10)
      }
    };

    const result = await businessConfiguration(parsedFormData);

    if (result.success) {
      console.log(result.data, formData);
      setIsEditing(false);
    } else {
      console.error('Error en el registro:', result.message);
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