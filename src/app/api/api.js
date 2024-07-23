const API_URL = 'https://www.misturnos.somee.com/api'

export const registerUser = async (formData) => {
  try {
    const response = await fetch(`${API_URL}/Users/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      const result = await response.json();
      return { success: true, data: result };
    } else {
      return { success: false, message: response.statusText };
    }
  } catch (error) {
    return { success: false, message: error.message };
  }
};

export const businessConfiguration = async (formData) => {
  try {
    const response = await fetch(`${API_URL}/Users/update`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      const result = await response.json();
      return { success: true, data: result };
    } else {
      return { success: false, message: response.statusText };
    }
  } catch (error) {
    return { success: false, message: error.message };
  }
};

export const loginUser = async (formData) => {
  try {
    const response = await fetch(`${API_URL}/Users/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      const result = await response.json();
      console.log(result)
      localStorage.setItem('userId', result.user.id);
      localStorage.setItem('token', result.token);
      return { success: true, data: result };
    } else {
      return { success: false, message: response.statusText };
    }
  } catch (error) {
    return { success: false, message: error.message };
  }
};

export const getUserInfo = async (userId) => {
  const token = localStorage.getItem('token');
  if (!token) {
    return { success: false, message: 'Token no disponible' };
  }

  try {
    const response = await fetch(`${API_URL}/Users/${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    if (response.ok) {
      const result = await response.json();
      return { success: true, data: result };
    } else {
      return { success: false, message: response.statusText };
    }
  } catch (error) {
    return { success: false, message: error.message };
  }
};