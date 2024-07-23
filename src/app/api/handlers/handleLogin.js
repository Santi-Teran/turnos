import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { loginUser } from '../api';

export const useLogin = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await loginUser(formData);

    if (result.success) {
      router.push('/dashboard');
    } else {
      console.error('Error en el inicio de sesión:', result.message);
    }
  };

  return { formData, handleChange, handleSubmit };
};