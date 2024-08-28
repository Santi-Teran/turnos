"use client";
import { Nunito } from "next/font/google";
import { MdHouse, MdLock, MdMail, MdPerson } from "react-icons/md";
import { useRegister } from "../api/handlers/handleRegister";
import Link from "next/link";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useState } from "react";

const nunito = Nunito({ subsets: ["latin"] });

const RegisterBusiness = () => {
  const { formData, handleChange, handleSubmit, handleVerifyCode, loading, error } = useRegister();
  const [showPassword, setShowPassword] = useState(false);
  const [verificationStep, setVerificationStep] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();
    if (verificationStep) {
      await handleVerifyCode(verificationCode);
    } else {
      const success = await handleSubmit(e);
      if (success) setVerificationStep(true);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={onSubmit} className="flex flex-col gap-5 p-8 rounded-lg shadow w-full max-w-md gradient">
        <h1 className={`${nunito.className} text-3xl md:text-4xl font-black`}>{verificationStep ? 'Verificar Código' : 'Crear cuenta'}</h1>
        
        {!verificationStep ? (
          <>
            <div className="flex items-center border p-2 gap-2 rounded-lg">
              <MdPerson className="text-gray-100 text-xl" />
              <input type="text" name="name" value={formData.name} placeholder="Nombre y Apellido" onChange={handleChange} className="bg-transparent focus:outline-none focus:ring-0 w-full text-black placeholder:text-gray-100" required />
            </div>
            <div className="flex items-center border p-2 gap-2 rounded-lg">
              <MdMail className="text-gray-100 text-xl" />
              <input type="email" name="email" value={formData.email} placeholder="Email" onChange={handleChange} className="bg-transparent focus:outline-none focus:ring-0 w-full text-black placeholder:text-gray-100" required />
            </div>
            <div className="flex items-center border p-2 gap-2 rounded-lg">
              <MdHouse className="text-gray-100 text-xl" />
              <input type="text" name="address" value={formData.address} placeholder="Dirección" onChange={handleChange} className="bg-transparent focus:outline-none focus:ring-0 w-full text-black placeholder:text-gray-100" required />
            </div>
            <div className="flex items-center border p-2 gap-2 rounded-lg">
              <MdLock className="text-gray-100 text-xl" />
              <input type={showPassword ? "text" : "password"} name="password" value={formData.password} placeholder="Contraseña" onChange={handleChange} className="bg-transparent focus:outline-none focus:ring-0 w-full text-black placeholder:text-gray-100" required />
              {showPassword ? (
                <FaEyeSlash onClick={() => setShowPassword(!showPassword)} className="cursor-pointer" />
              ) : (
                <FaEye onClick={() => setShowPassword(!showPassword)} className="cursor-pointer" />
              )}
            </div>
          </>
        ) : (
          <>
            <p>Te hemos enviado un código a tu correo electrónico. Por favor, ingrésalo a continuación para verificar tu cuenta.</p>
            <div className="flex items-center border p-2 gap-2 rounded-lg">
              <MdLock className="text-gray-100 text-xl" />
              <input type="text" value={verificationCode} onChange={(e) => setVerificationCode(e.target.value)} placeholder="Código de Verificación" className="bg-transparent focus:outline-none focus:ring-0 w-full text-black placeholder:text-gray-100" required />
            </div>
          </>
        )}

        <button type="submit" className={`${nunito.className} text-lg bg-arena text-dark-blue font-black px-6 py-2 rounded-lg`} disabled={loading}>
          {loading ? "Cargando..." : verificationStep ? "Verificar Código" : "Registrarse"}
        </button>
        
        {error && <p className="text-red-500">{error}</p>}
        
        {!verificationStep && (
          <p className="text-center text-sm mx-10">
            Al hacer click en este botón, acepto que he leído la{" "}
            <Link href={"/legal"} className="underline">Política de privacidad</Link>.
          </p>
        )}
      </form>
    </div>
  );
};

export default RegisterBusiness;