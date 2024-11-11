import axios from "axios";

const API_URL = "/api" || process.env.NEXT_PUBLIC_API_URL;

const handleError = (error) => {
  if (error.response) {
    return {
      success: false,
      message: error.response.data.message || "Error del servidor",
    };
  } else if (error.request) {
    return {
      success: false,
      message: "No se recibió respuesta del servidor",
    };
  } else {
    return { success: false, message: "Error al realizar la solicitud" };
  }
};

export const getUsers = async () => {
  try {
    const response = await axios.get(`${API_URL}/Users`);
    return { success: true, data: response.data };
  } catch (error) {
    return handleError(error);
  }
};

export const registerUser = async (formData) => {
  try {
    const response = await axios.post(`${API_URL}/Users/signup`, formData);
    return { success: true, data: response.data };
  } catch (error) {
    return handleError(error);
  }
};

export const verifyCode = async (email, code) => {
  try {
    const response = await axios.post(`${API_URL}/Users/validate-code`, {
      phoneNumber: email,
      code: code,
    });
    return { success: true, data: response.data };
  } catch (error) {
    return handleError(error);
  }
};

export const businessConfiguration = async (formData, token) => {
  try {
    const response = await axios.post(`${API_URL}/Users/update`, formData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return { success: true, data: response.data };
  } catch (error) {
    return handleError(error);
  }
};

export const loginUser = async (formData) => {
  try {
    const response = await axios.post(`${API_URL}/Users/login`, formData);
    localStorage.setItem("userId", response.data.user.id);
    localStorage.setItem("token", response.data.token);
    return { success: true, data: response.data };
  } catch (error) {
    return handleError(error);
  }
};

export const getUserInfo = async (userId, token) => {
  try {
    const response = await axios.get(`${API_URL}/Users/${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return { success: true, data: response.data };
  } catch (error) {
    return handleError(error);
  }
};

export const getConfigurationInfo = async (userId) => {
  try {
    const response = await axios.get(
      `${API_URL}/Users/configuration/${userId}`
    );
    return { success: true, data: response.data };
  } catch (error) {
    return handleError(error);
  }
};

// Services CRUD
export const getServices = async (userId) => {
  try {
    const response = await axios.get(`${API_URL}/Services/${userId}`);
    return { success: true, data: response.data };
  } catch (error) {
    return handleError(error);
  }
};

export const getService = async (serviceId) => {
  try {
    const response = await axios.get(`${API_URL}/Services/get/${serviceId}`);
    return { success: true, data: response.data };
  } catch (error) {
    return handleError(error);
  }
};

export const createService = async (data, token) => {
  try {
    const response = await axios.post(`${API_URL}/Services/add`, data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return { success: true, data: response.data };
  } catch (error) {
    return handleError(error);
  }
};

export const updateService = async (data, token) => {
  try {
    const response = await axios.post(`${API_URL}/Services/update`, data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return { success: true, data: response.data };
  } catch (error) {
    return handleError(error);
  }
};

export const deleteService = async (serviceId, token) => {
  try {
    const response = await axios.delete(
      `${API_URL}/Services/delete/${serviceId}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return { success: true, data: response.data };
  } catch (error) {
    return handleError(error);
  }
};

// Appointments
export const getAppointments = async (userId, token) => {
  try {
    const response = await axios.get(`${API_URL}/Appointments/${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return { success: true, data: response.data };
  } catch (error) {
    return handleError(error);
  }
};

export const getAppointmentsByPhone = async (phone) => {
  try {
    const response = await axios.get(
      `${API_URL}/Appointments/getByClient?phone=${phone}`
    );
    return { success: true, data: response.data };
  } catch (error) {
    return handleError(error);
  }
};

export const createAppointment = async (data) => {
  try {
    const response = await axios.post(`${API_URL}/Appointments/add`, data);
    return { success: true, data: response.data };
  } catch (error) {
    return handleError(error);
  }
};

export const createFixedAppointment = async (data) => {
  try {
    const response = await axios.post(
      `${API_URL}/Appointments/fixed/add`,
      data
    );
    return { success: true, data: response.data };
  } catch (error) {
    return handleError(error);
  }
};

export const verifyPhonee = async (phone) => {
  try {
    const response = await axios.post(
      `${API_URL}/Appointments/client/verify-phone?phone=${phone}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return { success: true, data: response.data };
  } catch (error) {
    return handleError(error);
  }
};

export const verifyPhoneCode = async (phone, code) => {
  try {
    const response = await axios.post(`${API_URL}/Appointments/validate-code`, {
      phoneNumber: phone,
      code: code,
    });
    return { success: true, data: response.data };
  } catch (error) {
    return handleError(error);
  }
};

export const updateAppointment = async (data, token) => {
  try {
    const response = await axios.post(`${API_URL}/Appointments/update`, data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return { success: true, data: response.data };
  } catch (error) {
    return handleError(error);
  }
};

export const updateFixedAppointment = async (data, token) => {
  try {
    const response = await axios.post(
      `${API_URL}/Appointments/fixed/update`,
      data,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return { success: true, data: response.data };
  } catch (error) {
    return handleError(error);
  }
};

export const deleteAppointmentt = async (appointmentId, token) => {
  try {
    const response = await axios.delete(
      `${API_URL}/Appointments/delete/${appointmentId}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return { success: true, data: response.data };
  } catch (error) {
    return handleError(error);
  }
};

export const deleteFixedAppointmentt = async (appointmentId, token) => {
  const response = await axios.delete(
    `${API_URL}/Appointments/fixed/delete/${appointmentId}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  try {
    return { success: true, data: response.data };
  } catch (error) {
    return handleError(error);
  }
};

export const deleteAppointment = async (appointmentId, phone) => {
  try {
    const response = await axios.delete(
      `${API_URL}/Appointments/client-delete/${appointmentId}?phone=${phone}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return { success: true, data: response.data };
  } catch (error) {
    return handleError(error);
  }
};

export const deleteFixedAppointment = async (fixedAppointmentId, phone) => {
  try {
    const response = await axios.delete(
      `${API_URL}/Appointments/fixed/client-delete/${fixedAppointmentId}?phone=${phone}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return { success: true, data: response.data };
  } catch (error) {
    return handleError(error);
  }
};

// Holidays CRUD
export const getHolidays = async (userId, token) => {
  try {
    const response = await axios.get(`${API_URL}/Holidays/${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return { success: true, data: response.data };
  } catch (error) {
    return handleError(error);
  }
};

export const getUpcomingHolidays = async (userId) => {
  try {
    const response = await axios.get(`${API_URL}/Holidays/upcoming/${userId}`);
    return { success: true, data: response.data };
  } catch (error) {
    return handleError(error);
  }
};

export const getHoliday = async (holidayId) => {
  try {
    const response = await axios.get(`${API_URL}/Holidays/get/${holidayId}`);
    return { success: true, data: response.data };
  } catch (error) {
    return handleError(error);
  }
};

export const createHoliday = async (data, token) => {
  try {
    const response = await axios.post(`${API_URL}/Holidays/add`, data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return { success: true, data: response.data };
  } catch (error) {
    return handleError(error);
  }
};

export const updateHoliday = async (data, token) => {
  try {
    const response = await axios.post(`${API_URL}/Holidays/update`, data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return { success: true, data: response.data };
  } catch (error) {
    return handleError(error);
  }
};

export const deleteHoliday = async (holidayId, token) => {
  try {
    const response = await axios.delete(
      `${API_URL}/Holidays/delete/${holidayId}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return { success: true, data: response.data };
  } catch (error) {
    return handleError(error);
  }
};
