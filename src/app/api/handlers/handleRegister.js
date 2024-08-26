import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { registerUser } from '../api';

export const useRegister = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    password: '',
    subscriptionId: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const router = useRouter();

  useEffect(() => {
    const url = window.location.href;
    const preapprovalIdParam = url.split('preapproval_id=')[1];
    if (preapprovalIdParam) {
      const subscriptionId = preapprovalIdParam.split('&')[0];
      setFormData((prevData) => ({
        ...prevData,
        subscriptionId,
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
    setLoading(true);
    setError(null);
    
    try {
      const result = await registerUser(formData);
      if (result.success) {
        router.push('/login');
      } else {
        setError(result.message);
      }
    } catch (error) {
      setError('Ocurrió un error al registrar tu cuenta. Inténtalo de nuevo más tarde.');
    } finally {
      setLoading(false);
    }
  };

  return {
    formData,
    handleChange,
    handleSubmit,
    loading,
    error,
  };
};