import axios from 'axios';

const API_URL = 'https://www.misturnos.somee.com/api';

export const registerUser = async (formData) => {
  try {
    const response = await axios.post(`${API_URL}/Users/signup`, formData);
    return { success: true, data: response.data };
  } catch (error) {
    return { success: false, message: error.response ? error.response.statusText : error.message };
  }
};

export const businessConfiguration = async (formData, token) => {
  try {
    const response = await axios.post(`${API_URL}/Users/update`, formData, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    return { success: true, data: response.data };
  } catch (error) {
    return { success: false, message: error.response ? error.response.statusText : error.message };
  }
};

export const loginUser = async (formData) => {
  try {
    const response = await axios.post(`${API_URL}/Users/login`, formData);
    localStorage.setItem('userId', response.data.user.id);
    localStorage.setItem('token', response.data.token);
    return { success: true, data: response.data };
  } catch (error) {
    return { success: false, message: error.response.data };
  }
};

export const getUserInfo = async (userId, token) => {
  try {
    const response = await axios.get(`${API_URL}/Users/${userId}`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    return { success: true, data: response.data };
  } catch (error) {
    return { success: false, message: error.response ? error.response.statusText : error.message };
  }
};

export const getConfigurationInfo = async (userId) => {
  try {
    const response = await axios.get(`${API_URL}/Users/configuration/${userId}`);
    return { success: true, data: response.data };
  } catch (error) {
    return { success: false, message: error.response ? error.response.statusText : error.message };
  }
};

// Services CRUD
export const getServices = async (userId) => {
  try {
    const response = await axios.get(`${API_URL}/Services/${userId}`);
    return { success: true, data: response.data };
  } catch (error) {
    return { success: false, message: error.response ? error.response.statusText : error.message };
  }
};

export const getService = async (serviceId) => {
  try {
    const response = await axios.get(`${API_URL}/Services/get/${serviceId}`);
    return { success: true, data: response.data };
  } catch (error) {
    return { success: false, message: error.response ? error.response.statusText : error.message };
  }
};

export const createService = async (data, token) => {
  try {
    const response = await axios.post(`${API_URL}/Services/add`, data, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    return { success: true, data: response.data };
  } catch (error) {
    return { success: false, message: error.response ? error.response.statusText : error.message };
  }
};

export const updateService = async (data, token) => {
  try {
    const response = await axios.post(`${API_URL}/Services/update`, data, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    return { success: true, data: response.data };
  } catch (error) {
    return { success: false, message: error.response ? error.response.statusText : error.message };
  }
};

export const deleteService = async (serviceId, token) => {
  try {
    const response = await axios.delete(`${API_URL}/Services/delete`, {
      headers: { 'Authorization': `Bearer ${token}` },
      data: { id: serviceId }
    });
    return { success: true, data: response.data };
  } catch (error) {
    return { success: false, message: error.response ? error.response.statusText : error.message };
  }
};

export const getAppointments = async (userId, token) => {
  try {
    const response = await axios.get(`${API_URL}/Appointments/${userId}`, {
      headers: { 'Authorization': `Bearer ${token}`}
    });
    return { success: true, data: response.data };
  } catch (error) {
    return { success: false, message: error.response ? error.response.statusText : error.message };
  }
};

export const getAppointmentsByPhone = async (phone) => {
  try {
    const response = await axios.get(`${API_URL}/Appointments/getByClient?phone=${phone}`);
    return { success: true, data: response.data };
  } catch (error) {
    return { success: false, message: error.response ? error.response.statusText : error.message };
  }
};

export const createAppointment = async (data) => {
  try {
    const response = await axios.post(`${API_URL}/Appointments/add`, data);
    return { success: true, data: response.data };
  } catch (error) {
    return { success: false, message: error.response ? error.response.statusText : error.message };
  }
};

export const createFixedAppointment = async (data) => {
  try {
    const response = await axios.post(`${API_URL}/Appointments/fixed/add`, data);
    return { success: true, data: response.data };
  } catch (error) {
    return { success: false, message: error.response ? error.response.statusText : error.message };
  }
};

export const deleteAppointment = async (appointmentId, phone) => {
  try {
    const response = await axios.delete(`${API_URL}/Appointments/client-delete/${appointmentId}?phone=${phone}`, {
      headers: {
        'Content-Type': 'application/json'
      },
    });
    return { success: true, data: response.data };
  } catch (error) {
    console.error('Error al cancelar el turno:', error);
    return { success: false };
  }
};

export const deleteFixedAppointment = async (fixedAppointmentId, phone) => {
  try {
    const response = await axios.delete(`${API_URL}/Appointments/fixed/client-delete/${fixedAppointmentId}?phone=${phone}`, {
      headers: {
        'Content-Type': 'application/json'
      },
    });
    return { success: true, data: response.data };
  } catch (error) {
    console.error('Error al cancelar el turno fijo:', error);
    return { success: false };
  }
};

// Holidays CRUD
export const getHolidays = async (userId, token) => {
  try {
    const response = await axios.get(`${API_URL}/Holidays/${userId}`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    return { success: true, data: response.data };
  } catch (error) {
    return { success: false, message: error.response ? error.response.statusText : error.message };
  }
};

export const getUpcomingHolidays = async (userId) => {
  try {
    const response = await axios.get(`${API_URL}/Holidays/upcoming/${userId}`);
    return { success: true, data: response.data };
  } catch (error) {
    return { success: false, message: error.response ? error.response.statusText : error.message };
  }
};

export const getHoliday = async (holidayId) => {
  try {
    const response = await axios.get(`${API_URL}/Holidays/get/${holidayId}`);
    return { success: true, data: response.data };
  } catch (error) {
    return { success: false, message: error.response ? error.response.statusText : error.message };
  }
};

export const createHoliday = async (data, token) => {
  try {
    const response = await axios.post(`${API_URL}/Holidays/add`, data, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    return { success: true, data: response.data };
  } catch (error) {
    return { success: false, message: error.response ? error.response.statusText : error.message };
  }
};

export const updateHoliday = async (data, token) => {
  try {
    const response = await axios.post(`${API_URL}/Holidays/update`, data, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    return { success: true, data: response.data };
  } catch (error) {
    return { success: false, message: error.response ? error.response.statusText : error.message };
  }
};

export const deleteHoliday = async (holidayId, token) => {
  try {
    const response = await axios.delete(`${API_URL}/Holidays/delete`, {
      headers: { 'Authorization': `Bearer ${token}` },
      data: { id: holidayId }
    });
    return { success: true, data: response.data };
  } catch (error) {
    return { success: false, message: error.response ? error.response.statusText : error.message };
  }
};