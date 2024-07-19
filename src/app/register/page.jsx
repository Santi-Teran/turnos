'use client'
import axios from 'axios';
import { Nunito } from "next/font/google";
import { useState } from 'react';
import { MdHouse, MdLock, MdMail, MdPerson, MdRemoveRedEye } from "react-icons/md";

const nunito = Nunito({ subsets: ["latin"] });

const RegisterBusiness = () => {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [adress, setAdress] = useState('');
  const [selectedPlan, setSelectedPlan] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const businessData = {
      name,
      email,
      password,
      adress,
      selectedPlan
    };

    try {
      // Guardar los datos del negocio en la base de datos
      const response = await axios.post('/api/register-business', businessData);
      
      // Redirigir a Mercado Pago para completar la suscripción
      window.location.href = response.data.mercadoPagoInitPoint;
    } catch (error) {
      console.error('Error registering business:', error);
      alert('Error al registrar el negocio. Inténtelo de nuevo.');
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
            value={name}
            placeholder='Nombre y Apellido'
            onChange={(e) => setName(e.target.value)}
            className="bg-transparent focus:outline-none focus:ring-0 w-full placeholder:text-gray-400"
            required
          />
        </div>
        <div className="flex items-center bg-white p-2 gap-2 rounded-lg">
          <MdMail className="text-gray-400" />
          <input
            type="email"
            value={email}
            placeholder='Email'
            onChange={(e) => setEmail(e.target.value)}
            className="bg-transparent focus:outline-none focus:ring-0 w-full text-black placeholder:text-gray-400"
            required
          />
        </div>
        <div className="flex items-center bg-white p-2 gap-2 rounded-lg">
          <MdHouse className="text-gray-400" />
          <input
            type="text"
            value={adress}
            placeholder='Direccion'
            onChange={(e) => setAdress(e.target.value)}
            className="bg-transparent focus:outline-none focus:ring-0 w-full text-black placeholder:text-gray-400"
            required
          />
        </div>
        <div className="flex items-center bg-white p-2 gap-2 rounded-lg">
          <MdLock className="text-gray-400" />
          <input
            type="password"
            value={password}
            placeholder='Contraseña'
            onChange={(e) => setPassword(e.target.value)}
            className="bg-transparent focus:outline-none focus:ring-0 w-full text-black placeholder:text-gray-400"
            required
          />
          <MdRemoveRedEye className="text-gray-400" />
        </div>
        <button type="submit" className={`${nunito.className} text-lg bg-arena text-dark-blue font-black px-6 py-2 rounded-lg`} >
          Registrarse
        </button>
      </form>
    </div>
  );
};

export default RegisterBusiness;