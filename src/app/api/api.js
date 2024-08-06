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

export const businessConfiguration = async (formData) => {
  try {
    const response = await axios.post(`${API_URL}/Users/update`, formData);
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
    return { success: false, message: error.response ? error.response.statusText : error.message };
  }
};

export const getUserInfo = async (userId) => {
  try {
    const response = await axios.get(`${API_URL}/Users/${userId}`);
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

export const createService = async (data) => {
  const token = localStorage.getItem('token');
  try {
    const response = await axios.post(`${API_URL}/Services/add`, data, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    return { success: true, data: response.data };
  } catch (error) {
    return { success: false, message: error.response ? error.response.statusText : error.message };
  }
};

export const updateService = async (data) => {
  const token = localStorage.getItem('token');
  try {
    const response = await axios.post(`${API_URL}/Services/update`, data, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    return { success: true, data: response.data };
  } catch (error) {
    return { success: false, message: error.response ? error.response.statusText : error.message };
  }
};

export const deleteService = async (serviceId) => {
  const token = localStorage.getItem('token');
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

export const getAppointments = async (userId) => {
  try {
    const response = await axios.get(`${API_URL}/Appointments/${userId}`);
    return { success: true, data: response.data };
  } catch (error) {
    return { success: false, message: error.response ? error.response.statusText : error.message };
  }
};

// Holidays CRUD
export const getHolidays = async (userId) => {
  try {
    const response = await axios.get(`${API_URL}/Holidays/${userId}`);
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

export const createHoliday = async (data) => {
  const token = localStorage.getItem('token');
  try {
    const response = await axios.post(`${API_URL}/Holidays/add`, data, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    return { success: true, data: response.data };
  } catch (error) {
    return { success: false, message: error.response ? error.response.statusText : error.message };
  }
};

export const updateHoliday = async (data) => {
  const token = localStorage.getItem('token');
  try {
    const response = await axios.post(`${API_URL}/Holidays/update`, data, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    return { success: true, data: response.data };
  } catch (error) {
    return { success: false, message: error.response ? error.response.statusText : error.message };
  }
};

export const deleteHoliday = async (holidayId) => {
  const token = localStorage.getItem('token');
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