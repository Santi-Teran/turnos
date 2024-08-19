import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { loginUser } from '../api';

export const useLogin = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({ email: '', password: '' });
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: '' })); 
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({ email: '', password: '' });
    
    const result = await loginUser(formData);
    
    setLoading(false);

    if (result.success) {
      router.push('/dashboard');
    } else {
      if (result.message.includes("does not exist")) {
        setErrors((prevErrors) => ({ ...prevErrors, email: 'Email incorrecto' }));
      } else if (result.message.includes("Password")) {
        setErrors((prevErrors) => ({ ...prevErrors, password: 'Contraseña incorrecta' }));
      }
    }
  };

  return { formData, handleChange, handleSubmit, loading, errors }; 
};