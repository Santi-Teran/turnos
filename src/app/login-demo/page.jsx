"use client";
import { Nunito } from "next/font/google";
import { MdMail, MdLock } from "react-icons/md";
import { useLogin } from "../api/handlers/handleLogin";
import Link from "next/link";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const nunito = Nunito({ subsets: ["latin"] });

const LoginForm = () => {
  const { formData, handleChange, handleSubmit, loading } = useLogin();
  const [showPassword, setShowPassword] = useState(false);

  formData.email = "demo@gmail.com";
  formData.password = "1234";

  return (
    <div className="flex justify-center items-center h-screen">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-5 mt-20 p-8 rounded-lg shadow-2xl w-full max-w-md gradient"
      >
        <h1 className={`${nunito.className} text-3xl md:text-4xl font-black`}>
          Iniciar Sesión
        </h1>
        <h2
          className={`${nunito.className} text-2xl md:text-3xl font-bold text-center`}
        >
          Demo
        </h2>
        <div className="flex flex-col gap-2">
          <div className={`flex items-center border p-2 gap-2 rounded-lg`}>
            <MdMail className="text-gray-100" />
            <input
              type="email"
              name="email"
              value={formData.email}
              placeholder="Email"
              onChange={handleChange}
              className={`bg-transparent focus:outline-none focus:ring-0 w-full text-black placeholder:text-gray-100`}
              required
            />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <div className={`flex items-center border p-2 gap-2 rounded-lg`}>
            <MdLock className="text-gray-100" />
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              placeholder="Contraseña"
              onChange={handleChange}
              className={`bg-transparent focus:outline-none focus:ring-0 w-full text-black placeholder:text-gray-100`}
              required
            />
            {showPassword ? (
              <FaEyeSlash
                onClick={() => setShowPassword(!showPassword)}
                className="cursor-pointer"
              />
            ) : (
              <FaEye
                onClick={() => setShowPassword(!showPassword)}
                className="cursor-pointer"
              />
            )}
          </div>
        </div>
        <button
          type="submit"
          className={`${nunito.className} text-lg bg-arena text-dark-blue font-black px-6 py-2 rounded-lg`}
          disabled={loading}
        >
          {loading ? "Cargando..." : "Iniciar Sesión"}
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
