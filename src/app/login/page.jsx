'use client'
import { Nunito } from "next/font/google";
import { MdMail, MdLock } from "react-icons/md";
import { useLogin } from "../api/handlers/handleLogin";

const nunito = Nunito({ subsets: ["latin"] });

const LoginForm = () => {
  const { formData, handleChange, handleSubmit, loading, errors } = useLogin();

  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleSubmit} className="flex flex-col gap-10 mt-20 p-8 rounded-lg shadow-2xl w-full max-w-md gradient">
        <h1 className={`${nunito.className} text-3xl md:text-4xl font-black`}>Iniciar Sesión</h1>
        <div className="flex flex-col gap-2">
          <div className={`flex items-center bg-white p-2 gap-2 rounded-lg ${errors.email ? 'border-2 border-red-500 focus-within:ring-red-500' : 'border-2 border-transparent'}`}>
            <MdMail className="text-gray-400" />
            <input
              type="email"
              name="email"
              value={formData.email}
              placeholder="Email"
              onChange={handleChange}
              className={`bg-transparent focus:outline-none focus:ring-0 w-full text-black placeholder:text-gray-400 ${errors.email ? 'text-red-500 placeholder-red-500' : ''}`}
              required
            />
          </div>
          {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
        </div>

        <div className="flex flex-col gap-2">
          <div className={`flex items-center bg-white p-2 gap-2 rounded-lg ${errors.password ? 'border-2 border-red-500 focus-within:ring-red-500' : 'border-2 border-transparent'}`}>
            <MdLock className="text-gray-400" />
            <input
              type="password"
              name="password"
              value={formData.password}
              placeholder="Contraseña"
              onChange={handleChange}
              className={`bg-transparent focus:outline-none focus:ring-0 w-full text-black placeholder:text-gray-400 ${errors.password ? 'text-red-500 placeholder-red-500' : ''}`}
              required
            />
          </div>
          {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
        </div>
        <button
          type="submit"
          className={`${nunito.className} text-lg bg-arena text-dark-blue font-black px-6 py-2 rounded-lg`}
          disabled={loading}
        >
          {loading ? 'Cargando...' : 'Iniciar Sesión'}
        </button>
      </form>
    </div>
  );
};

export default LoginForm;