'use client';

import { Nunito } from "next/font/google";
import { useEffect, useState } from 'react';
import { MdHouse, MdLock, MdMail, MdPerson, MdRemoveRedEye } from "react-icons/md";

const nunito = Nunito({ subsets: ["latin"] });

const RegisterBusiness = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    password: '',
    subcriptionID: '',
  });

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
    // Enviar el objeto formData al backend
    try {
      const response = await fetch('https://localhost:7127/api/Users/singup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Manejar la respuesta del servidor
        const result = await response.json();
        console.log(result);
        // Redirigir al usuario o mostrar un mensaje de éxito
      } else {
        // Manejar errores
        console.error('Error en el registro:', response.statusText);
      }
      console.log(formData)

    } catch (error) {
      console.log(formData)
      console.error('Error en el registro:', error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleSubmit} className="flex flex-col gap-10 mt-20 p-8 rounded-lg shadoww w-full max-w-md">
        <h1 className={`${nunito.className} text-3xl md:text-4xl font-black`}>Crear cuenta</h1>
        <div className="flex items-center bg-white p-2 gap-2 rounded-lg">
          <MdPerson className="text-gray-400" />
          <input
            type="text"
            name="name"
            value={formData.name}
            placeholder='Nombre y Apellido'
            onChange={handleChange}
            className="bg-transparent focus:outline-none focus:ring-0 w-full placeholder:text-gray-400"
            required
          />
        </div>
        <div className="flex items-center bg-white p-2 gap-2 rounded-lg">
          <MdMail className="text-gray-400" />
          <input
            type="email"
            name="email"
            value={formData.email}
            placeholder='Email'
            onChange={handleChange}
            className="bg-transparent focus:outline-none focus:ring-0 w-full text-black placeholder:text-gray-400"
            required
          />
        </div>
        <div className="flex items-center bg-white p-2 gap-2 rounded-lg">
          <MdHouse className="text-gray-400" />
          <input
            type="text"
            name="address"
            value={formData.address}
            placeholder='Dirección'
            onChange={handleChange}
            className="bg-transparent focus:outline-none focus:ring-0 w-full text-black placeholder:text-gray-400"
            required
          />
        </div>
        <div className="flex items-center bg-white p-2 gap-2 rounded-lg">
          <MdLock className="text-gray-400" />
          <input
            type="password"
            name="password"
            value={formData.password}
            placeholder='Contraseña'
            onChange={handleChange}
            className="bg-transparent focus:outline-none focus:ring-0 w-full text-black placeholder:text-gray-400"
            required
          />
          <MdRemoveRedEye className="text-gray-400" />
        </div>
        <button type="submit" className={`${nunito.className} text-lg bg-arena text-dark-blue font-black px-6 py-2 rounded-lg`}>
          Registrarse
        </button>
      </form>
    </div>
  );
};

export default RegisterBusiness;