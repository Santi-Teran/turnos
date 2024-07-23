import { useState } from 'react';
import { businessConfiguration } from '../api';

export const useBusinessConfiguration = () => {
  const [formData, setFormData] = useState({
    businessName: '',
    description: '',
    logoData: '',
    appointmentDuration: '',
    timeBetweenAppointments: '',
    dayStartTime: '',
    dayEndTime: '',
    daysOff: '',
    fixedAppointmentsAvailable: true,
  });

  const handleChange = (e) => {
    const { name, value, type, files, checked } = e.target;
    if (type === 'checkbox') {
      setFormData((prevData) => ({
        ...prevData,
        [name]: checked,
      }));
    } else if (type === 'file') {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prevData) => ({
          ...prevData,
          logoData: reader.result,
        }));
      };
      reader.readAsDataURL(files[0]);
    } else if (name === 'daysOff') {
      const options = e.target.selectedOptions;
      const values = Array.from(options).map(option => option.value).join(';');
      setFormData((prevData) => ({
        ...prevData,
        daysOff: values,
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const parsedFormData = {
      ...formData,
      appointmentDuration: parseInt(formData.appointmentDuration, 10),
      timeBetweenAppointments: parseInt(formData.timeBetweenAppointments, 10),
      dayStartTime: parseInt(formData.dayStartTime, 10),
      dayEndTime: parseInt(formData.dayEndTime, 10),
    };

    const result = await businessConfiguration(parsedFormData);

    if (result.success) {
      console.log(result.data);
    } else {
      console.log(parsedFormData)
      console.error('Error en el registro:', result.message);
    }
  };

  return {
    formData,
    handleChange,
    handleSubmit,
  };
};