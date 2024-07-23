'use client';
import { Nunito } from "next/font/google";
import { MdHouse, MdLock, MdMail, MdPerson } from "react-icons/md";
import { useRegister } from "../api/handlers/handleRegister";

const nunito = Nunito({ subsets: ["latin"] });

const RegisterBusiness = () => {

  const { formData, handleChange, handleSubmit } = useRegister();

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
            className="bg-transparent focus:outline-none focus:ring-0 w-full text-black placeholder:text-gray-400"
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
        </div>
        <button type="submit" className={`${nunito.className} text-lg bg-arena text-dark-blue font-black px-6 py-2 rounded-lg`}>
          Registrarse
        </button>
      </form>
    </div>
  );
};

export default RegisterBusiness;