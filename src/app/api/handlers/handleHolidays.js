import { useState, useEffect } from 'react';
import { getHolidays, createHoliday, updateHoliday, deleteHoliday } from '../api';

export const useServiceConfiguration = (initialUserData) => {
  const [holidays, setHolidays] = useState([]);
  const [formData, setFormData] = useState({
    userId: initialUserData.id,
    name: '',
    date: '',
  });

  useEffect(() => {
    const fetchHolidays = async () => {
      if (initialUserData.id) {
        const result = await getHolidays(initialUserData.id);
        if (result.success) {
          setHolidays(result.data);
        } else {
          console.error('Error fetching holidays:', result.message);
        }
      }
    };
    fetchHolidays();
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
  
    const result = await createHoliday(dataToSend);
  
    if (result.success) {
      setFormData({
        userId: initialUserData.id,
        name: '',
        date: '',
      });
      const holidaysResult = await getHolidays(initialUserData.id);
      if (holidaysResult.success) {
        setHolidays(holidaysResult.data);
      }
    } else {
      console.log(dataToSend);
      console.log('Error in holiday submission:', result.message);
    }
  };  

  const handleUpdate = async (editedHoliday) => {
    const dataToSend = {
      ...editedHoliday,
    };
  
    const result = await updateHoliday(dataToSend);
    if (result.success) {
      const holidaysResult = await getHolidays(initialUserData.id);
      if (holidaysResult.success) {
        setHolidays(holidaysResult.data);
      }
    } else {
      console.error('Error updating holiday:', result.message);
    }
  };  

  const handleDelete = async (holidayId) => {
    const result = await deleteHoliday(holidayId);
    if (result.success) {
      const holidaysResult = await getHolidays(initialUserData.id);
      if (holidaysResult.success) {
        setHolidays(holidaysResult.data);
      }
    } else {
      console.error('Error deleting holiday:', result.message);
    }
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