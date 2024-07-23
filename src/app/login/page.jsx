'use client'
import { Nunito } from "next/font/google";
import { MdMail, MdLock } from "react-icons/md";
import { useLogin } from "../api/handlers/handleLogin";

const nunito = Nunito({ subsets: ["latin"] });

const LoginForm = () => {
  const { formData, handleChange, handleSubmit } = useLogin();

  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleSubmit} className="flex flex-col gap-10 mt-20 p-8 rounded-lg shadoww w-full max-w-md">
        <h1 className={`${nunito.className} text-3xl md:text-4xl font-black`}>Iniciar Sesión</h1>
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
          Iniciar Sesión
        </button>
      </form>
    </div>
  );
};

export default LoginForm;