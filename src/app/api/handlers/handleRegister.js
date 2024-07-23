import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { registerUser } from '../api';

export const useRegister = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    password: '',
    subcriptionID: '',
  });

  const router = useRouter();

  useEffect(() => {
    const url = window.location.href;
    const preapprovalIdParam = url.split('preapproval_id=')[1];
    if (preapprovalIdParam) {
      const subcriptionID = preapprovalIdParam.split('&')[0];
      setFormData((prevData) => ({
        ...prevData,
        subcriptionID,
      }));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await registerUser(formData);

    if (result.success) {
      console.log(result.data);
      router.push('/dashboard');
    } else {
      console.error('Error en el registro:', result.message);
    }
  };

  return {
    formData,
    handleChange,
    handleSubmit,
  };
};